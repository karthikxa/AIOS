import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '';

export interface PDFPage {
  pageNumber: number;
  width: number;
  height: number;
  text: string;
  textContent: Array<{
    str: string;
    transform: number[];
    width: number;
    height: number;
  }>;
}

export interface PDFInfo {
  numPages: number;
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modDate?: Date;
  keywords?: string[];
}

export async function getPDFInfo(input: Buffer | Uint8Array): Promise<PDFInfo> {
  const pdf = await pdfjsLib.getDocument({ data: input }).promise;
  const metadata = await pdf.getMetadata();
  const info = metadata.info as any;

  return {
    numPages: pdf.numPages,
    title: info?.Title,
    author: info?.Author,
    subject: info?.Subject,
    creator: info?.Creator,
    producer: info?.Producer,
    creationDate: info?.CreationDate ? new Date(info.CreationDate) : undefined,
    modDate: info?.ModDate ? new Date(info.ModDate) : undefined,
    keywords: info?.Keywords ? String(info.Keywords).split(',').map((k: string) => k.trim()) : [],
  };
}

export async function extractPDFText(input: Buffer | Uint8Array): Promise<string> {
  const pdf = await pdfjsLib.getDocument({ data: input }).promise;
  const fullText: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText.push(pageText);
  }

  return fullText.join('\n\n');
}

export async function extractPDFPage(
  input: Buffer | Uint8Array,
  pageNumber: number
): Promise<PDFPage> {
  const pdf = await pdfjsLib.getDocument({ data: input }).promise;
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1.0 });
  const textContent = await page.getTextContent();

  return {
    pageNumber,
    width: viewport.width,
    height: viewport.height,
    text: textContent.items.map((item: any) => item.str).join(' '),
    textContent: textContent.items.map((item: any) => ({
      str: item.str,
      transform: item.transform,
      width: item.width,
      height: item.height,
    })),
  };
}

export async function extractAllPDFPages(input: Buffer | Uint8Array): Promise<PDFPage[]> {
  const pdf = await pdfjsLib.getDocument({ data: input }).promise;
  const pages: PDFPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    pages.push(await extractPDFPage(input, i));
  }

  return pages;
}

export async function getPDFPageCount(input: Buffer | Uint8Array): Promise<number> {
  const pdf = await pdfjsLib.getDocument({ data: input }).promise;
  return pdf.numPages;
}

export async function searchPDFText(
  input: Buffer | Uint8Array,
  query: string
): Promise<Array<{ pageNumber: number; text: string; index: number }>> {
  const pdf = await pdfjsLib.getDocument({ data: input }).promise;
  const results: Array<{ pageNumber: number; text: string; index: number }> = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');

    let startIndex = 0;
    let index: number;
    while ((index = pageText.toLowerCase().indexOf(query.toLowerCase(), startIndex)) !== -1) {
      results.push({
        pageNumber: i,
        text: pageText.substring(Math.max(0, index - 50), Math.min(pageText.length, index + query.length + 50)),
        index,
      });
      startIndex = index + 1;
    }
  }

  return results;
}
