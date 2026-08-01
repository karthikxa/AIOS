import sharp from 'sharp';

export interface ImageResizeOptions {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  position?: string;
  background?: string;
}

export interface ImageFormatOptions {
  format: 'jpeg' | 'png' | 'webp' | 'avif' | 'tiff' | 'gif';
  quality?: number;
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  channels: number;
  density: number;
  hasAlpha: boolean;
}

export async function getImageMetadata(input: Buffer | string): Promise<ImageMetadata> {
  const metadata = await sharp(input).metadata();
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
    format: metadata.format || 'unknown',
    size: metadata.size || 0,
    channels: metadata.channels || 0,
    density: metadata.density || 72,
    hasAlpha: metadata.hasAlpha || false,
  };
}

export async function resizeImage(
  input: Buffer | string,
  options: ImageResizeOptions
): Promise<Buffer> {
  const pipeline = sharp(input);
  pipeline.resize(options.width, options.height, {
    fit: options.fit || 'cover',
    position: options.position,
    background: options.background || '#ffffff',
  });
  return pipeline.toBuffer();
}

export async function convertImageFormat(
  input: Buffer | string,
  options: ImageFormatOptions
): Promise<Buffer> {
  const pipeline = sharp(input);
  switch (options.format) {
    case 'jpeg':
      return pipeline.jpeg({ quality: options.quality || 80 }).toBuffer();
    case 'png':
      return pipeline.png({ quality: options.quality || 80 }).toBuffer();
    case 'webp':
      return pipeline.webp({ quality: options.quality || 80 }).toBuffer();
    case 'avif':
      return pipeline.avif({ quality: options.quality || 80 }).toBuffer();
    case 'tiff':
      return pipeline.tiff({ quality: options.quality || 80 }).toBuffer();
    case 'gif':
      return pipeline.gif().toBuffer();
    default:
      return pipeline.toBuffer();
  }
}

export async function createThumbnail(
  input: Buffer | string,
  size: number = 200
): Promise<Buffer> {
  return sharp(input)
    .resize(size, size, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toBuffer();
}

export async function extractMetadata(input: Buffer | string): Promise<ImageMetadata> {
  return getImageMetadata(input);
}

export async function cropImage(
  input: Buffer | string,
  left: number,
  top: number,
  width: number,
  height: number
): Promise<Buffer> {
  return sharp(input)
    .extract({ left, top, width, height })
    .toBuffer();
}

export async function blurImage(
  input: Buffer | string,
  sigma: number = 3
): Promise<Buffer> {
  return sharp(input)
    .blur(sigma)
    .toBuffer();
}

export async function sharpenImage(
  input: Buffer | string,
  sigma: number = 1.5
): Promise<Buffer> {
  return sharp(input)
    .sharpen(sigma)
    .toBuffer();
}

export async function grayscaleImage(input: Buffer | string): Promise<Buffer> {
  return sharp(input)
    .grayscale()
    .toBuffer();
}

export async function compositeImages(
  base: Buffer | string,
  overlay: Buffer | string,
  options: { left?: number; top?: number; blend?: string } = {}
): Promise<Buffer> {
  return sharp(base)
    .composite([{
      input: overlay,
      left: options.left || 0,
      top: options.top || 0,
    }])
    .toBuffer();
}

export async function getImageStatistics(input: Buffer | string) {
  const stats = await sharp(input).stats();
  return {
    channels: stats.channels.map((c: any) => ({
      mean: c.mean,
      std: c.stdev || 0,
      min: c.min,
      max: c.max,
    })),
    isOpaque: stats.isOpaque,
    entropy: stats.entropy,
  };
}
