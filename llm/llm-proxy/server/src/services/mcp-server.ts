import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { synthesizeSpeech, getVoices } from './tts.js';
import { resizeImage, convertImageFormat } from './image-processing.js';
import { extractPDFText, getPDFInfo } from './pdf.js';
import { parseHTMLDocument } from './document-parser.js';
import { extractFirstFrame, extractFrameAtTime, getVideoMetadata } from './video.js';

let _server: McpServer | null = null;

export function getMcpServer(): McpServer {
  if (_server) return _server;

  const server = new McpServer(
    { name: 'avde-mcp-server', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  server.tool('tts_synthesize', 'Convert text to speech audio', {
    text: { type: 'string' } as any,
    voice: { type: 'string' } as any,
    rate: { type: 'string' } as any,
  }, async (args: any) => {
    const buffer = await synthesizeSpeech({ text: args.text, voice: args.voice, rate: args.rate });
    return {
      content: [{
        type: 'resource' as const,
        resource: {
          uri: 'audio://tts/output.mp3',
          mimeType: 'audio/mpeg',
          blob: buffer.toString('base64'),
        },
      }],
    };
  });

  server.tool('tts_voices', 'List available TTS voices', {}, async () => {
    const voices = getVoices();
    return { content: [{ type: 'text' as const, text: JSON.stringify(voices, null, 2) }] };
  });

  server.tool('image_resize', 'Resize an image', {
    inputPath: { type: 'string' } as any,
    outputPath: { type: 'string' } as any,
    width: { type: 'number' } as any,
    height: { type: 'number' } as any,
  }, async (args: any) => {
    await resizeImage(args.inputPath, { width: args.width, height: args.height });
    return { content: [{ type: 'text' as const, text: `Image resized to ${args.outputPath}` }] };
  });

  server.tool('image_convert', 'Convert image format', {
    inputPath: { type: 'string' } as any,
    outputPath: { type: 'string' } as any,
    format: { type: 'string' } as any,
  }, async (args: any) => {
    await convertImageFormat(args.inputPath, { format: args.format, quality: 100 });
    return { content: [{ type: 'text' as const, text: `Image converted to ${args.outputPath}` }] };
  });

  server.tool('pdf_extract_text', 'Extract text content from a PDF', {
    filePath: { type: 'string' } as any,
  }, async (args: any) => {
    const result = await extractPDFText(args.filePath);
    return { content: [{ type: 'text' as const, text: result }] };
  });

  server.tool('pdf_info', 'Get PDF metadata', {
    filePath: { type: 'string' } as any,
  }, async (args: any) => {
    const info = await getPDFInfo(args.filePath);
    return { content: [{ type: 'text' as const, text: JSON.stringify(info, null, 2) }] };
  });

  server.tool('document_parse', 'Parse HTML or Markdown document', {
    input: { type: 'string' } as any,
    isUrl: { type: 'boolean' } as any,
  }, async (args: any) => {
    const result = await parseHTMLDocument(args.input);
    return { content: [{ type: 'text' as const, text: result.textContent }] };
  });

  server.tool('video_extract_frame', 'Extract a frame from a video', {
    videoPath: { type: 'string' } as any,
    timestamp: { type: 'string' } as any,
  }, async (args: any) => {
    const buffer = args.timestamp
      ? await extractFrameAtTime(args.videoPath, args.timestamp)
      : await extractFirstFrame(args.videoPath);
    return {
      content: [{
        type: 'resource' as const,
        resource: {
          uri: 'image://video/frame.jpg',
          mimeType: 'image/jpeg',
          blob: buffer.toString('base64'),
        },
      }],
    };
  });

  server.tool('video_metadata', 'Get video file metadata', {
    videoPath: { type: 'string' } as any,
  }, async (args: any) => {
    const meta = await getVideoMetadata(args.videoPath);
    return { content: [{ type: 'text' as const, text: JSON.stringify(meta, null, 2) }] };
  });

  _server = server;
  return server;
}

export async function startStdioServer(): Promise<void> {
  const server = getMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('AVDE MCP Server running on stdio');
}
