import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  getImageMetadata,
  resizeImage,
  convertImageFormat,
  createThumbnail,
  cropImage,
  blurImage,
  sharpenImage,
  grayscaleImage,
  compositeImages,
  getImageStatistics,
} from '../services/image-processing.js';

const router = Router();

// POST /api/image/metadata - Get image metadata
router.post('/metadata', async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image buffer or path is required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const metadata = await getImageMetadata(buffer);
    res.json(metadata);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get image metadata' });
  }
});

// POST /api/image/resize - Resize image
router.post('/resize', async (req: Request, res: Response) => {
  try {
    const { image, width, height, fit, background } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const result = await resizeImage(buffer, { width, height, fit, background });

    res.set('Content-Type', 'image/png');
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to resize image' });
  }
});

// POST /api/image/convert - Convert image format
router.post('/convert', async (req: Request, res: Response) => {
  try {
    const { image, format, quality } = req.body;
    if (!image || !format) {
      return res.status(400).json({ error: 'Image and format are required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const result = await convertImageFormat(buffer, { format, quality });

    const contentType = `image/${format}`;
    res.set('Content-Type', contentType);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to convert image' });
  }
});

// POST /api/image/thumbnail - Create thumbnail
router.post('/thumbnail', async (req: Request, res: Response) => {
  try {
    const { image, size } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const result = await createThumbnail(buffer, size);

    res.set('Content-Type', 'image/jpeg');
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create thumbnail' });
  }
});

// POST /api/image/crop - Crop image
router.post('/crop', async (req: Request, res: Response) => {
  try {
    const { image, left, top, width, height } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const result = await cropImage(buffer, left, top, width, height);

    res.set('Content-Type', 'image/png');
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to crop image' });
  }
});

// POST /api/image/blur - Blur image
router.post('/blur', async (req: Request, res: Response) => {
  try {
    const { image, sigma } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const result = await blurImage(buffer, sigma);

    res.set('Content-Type', 'image/png');
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to blur image' });
  }
});

// POST /api/image/grayscale - Convert to grayscale
router.post('/grayscale', async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const result = await grayscaleImage(buffer);

    res.set('Content-Type', 'image/png');
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to convert to grayscale' });
  }
});

// POST /api/image/composite - Composite two images
router.post('/composite', async (req: Request, res: Response) => {
  try {
    const { base, overlay, left, top } = req.body;
    if (!base || !overlay) {
      return res.status(400).json({ error: 'Both base and overlay images are required' });
    }

    const baseBuffer = Buffer.isBuffer(base) ? base : Buffer.from(base, 'base64');
    const overlayBuffer = Buffer.isBuffer(overlay) ? overlay : Buffer.from(overlay, 'base64');
    const result = await compositeImages(baseBuffer, overlayBuffer, { left, top });

    res.set('Content-Type', 'image/png');
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to composite images' });
  }
});

// POST /api/image/stats - Get image statistics
router.post('/stats', async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image, 'base64');
    const stats = await getImageStatistics(buffer);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get image statistics' });
  }
});

export default router;
