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
    const response = await smartProfileBatchService.extractBatch(
      itemFiles,
      documentTypes,
      req.user?.id
    );

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
