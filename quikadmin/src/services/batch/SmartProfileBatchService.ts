import path from 'path';
import fs from 'fs/promises';
import { classifyDocument } from '../../multiagent/agents/classifierAgent';
import { extractDocumentData, LOW_CONFIDENCE_THRESHOLD } from '../../multiagent/agents/extractorAgent';
import { DocumentCategory } from '../../multiagent/types/state';
import { piiSafeLogger as logger } from '../../utils/piiSafeLogger';
import { ocrService } from '../OCRService';
import { personGroupingService, DocumentExtraction } from '../PersonGroupingService';

export interface DetectionResult {
  fileId: string;
  fileName: string;
  detectedType: string;
  confidence: number;
  alternativeTypes?: Array<{ type: string; confidence: number }>;
  metadata?: {
    language?: string;
    hasPhoto?: boolean;
  };
  error?: string;
}

export interface DetectTypesResponse {
  success: boolean;
  results: DetectionResult[];
  totalFiles: number;
  detectedCount: number;
  errorCount: number;
}

export interface FieldSource {
  documentId: string;
  documentName: string;
  confidence: number;
  extractedAt: string;
}

export interface LowConfidenceField {
  fieldName: string;
  value: unknown;
  confidence: number;
  documentId: string;
  documentName: string;
}

export interface FileError {
  fileId: string;
  fileName: string;
  error: string;
  stage: 'ocr' | 'extraction' | 'merge';
}

export interface DetectedPerson {
  id: string;
  name: string | null;
  confidence: number;
  documentIds: string[];
}

export interface ExtractBatchResponse {
  success: boolean;
  profileData: Record<string, unknown>;
  fieldSources: Record<string, FieldSource>;
  lowConfidenceFields: LowConfidenceField[];
  errors: FileError[];
  processingTime: number;
  documentsProcessed: number;
  successfulDocuments: number;
  totalFieldsExtracted: number;
  detectedPeople: DetectedPerson[];
  suggestedMerges?: Array<{
    groupIds: [string, string];
    confidence: number;
    reason: string;
  }>;
}

export interface UploadedFile {
  path: string;
  originalname: string;
}

export class SmartProfileBatchService {
  public async detectTypes(files: UploadedFile[], userId?: string): Promise<DetectTypesResponse> {
    const startTime = Date.now();
    const results: DetectionResult[] = [];
    let detectedCount = 0;
    let errorCount = 0;

    for (const file of files) {
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      try {
        const ext = path.extname(file.originalname).toLowerCase();
        let text = '';
        let imageBase64: string | undefined;

        if (ext === '.pdf') {
          text = await this.extractTextFromPdf(file.path);
          if (!text || text.trim().length < 50) {
            text = `PDF document: ${file.originalname}`;
          }
        } else {
          imageBase64 = await this.fileToBase64(file.path);
          text = `Image document: ${file.originalname}`;
        }

        const classification = await classifyDocument(text, imageBase64);
        const frontendType = this.mapCategoryToFrontendType(classification.documentType);
        const isDetected = classification.confidence >= 60;

        results.push({
          fileId,
          fileName: file.originalname,
          detectedType: isDetected ? frontendType : 'OTHER',
          confidence: classification.confidence / 100,
          alternativeTypes: classification.alternativeTypes?.map((alt) => ({
            type: this.mapCategoryToFrontendType(alt.type),
            confidence: alt.confidence / 100,
          })),
          metadata: classification.metadata,
        });

        if (isDetected) {
          detectedCount++;
        }

        logger.debug('File classified', {
          fileId,
          fileName: file.originalname,
          detectedType: frontendType,
          confidence: classification.confidence,
        });

      } catch (fileError) {
        errorCount++;
        results.push({
          fileId,
          fileName: file.originalname,
          detectedType: 'OTHER',
          confidence: 0,
          error: fileError instanceof Error ? fileError.message : 'Classification failed',
        });
        
        logger.warn('File classification failed', {
          fileId,
          fileName: file.originalname,
          error: fileError instanceof Error ? fileError.message : 'Unknown error',
        });
      }
    }

    const processingTime = Date.now() - startTime;
    return {
      success: true,
      results,
      totalFiles: files.length,
      detectedCount,
      errorCount,
    };
  }

  public async extractBatch(
    files: UploadedFile[],
    documentTypes: string[],
    userId?: string
  ): Promise<ExtractBatchResponse> {
    const startTime = Date.now();
    const profileData: Record<string, unknown> = {};
    const fieldSources: Record<string, FieldSource> = {};
    const lowConfidenceFields: LowConfidenceField[] = [];
    const errors: FileError[] = [];
    let successfulDocuments = 0;
    const documentExtractions: DocumentExtraction[] = [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const documentType = documentTypes[i];
        const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        try {
            const ext = path.extname(file.originalname).toLowerCase();
            let ocrText = '';
            let imageBase64: string | undefined;
            const category = this.mapFrontendTypeToCategory(documentType);
            
            try {
                const buffer = await fs.readFile(file.path);
                const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
                let mimeType = 'application/pdf';
                if (isImage) {
                    if (ext === '.png') mimeType = 'image/png';
                    else if (ext === '.webp') mimeType = 'image/webp';
                    else if (ext === '.gif') mimeType = 'image/gif';
                    else mimeType = 'image/jpeg';
                }
                imageBase64 = `data:${mimeType};base64,${buffer.toString('base64')}`;
                ocrText = `[Native Document: ${file.originalname}]`;
            } catch (ocrError) {
                errors.push({
                    fileId,
                    fileName: file.originalname,
                    error: ocrError instanceof Error ? ocrError.message : 'OCR processing failed',
                    stage: 'ocr',
                });
                continue;
            }
            
            let extractionResult;
            try {
                extractionResult = await extractDocumentData(ocrText, category, imageBase64, userId);
            } catch (extractionError) {
                errors.push({
                    fileId,
                    fileName: file.originalname,
                    error: extractionError instanceof Error ? extractionError.message : 'Data extraction failed',
                    stage: 'extraction',
                });
                continue;
            }
            
            try {
                const extractedAt = new Date().toISOString();
                for (const [fieldName, fieldResult] of Object.entries(extractionResult.fields)) {
                    const profileKey = this.mapFieldToProfileKey(fieldName);
                    const confidence = fieldResult.confidence;
                    
                    const existingSource = fieldSources[profileKey];
                    if (existingSource && existingSource.confidence >= confidence) {
                        continue;
                    }
                    
                    profileData[profileKey] = fieldResult.value;
                    fieldSources[profileKey] = {
                        documentId: fileId,
                        documentName: file.originalname,
                        confidence,
                        extractedAt,
                    };
                    
                    if (confidence < LOW_CONFIDENCE_THRESHOLD && fieldResult.value !== null) {
                        const existingLowConfIdx = lowConfidenceFields.findIndex((f) => f.fieldName === profileKey);
                        if (existingLowConfIdx >= 0) {
                            lowConfidenceFields.splice(existingLowConfIdx, 1);
                        }
                        
                        lowConfidenceFields.push({
                            fieldName: profileKey,
                            value: fieldResult.value,
                            confidence,
                            documentId: fileId,
                            documentName: file.originalname,
                        });
                    }
                }
            } catch (mergeError) {
                errors.push({
                    fileId,
                    fileName: file.originalname,
                    error: mergeError instanceof Error ? mergeError.message : 'Field merge failed',
                    stage: 'merge',
                });
                continue;
            }
            
            successfulDocuments++;
            const nameField =
                extractionResult.fields['full_name'] ||
                extractionResult.fields['fullName'] ||
                extractionResult.fields['name'];
            const idField =
                extractionResult.fields['emirates_id'] ||
                extractionResult.fields['emiratesId'] ||
                extractionResult.fields['passport_number'] ||
                extractionResult.fields['passportNumber'] ||
                extractionResult.fields['id_number'] ||
                extractionResult.fields['idNumber'];
                
            documentExtractions.push({
                documentId: fileId,
                fileName: file.originalname,
                extractedName: nameField?.value as string | null,
                extractedIdNumber: idField?.value as string | null,
                fields: extractionResult.fields,
            });
            
        } catch (fileError) {
            errors.push({
                fileId,
                fileName: file.originalname,
                error: fileError instanceof Error ? fileError.message : 'Unknown error',
                stage: 'extraction',
            });
        }
    }
    
    await ocrService.cleanup();
    
    const processingTime = Date.now() - startTime;
    const groupingResult = personGroupingService.groupDocuments(documentExtractions);
    const detectedPeople: DetectedPerson[] = groupingResult.groups.map((group) => ({
        id: group.id,
        name: group.name,
        confidence: group.confidence,
        documentIds: group.documentIds,
    }));
    
    return {
        success: errors.length === 0,
        profileData,
        fieldSources,
        lowConfidenceFields,
        errors,
        processingTime,
        documentsProcessed: files.length,
        successfulDocuments,
        totalFieldsExtracted: Object.keys(profileData).length,
        detectedPeople,
        suggestedMerges: groupingResult.suggestedMerges.length > 0 ? groupingResult.suggestedMerges : undefined,
    };
  }

  private async fileToBase64(filePath: string): Promise<string> {
    const buffer = await fs.readFile(filePath);
    return buffer.toString('base64');
  }

  private async extractTextFromPdf(filePath: string): Promise<string> {
    try {
      const pdfParse = require('pdf-parse');
      const buffer = await fs.readFile(filePath);
      const data = await pdfParse(buffer);
      return data.text || '';
    } catch (error) {
      logger.warn('PDF text extraction failed', { error: error instanceof Error ? error.message : 'Unknown error' });
      return '';
    }
  }

  private mapCategoryToFrontendType(category: string): string {
    const mapping: Record<string, string> = {
      PASSPORT: 'PASSPORT',
      EMIRATES_ID: 'EMIRATES_ID',
      ID_CARD: 'DRIVERS_LICENSE',
      VISA: 'OTHER',
      TRADE_LICENSE: 'OTHER',
      LABOR_CARD: 'OTHER',
      ESTABLISHMENT_CARD: 'OTHER',
      MOA: 'OTHER',
      BANK_STATEMENT: 'BANK_STATEMENT',
      INVOICE: 'OTHER',
      CONTRACT: 'OTHER',
      UNKNOWN: 'OTHER',
    };
    return mapping[category] || 'OTHER';
  }

  private mapFrontendTypeToCategory(frontendType: string): DocumentCategory {
    const mapping: Record<string, DocumentCategory> = {
      PASSPORT: 'PASSPORT',
      EMIRATES_ID: 'EMIRATES_ID',
      DRIVERS_LICENSE: 'ID_CARD',
      BANK_STATEMENT: 'BANK_STATEMENT',
      OTHER: 'UNKNOWN',
    };
    return mapping[frontendType] || 'UNKNOWN';
  }

  private mapFieldToProfileKey(fieldName: string): string {
    const mappings: Record<string, string> = {
      full_name: 'fullName',
      full_name_arabic: 'fullNameArabic',
      surname: 'surname',
      given_names: 'givenNames',
      passport_number: 'passportNumber',
      emirates_id: 'emiratesId',
      nationality: 'nationality',
      date_of_birth: 'dateOfBirth',
      place_of_birth: 'placeOfBirth',
      date_of_issue: 'dateOfIssue',
      date_of_expiry: 'dateOfExpiry',
      issuing_authority: 'issuingAuthority',
      sex: 'gender',
      visa_number: 'visaNumber',
      visa_type: 'visaType',
      sponsor: 'sponsor',
      occupation: 'occupation',
      employer: 'employer',
      license_number: 'licenseNumber',
      company_name: 'companyName',
      account_number: 'accountNumber',
      iban: 'iban',
      bank_name: 'bankName',
      card_number: 'cardNumber',
    };
    return mappings[fieldName] || fieldName.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  }
}

export const smartProfileBatchService = new SmartProfileBatchService();
