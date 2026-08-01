import React, { useRef, useEffect, useState } from 'react';

interface MonacoEditorProps {
  value: string;
  language?: string;
  theme?: 'vs-dark' | 'vs-light' | 'hc-black';
  onChange?: (value: string) => void;
  readOnly?: boolean;
  minimap?: boolean;
  lineNumbers?: boolean;
  className?: string;
  height?: string;
  width?: string;
}

export function MonacoEditor({
  value,
  language = 'typescript',
  theme = 'vs-dark',
  onChange,
  readOnly = false,
  minimap = true,
  lineNumbers = true,
  className = '',
  height = '500px',
  width = '100%',
}: MonacoEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadMonaco = async () => {
      try {
        const monaco = await import('monaco-editor');
        
        // Configure worker
        self.MonacoEnvironment = {
          getWorker(_, label) {
            const getWorkerModule = (moduleUrl: string, label: string) => {
              return new Worker(new URL(moduleUrl, import.meta.url), {
                type: 'module',
              });
            };

            switch (label) {
              case 'json':
                return getWorkerModule('monaco-editor/esm/vs/language/json/json.worker?worker', label);
              case 'css':
              case 'scss':
              case 'less':
                return getWorkerModule('monaco-editor/esm/vs/language/css/css.worker?worker', label);
              case 'html':
              case 'handlebars':
              case 'razor':
                return getWorkerModule('monaco-editor/esm/vs/language/html/html.worker?worker', label);
              case 'typescript':
              case 'javascript':
                return getWorkerModule('monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
              default:
                return getWorkerModule('monaco-editor/esm/vs/editor/editor.worker?worker', label);
            }
          },
        };

        if (containerRef.current) {
          const editor = monaco.editor.create(containerRef.current, {
            value,
            language,
            theme,
            readOnly,
            minimap: { enabled: minimap },
            lineNumbers: lineNumbers ? 'on' : 'off',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          });

          editor.onDidChangeModelContent(() => {
            const newValue = editor.getValue();
            onChange?.(newValue);
          });

          editorRef.current = editor;
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load Monaco:', error);
        setIsLoading(false);
      }
    };

    loadMonaco();

    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== value) {
        editorRef.current.setValue(value);
      }
    }
  }, [value]);

  return (
    <div className={`monaco-editor-container ${className}`} style={{ position: 'relative', width, height }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          fontSize: '14px',
        }}>
          Loading editor...
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
