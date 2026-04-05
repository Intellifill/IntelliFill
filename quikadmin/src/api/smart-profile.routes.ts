/**
 * Smart Profile Routes
 *
 * API endpoints for the Smart Profile UX flow - simplified document-to-form workflow.
 * Supports document type detection and batch extraction.
 *
 * @module api/smart-profile.routes
 */

import { Router, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { authenticateSupabase, AuthenticatedRequest } from '../middleware/supabaseAuth';
import { piiSafeLogger as logger } from '../utils/piiSafeLogger';
import { validateFilePath } from '../utils/encryption';
import { smartProfileBatchService } from '../services/batch/SmartProfileBatchService';
import { ProfileService } from '../services/ProfileService';
import { prisma } from '../utils/prisma';
import { encryptJSON } from '../utils/encryption';

// ============================================================================
// Multer Configuration
// ============================================================================

// Configure multer storage for temporary file handling
const storage = multer.diskStorage({
  destination: 'uploads/smart-profile/',
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `detect_${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 20, // Max 20 files per request
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();

    try {
      // Validate filename for path traversal
      validateFilePath(file.originalname);

      if (allowedTypes.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error(`File type ${ext} not supported. Allowed: PDF, JPG, PNG`));
      }
    } catch (error) {
      cb(error as Error);
    }
  },
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Clean up temporary files
 */
async function cleanupFiles(filePaths: string[]): Promise<void> {
  for (const filePath of filePaths) {
    try {
      await fs.unlink(filePath);
    } catch {
      // Ignore cleanup errors
    }
  }
}

// ============================================================================
// Route Handlers
// ============================================================================

/**
 * POST /api/smart-profile/detect-types
 *
 * Detect document types from uploaded files.
 * Accepts multipart/form-data with files[] array.
 *
 * Returns classification results with confidence scores.
 */
async function detectTypesHandler(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const files = req.files as Express.Multer.File[];
  const filePaths: string[] = [];

  try {
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files provided',
        message: 'Please upload at least one file (PDF, JPG, or PNG)',
      });
    }

    logger.info('Starting document type detection', {
      fileCount: files.length,
      userId: req.user?.id,
    });

    for (const file of files) {
      filePaths.push(file.path);
    }

    const itemFiles = files.map((f) => ({ path: f.path, originalname: f.originalname }));
    const response = await smartProfileBatchService.detectTypes(itemFiles, req.user?.id);

    res.json(response);
  } catch (error) {
    next(error);
  } finally {
    // Clean up temporary files
    await cleanupFiles(filePaths);
  }
}

/**
 * POST /api/smart-profile/extract-batch
 *
 * Extract data from multiple documents and merge into unified profile.
 * Accepts multipart/form-data with:
 * - files[]: Array of document files
 * - documentTypes[]: Array of document types (matching files array)
 *
 * Returns:
 * - profileData: Merged profile fields (highest confidence wins)
 * - fieldSources: Which document each field came from
 * - lowConfidenceFields: Fields below 85% confidence threshold
 */
async function extractBatchHandler(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const files = req.files as Express.Multer.File[];
  const filePaths: string[] = [];

  try {
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files provided',
        message: 'Please upload at least one file for extraction',
      });
    }

    // Parse document types from request body
    const documentTypesRaw = req.body.documentTypes;
    const documentTypes: string[] = Array.isArray(documentTypesRaw)
      ? documentTypesRaw
      : typeof documentTypesRaw === 'string'
        ? [documentTypesRaw]
        : [];

    // Validate we have types for all files
    if (documentTypes.length !== files.length) {
      return res.status(400).json({
        success: false,
        error: 'Mismatched file and type count',
        message: `Received ${files.length} files but ${documentTypes.length} document types`,
      });
    }

    logger.info('Starting batch extraction', {
      fileCount: files.length,
      documentTypes,
      userId: req.user?.id,
    });

    for (const file of files) {
      filePaths.push(file.path);
    }

    const itemFiles = files.map((f) => ({ path: f.path, originalname: f.originalname }));
    const userId = req.user?.id;
    const response = await smartProfileBatchService.extractBatch(itemFiles, documentTypes, userId);

    // Persist extracted data to Document records so ProfileService can aggregate them.
    // Without this, Smart Profile uploads are frontend-only and invisible to the extension.
    if (response.success && userId && Object.keys(response.profileData).length > 0) {
      try {
        // Create a Document record per uploaded file with the merged extracted data
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const docType = documentTypes[i] || 'unknown';

          // Build per-document extracted data from fieldSources
          const perDocData: Record<string, string> = {};
          for (const [fieldKey, source] of Object.entries(response.fieldSources)) {
            if (source.documentId === file.originalname || files.length === 1) {
              perDocData[fieldKey] = String(response.profileData[fieldKey] ?? '');
            }
          }
          // If no fields matched this doc (multi-doc case), use all fields for single-doc uploads
          // For single-doc uploads where no per-doc matching happened, use all profile data
          const fallbackData: Record<string, string> = {};
          if (Object.keys(perDocData).length === 0 && files.length === 1) {
            for (const [k, v] of Object.entries(response.profileData)) {
              fallbackData[k] = String(v ?? '');
            }
          }
          const dataToSave = Object.keys(perDocData).length > 0 ? perDocData : fallbackData;
          if (Object.keys(dataToSave).length === 0) continue;

          await prisma.document.create({
            data: {
              userId,
              fileName: file.originalname,
              fileType: file.mimetype || 'application/octet-stream',
              fileSize: file.size || 0,
              storageUrl: `smart-profile://${file.originalname}`,
              status: 'COMPLETED',
              extractedData: encryptJSON(dataToSave),
              confidence: 0.85,
              processedAt: new Date(),
              tags: ['smart-profile', docType],
            },
          });
        }

        // Trigger profile aggregation so the extension sees the new data
        const profileService = new ProfileService();
        const profile = await profileService.aggregateUserProfile(userId);
        await profileService.saveProfile(userId, profile, {
          ipAddress: req.ip || undefined,
          userAgent: req.headers['user-agent'] || undefined,
        });

        logger.info('Smart Profile data persisted to documents and user profile', {
          userId,
          fieldsCount: Object.keys(response.profileData).length,
          documentsCreated: files.length,
        });
      } catch (persistError) {
        // Don't fail the response if persistence fails — user still gets their data
        logger.error('Failed to persist Smart Profile data:', persistError);
      }
    }

    res.json(response);
  } catch (error) {
    next(error);
  } finally {
    // Clean up temporary files
    await cleanupFiles(filePaths);
  }
}

// ============================================================================
// Router Setup
// ============================================================================

export function createSmartProfileRoutes(): Router {
  const router = Router();

  // Ensure upload directory exists
  const uploadDir = 'uploads/smart-profile';
  fs.mkdir(uploadDir, { recursive: true }).catch(() => {
    // Directory might already exist
  });

  // POST /api/smart-profile/detect-types
  // Accepts multipart/form-data with files[] array
  router.post('/detect-types', authenticateSupabase, upload.array('files', 20), detectTypesHandler);

  // POST /api/smart-profile/extract-batch
  // Accepts multipart/form-data with files[] and documentTypes[]
  router.post(
    '/extract-batch',
    authenticateSupabase,
    upload.array('files', 20),
    extractBatchHandler
  );

  return router;
}

export default createSmartProfileRoutes;
