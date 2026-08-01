import React, { useEffect, useRef } from 'react';
import { DocxViewer } from '@vue-office/docx';

interface DocxPreviewProps {
  file: File | string;
  className?: string;
}

export function DocxPreview({ file, className = '' }: DocxPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadDocx = async () => {
      try {
        const { default: mammoth } = await import('mammoth');
        
        let arrayBuffer: ArrayBuffer;
        if (file instanceof File) {
          arrayBuffer = await file.arrayBuffer();
        } else {
          const response = await fetch(file);
          arrayBuffer = await response.arrayBuffer();
        }

        const result = await mammoth.convertToHtml({ arrayBuffer });
        
        if (containerRef.current) {
          containerRef.current.innerHTML = result.value;
        }
      } catch (error) {
        console.error('Failed to load DOCX:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = '<p style="color: #ef4444;">Failed to load document</p>';
        }
      }
    };

    loadDocx();
  }, [file]);

  return (
    <div 
      ref={containerRef}
      className={`docx-preview ${className}`}
      style={{ 
        padding: '20px', 
        maxHeight: '600px', 
        overflow: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }} 
    />
  );
}

interface ExcelPreviewProps {
  file: File | string;
  className?: string;
}

export function ExcelPreview({ file, className = '' }: ExcelPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadExcel = async () => {
      try {
        const XLSX = await import('xlsx');
        
        let arrayBuffer: ArrayBuffer;
        if (file instanceof File) {
          arrayBuffer = await file.arrayBuffer();
        } else {
          const response = await fetch(file);
          arrayBuffer = await response.arrayBuffer();
        }

        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const html = XLSX.utils.sheet_to_html(worksheet);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = html;
        }
      } catch (error) {
        console.error('Failed to load Excel:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = '<p style="color: #ef4444;">Failed to load spreadsheet</p>';
        }
      }
    };

    loadExcel();
  }, [file]);

  return (
    <div 
      ref={containerRef}
      className={`excel-preview ${className}`}
      style={{ 
        padding: '20px', 
        maxHeight: '600px', 
        overflow: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }} 
    />
  );
}

interface PptxPreviewProps {
  file: File | string;
  className?: string;
}

export function PptxPreview({ file, className = '' }: PptxPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadPptx = async () => {
      try {
        const JSZip = (await import('jszip')).default;
        const pptx2html = await import('pptx2html');
        
        let arrayBuffer: ArrayBuffer;
        if (file instanceof File) {
          arrayBuffer = await file.arrayBuffer();
        } else {
          const response = await fetch(file);
          arrayBuffer = await response.arrayBuffer();
        }

        const zip = await JSZip.loadAsync(arrayBuffer);
        const slideHtml = await pptx2html.convertToHTML(arrayBuffer);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = slideHtml;
        }
      } catch (error) {
        console.error('Failed to load PPTX:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = '<p style="color: #ef4444;">Failed to load presentation</p>';
        }
      }
    };

    loadPptx();
  }, [file]);

  return (
    <div 
      ref={containerRef}
      className={`pptx-preview ${className}`}
      style={{ 
        padding: '20px', 
        maxHeight: '600px', 
        overflow: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }} 
    />
  );
}
