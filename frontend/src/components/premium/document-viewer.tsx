import React, { useState, useEffect } from 'react';
import { DocxPreview, ExcelPreview, PptxPreview } from './office-preview';
import { MermaidDiagram } from './mermaid-diagram';
import { MindMap } from './mindmap';
import { KaTeX } from './katex-math';

type FileType = 'docx' | 'xlsx' | 'pptx' | 'pdf' | 'text' | 'image' | 'mermaid' | 'mindmap' | 'math' | 'unknown';

interface DocumentViewerProps {
  file?: File | string;
  content?: string;
  type?: FileType;
  className?: string;
}

function getFileType(file: File | string): FileType {
  if (typeof file === 'string') {
    if (file.includes('```mermaid')) return 'mermaid';
    if (file.includes('# ') || file.includes('## ')) return 'mindmap';
    if (file.includes('\\frac') || file.includes('\\sum') || file.includes('\\int')) return 'math';
    return 'text';
  }

  const name = file.name.toLowerCase();
  if (name.endsWith('.docx')) return 'docx';
  if (name.endsWith('.xlsx') || name.endsWith('.xls')) return 'xlsx';
  if (name.endsWith('.pptx') || name.endsWith('.ppt')) return 'pptx';
  if (name.endsWith('.pdf')) return 'pdf';
  if (name.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
  if (name.endsWith('.md')) return 'text';
  return 'unknown';
}

function extractMermaidContent(content: string): string {
  const match = content.match(/```mermaid\s*\n([\s\S]*?)\n```/);
  return match ? match[1] : content;
}

function extractMathContent(content: string): string {
  const match = content.match(/\$\$([\s\S]*?)\$\$/) || content.match(/\$(.*?)\$/);
  return match ? match[1] : content;
}

export function DocumentViewer({ file, content, type: forcedType, className = '' }: DocumentViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fileType = forcedType || (file ? getFileType(file) : 'unknown');

  useEffect(() => {
    setLoading(false);
  }, [file, content]);

  if (loading) {
    return (
      <div className={`document-viewer-loading ${className}`} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{
            width: '32px',
            height: '32px',
            border: '3px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <p style={{ marginTop: '8px', color: '#6b7280' }}>Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`document-viewer-error ${className}`} style={{
        padding: '16px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        color: '#dc2626',
      }}>
        <p style={{ fontWeight: 'bold' }}>Error loading document</p>
        <p style={{ fontSize: '14px', marginTop: '4px' }}>{error}</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (fileType) {
      case 'docx':
        return file ? <DocxPreview file={file} /> : null;
      case 'xlsx':
        return file ? <ExcelPreview file={file} /> : null;
      case 'pptx':
        return file ? <PptxPreview file={file} /> : null;
      case 'mermaid':
        return <MermaidDiagram chart={extractMermaidContent(content || '')} />;
      case 'mindmap':
        return <MindMap markdown={content || ''} />;
      case 'math':
        return <KaTeX math={extractMathContent(content || '')} display={true} />;
      case 'text':
        return (
          <div style={{
            padding: '20px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            {content}
          </div>
        );
      case 'image':
        return file ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <img
              src={URL.createObjectURL(file instanceof File ? file : new File([], file))}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        ) : null;
      case 'pdf':
        return (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <p style={{ color: '#6b7280' }}>PDF preview not available. Please download the file.</p>
          </div>
        );
      default:
        return (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <p style={{ color: '#6b7280' }}>Unsupported file type</p>
          </div>
        );
    }
  };

  return (
    <div className={`document-viewer ${className}`} style={{ width: '100%' }}>
      {renderContent()}
    </div>
  );
}
