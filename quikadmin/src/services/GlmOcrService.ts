/**
 * GLM-OCR Service - Vision Language Model OCR via Ollama
 *
 * Uses the GLM-OCR 0.9B model (MIT license) for document parsing and
 * key information extraction. Communicates with Ollama's local REST API.
 *
 * Capabilities:
 * - Layout-aware document parsing (tables, forms, headers)
 * - Key Information Extraction (KIE) with JSON schema prompts
 * - Structured Markdown/JSON output
 * - 100+ language support
 *
 * @module services/GlmOcrService
 */

import sharp from 'sharp';
import { logger } from '../utils/logger';
import { GLM_OCR_CONFIG } from '../config/featureFlags';

export interface GlmOcrConfig {
  /** Ollama API base URL */
  baseUrl: string;
  /** Model name in Ollama */
  model: string;
  /** Request timeout in milliseconds */
  timeoutMs: number;
  /** Temperature for generation (lower = more deterministic) */
  temperature: number;
}

export interface GlmOcrResult {
  /** Extracted text (Markdown-formatted with structure preserved) */
  text: string;
  /** Confidence estimate (0-100) */
  confidence: number;
  /** Processing time in milliseconds */
  processingTimeMs: number;
  /** Model used */
  model: string;
}

export interface GlmKieResult {
  /** Extracted fields as key-value pairs */
  fields: Record<string, string | null>;
  /** Per-field confidence (if available) */
  fieldConfidence: Record<string, number>;
  /** Raw model output */
  rawOutput: string;
  /** Processing time in milliseconds */
  processingTimeMs: number;
}

const DEFAULT_CONFIG: GlmOcrConfig = {
  baseUrl: GLM_OCR_CONFIG.BASE_URL,
  model: GLM_OCR_CONFIG.MODEL,
  timeoutMs: GLM_OCR_CONFIG.TIMEOUT_MS,
  temperature: GLM_OCR_CONFIG.TEMPERATURE,
};

/**
 * Prompts tuned for GLM-OCR's capabilities
 */
const PROMPTS = {
  /** Full document parsing - returns structured Markdown */
  DOCUMENT_PARSE: `OCR the document in this image. Extract ALL text preserving the original layout and structure. Output as structured Markdown:
- Preserve headers, paragraphs, and lists
- Render tables using Markdown table syntax
- For forms, use "**Label**: Value" format
- Include all visible text including fine print
- For handwritten text, transcribe as accurately as possible
- If text is unclear, use [?] to indicate uncertainty

Return ONLY the extracted content, no commentary.`,

  /** Key Information Extraction - returns JSON */
  KIE_EXTRACT: (fields: string[]) =>
    `Extract the following fields from this document image. Return a JSON object with these keys: ${JSON.stringify(fields)}.

Rules:
- Use null for fields not found in the document
- Preserve original formatting for dates, IDs, and numbers
- For names, use the exact case as written
- For addresses, include all parts on one line
- For sex/gender fields, return "M" or "F" exactly as shown
- Even single-character values (like "M", "F", "P") must be extracted
- Return ONLY valid JSON, no other text`,

  /** Table extraction */
  TABLE_EXTRACT: `Extract all tables from this document image. For each table:
1. Preserve column headers exactly
2. Preserve all row data
3. Use Markdown table format
4. If multiple tables exist, separate with a blank line and "---"

Return ONLY the tables, no commentary.`,
};

export class GlmOcrService {
  private static instance: GlmOcrService | null = null;
  private config: GlmOcrConfig;
  private available: boolean | null = null;

  constructor(config?: Partial<GlmOcrConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  static getInstance(): GlmOcrService {
    if (!GlmOcrService.instance) {
      GlmOcrService.instance = new GlmOcrService();
    }
    return GlmOcrService.instance;
  }

  static resetInstance(): void {
    GlmOcrService.instance = null;
  }

  /**
   * Check if GLM-OCR model is available in Ollama
   */
  async isAvailable(): Promise<boolean> {
    if (this.available !== null) return this.available;

    try {
      const response = await fetch(`${this.config.baseUrl}/api/tags`, {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        this.available = false;
        return false;
      }

      const data = (await response.json()) as { models: Array<{ name: string }> };
      this.available = data.models.some(
        (m) => m.name === this.config.model || m.name === `${this.config.model}:latest`
      );

      if (this.available) {
        logger.info(`GLM-OCR model available: ${this.config.model}`);
      } else {
        logger.warn(
          `GLM-OCR model "${this.config.model}" not found in Ollama. Available: ${data.models.map((m) => m.name).join(', ')}`
        );
      }

      return this.available;
    } catch (error) {
      logger.warn('Ollama not reachable for GLM-OCR:', error);
      this.available = false;
      return false;
    }
  }

  /**
   * Reset availability cache (e.g., after pulling a new model)
   */
  resetAvailabilityCache(): void {
    this.available = null;
  }

  /**
   * Maximum pixel dimension (width or height) for GLM-OCR input.
   * The 0.9B model degenerates on large images (>2000px).
   * Images exceeding this are downscaled while preserving aspect ratio.
   */
  private static readonly MAX_IMAGE_DIMENSION = GLM_OCR_CONFIG.MAX_IMAGE_DIMENSION || 1600;

  /**
   * Maximum image file size in bytes before downscaling (1.5MB).
   * Large base64 payloads slow down inference and increase OOM risk.
   */
  private static readonly MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

  /**
   * Prepare image for GLM-OCR: downscale if too large, convert to PNG.
   * Returns the original buffer if already within limits.
   */
  private async prepareImage(imageBuffer: Buffer): Promise<Buffer> {
    try {
      const metadata = await sharp(imageBuffer).metadata();
      const { width, height } = metadata;

      const tooLarge =
        (width && width > GlmOcrService.MAX_IMAGE_DIMENSION) ||
        (height && height > GlmOcrService.MAX_IMAGE_DIMENSION) ||
        imageBuffer.length > GlmOcrService.MAX_IMAGE_BYTES;

      if (!tooLarge) return imageBuffer;

      // Downscale preserving aspect ratio
      const scaled = await sharp(imageBuffer)
        .resize({
          width: GlmOcrService.MAX_IMAGE_DIMENSION,
          height: GlmOcrService.MAX_IMAGE_DIMENSION,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({ quality: 90 })
        .toBuffer();

      logger.info('GLM-OCR: Downscaled image for model compatibility', {
        originalWidth: width,
        originalHeight: height,
        originalBytes: imageBuffer.length,
        scaledBytes: scaled.length,
      });

      return scaled;
    } catch (error) {
      logger.warn('GLM-OCR: Image preprocessing failed, using original:', error);
      return imageBuffer;
    }
  }

  /**
   * Detect degenerate model output (repetitive tokens, garbled JSON).
   * The 0.9B model sometimes degenerates on complex documents.
   * Returns true if the output looks degenerate.
   */
  private isDegenerate(text: string): boolean {
    if (!text || text.length < 20) return false;

    // Check for excessive repetition: same 3+ char substring repeated 10+ times
    const words = text.split(/\s+/);
    if (words.length > 20) {
      const freq = new Map<string, number>();
      for (const w of words) {
        freq.set(w, (freq.get(w) || 0) + 1);
      }
      const maxFreq = Math.max(...freq.values());
      if (maxFreq > words.length * 0.4) {
        logger.warn('GLM-OCR: Degenerate output detected (repetitive tokens)', {
          totalWords: words.length,
          maxWordFreq: maxFreq,
        });
        return true;
      }
    }

    return false;
  }

  /**
   * Call Ollama API with an image and prompt
   */
  private async callOllama(
    imageBuffer: Buffer,
    prompt: string
  ): Promise<{ response: string; totalDuration: number }> {
    // Downscale large images to prevent model degeneration
    const prepared = await this.prepareImage(imageBuffer);
    const base64Image = prepared.toString('base64');

    const body = {
      model: this.config.model,
      prompt,
      images: [base64Image],
      stream: false,
      options: {
        temperature: this.config.temperature,
        num_predict: 4096,
      },
    };

    const response = await fetch(`${this.config.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error ${response.status}: ${errorText}`);
    }

    const result = (await response.json()) as {
      response: string;
      total_duration?: number;
      eval_count?: number;
    };

    return {
      response: result.response,
      totalDuration: result.total_duration ? Math.round(result.total_duration / 1_000_000) : 0, // nanoseconds → ms
    };
  }

  /**
   * Parse a document image - full text extraction with structure
   *
   * @param imageBuffer - Image buffer (PNG, JPEG, TIFF, WebP)
   * @returns Structured OCR result with Markdown-formatted text
   */
  async parseDocument(imageBuffer: Buffer): Promise<GlmOcrResult> {
    const startTime = Date.now();

    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error('Cannot parse empty image buffer');
    }

    const available = await this.isAvailable();
    if (!available) {
      throw new Error(
        `GLM-OCR model "${this.config.model}" not available. Run: ollama pull ${this.config.model}`
      );
    }

    try {
      const { response, totalDuration } = await this.callOllama(
        imageBuffer,
        PROMPTS.DOCUMENT_PARSE
      );

      const processingTimeMs = Date.now() - startTime;

      // Detect degenerate output — signal failure so fallback engines take over
      if (!response || response.trim().length === 0 || this.isDegenerate(response)) {
        throw new Error(
          'GLM-OCR produced empty or degenerate output — document too complex for 0.9B model'
        );
      }

      const confidence = this.estimateConfidence(response);

      logger.info('GLM-OCR document parse completed', {
        processingTimeMs,
        ollamaDurationMs: totalDuration,
        textLength: response.length,
        confidence,
      });

      return {
        text: response.trim(),
        confidence,
        processingTimeMs,
        model: this.config.model,
      };
    } catch (error) {
      const elapsed = Date.now() - startTime;
      logger.error(`GLM-OCR document parse failed after ${elapsed}ms:`, error);
      throw error;
    }
  }

  /**
   * Extract specific fields from a document (Key Information Extraction)
   *
   * @param imageBuffer - Image buffer
   * @param fields - Field names to extract (e.g., ['name', 'date_of_birth', 'passport_number'])
   * @returns Extracted fields with confidence scores
   */
  async extractFields(imageBuffer: Buffer, fields: string[]): Promise<GlmKieResult> {
    const startTime = Date.now();

    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error('Cannot extract fields from empty image buffer');
    }

    if (!fields || fields.length === 0) {
      throw new Error('No fields specified for extraction');
    }

    const available = await this.isAvailable();
    if (!available) {
      throw new Error(`GLM-OCR model "${this.config.model}" not available`);
    }

    try {
      const prompt = PROMPTS.KIE_EXTRACT(fields);
      const { response } = await this.callOllama(imageBuffer, prompt);

      const processingTimeMs = Date.now() - startTime;

      // Detect degenerate output
      if (this.isDegenerate(response)) {
        throw new Error(
          'GLM-OCR KIE produced degenerate output — document too complex for 0.9B model'
        );
      }

      // Parse JSON from response
      const { extractedFields, fieldConfidence } = this.parseKieResponse(response, fields);

      logger.info('GLM-OCR KIE extraction completed', {
        processingTimeMs,
        fieldsRequested: fields.length,
        fieldsExtracted: Object.values(extractedFields).filter((v) => v !== null).length,
      });

      return {
        fields: extractedFields,
        fieldConfidence,
        rawOutput: response,
        processingTimeMs,
      };
    } catch (error) {
      logger.error('GLM-OCR KIE extraction failed:', error);
      throw error;
    }
  }

  /**
   * Extract tables from a document image
   */
  async extractTables(imageBuffer: Buffer): Promise<GlmOcrResult> {
    const startTime = Date.now();

    const available = await this.isAvailable();
    if (!available) {
      throw new Error(`GLM-OCR model "${this.config.model}" not available`);
    }

    try {
      const { response, totalDuration } = await this.callOllama(imageBuffer, PROMPTS.TABLE_EXTRACT);

      const processingTimeMs = Date.now() - startTime;

      logger.info('GLM-OCR table extraction completed', {
        processingTimeMs,
        ollamaDurationMs: totalDuration,
      });

      return {
        text: response.trim(),
        confidence: this.estimateConfidence(response),
        processingTimeMs,
        model: this.config.model,
      };
    } catch (error) {
      logger.error('GLM-OCR table extraction failed:', error);
      throw error;
    }
  }

  /**
   * Parse KIE JSON response, handling malformed output gracefully
   */
  private parseKieResponse(
    response: string,
    requestedFields: string[]
  ): {
    extractedFields: Record<string, string | null>;
    fieldConfidence: Record<string, number>;
  } {
    const extractedFields: Record<string, string | null> = {};
    const fieldConfidence: Record<string, number> = {};

    // Initialize all requested fields as null
    for (const field of requestedFields) {
      extractedFields[field] = null;
      fieldConfidence[field] = 0;
    }

    try {
      // Try to extract JSON from response (may have surrounding text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        logger.warn('GLM-OCR KIE: No JSON found in response');
        return { extractedFields, fieldConfidence };
      }

      const parsed = JSON.parse(jsonMatch[0]);

      for (const field of requestedFields) {
        if (field in parsed && parsed[field] !== null && parsed[field] !== undefined) {
          const value = String(parsed[field]).trim();
          if (value.length > 0 && value.toLowerCase() !== 'null') {
            extractedFields[field] = value;
            // Assign confidence based on value quality
            fieldConfidence[field] = value.includes('[?]') ? 60 : 85;
          }
        }
      }
    } catch (parseError) {
      logger.warn('GLM-OCR KIE: Failed to parse JSON response, attempting fallback:', parseError);

      // Fallback: try to extract key:value pairs from text
      for (const field of requestedFields) {
        const pattern = new RegExp(`"?${field}"?\\s*[:=]\\s*"?([^",\\n}]+)"?`, 'i');
        const match = response.match(pattern);
        if (match && match[1]) {
          const value = match[1].trim();
          if (value.toLowerCase() !== 'null' && value.length > 0) {
            extractedFields[field] = value;
            fieldConfidence[field] = 65; // Lower confidence for fallback parsing
          }
        }
      }
    }

    return { extractedFields, fieldConfidence };
  }

  /**
   * Estimate confidence based on output quality heuristics
   */
  private estimateConfidence(text: string): number {
    if (!text || text.trim().length === 0) return 0;

    let confidence = 70; // GLM-OCR baseline is higher than Tesseract

    // Length signals - document had content to extract
    if (text.length > 100) confidence += 5;
    if (text.length > 500) confidence += 3;
    if (text.length > 1000) confidence += 2;

    // Structured content signals
    if (/\|.*\|.*\|/.test(text)) confidence += 3; // Table detected
    if (/\*\*[^*]+\*\*/.test(text)) confidence += 2; // Bold formatting
    if (/\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(text)) confidence += 2; // Dates
    if (/[A-Z]{1,2}\d{6,9}/.test(text)) confidence += 2; // ID patterns

    // Negative signals
    const uncertainCount = (text.match(/\[\?\]/g) || []).length;
    confidence -= uncertainCount * 3;
    if (text.length < 20) confidence -= 15;
    if (/error|sorry|unable|cannot/i.test(text)) confidence -= 10;

    // Cap: heuristic-only confidence shouldn't exceed 90
    return Math.max(10, Math.min(confidence, 90));
  }
}

export const glmOcrService = GlmOcrService.getInstance();

// ============================================================================
// Category → KIE Field Mapping (mirrors extractorAgent EXTRACTION_CONFIGS)
// ============================================================================

/**
 * Maps document categories to the fields GLM-OCR KIE should extract.
 * Aligned with the multi-agent extractor's EXTRACTION_CONFIGS.
 */
export const KIE_FIELDS_BY_CATEGORY: Record<string, string[]> = {
  PASSPORT: [
    'full_name',
    'surname',
    'given_names',
    'passport_number',
    'nationality',
    'date_of_birth',
    'place_of_birth',
    'date_of_issue',
    'date_of_expiry',
    'issuing_authority',
    'sex',
  ],
  EMIRATES_ID: [
    'full_name',
    'full_name_arabic',
    'emirates_id',
    'nationality',
    'date_of_birth',
    'date_of_expiry',
    'sex',
    'card_number',
  ],
  VISA: [
    'full_name',
    'visa_number',
    'visa_type',
    'nationality',
    'passport_number',
    'date_of_issue',
    'date_of_expiry',
    'sponsor',
    'uid',
    'file_number',
    'place_of_issue',
    'profession',
  ],
  TRADE_LICENSE: [
    'license_number',
    'company_name',
    'company_name_arabic',
    'license_type',
    'activities',
    'date_of_issue',
    'date_of_expiry',
    'legal_form',
    'address',
    'issuing_authority',
  ],
  LABOR_CARD: [
    'full_name',
    'card_number',
    'person_code',
    'nationality',
    'occupation',
    'employer',
    'date_of_issue',
    'date_of_expiry',
  ],
  BANK_STATEMENT: [
    'account_holder',
    'account_number',
    'iban',
    'bank_name',
    'statement_period',
    'opening_balance',
    'closing_balance',
    'currency',
    'branch',
  ],
  INVOICE: [
    'invoice_number',
    'date',
    'due_date',
    'vendor_name',
    'customer_name',
    'total_amount',
    'tax_amount',
    'currency',
    'payment_terms',
  ],
  CONTRACT: [
    'contract_number',
    'parties',
    'effective_date',
    'expiry_date',
    'contract_type',
    'total_value',
    'currency',
  ],
  ID_CARD: [
    'full_name',
    'surname',
    'given_names',
    'id_number',
    'nationality',
    'date_of_birth',
    'date_of_expiry',
    'sex',
    'address',
  ],
};

/**
 * Generic fields to extract when category is UNKNOWN
 */
export const KIE_GENERIC_FIELDS = [
  'full_name',
  'date',
  'id_number',
  'address',
  'phone',
  'email',
  'organization',
  'amount',
  'reference_number',
];
