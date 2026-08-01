import React, { useRef, useEffect, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
}

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

let mermaidCounter = 0;

export function MermaidDiagram({ chart, className = '', theme = 'default' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !chart) return;

    const renderChart = async () => {
      try {
        const id = `mermaid-${++mermaidCounter}`;
        
        // Update theme
        mermaid.initialize({
          startOnLoad: false,
          theme,
          securityLevel: 'loose',
        });

        const { svg } = await mermaid.render(id, chart);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderChart();
  }, [chart, theme]);

  if (error) {
    return (
      <div className={`mermaid-error ${className}`} style={{
        padding: '16px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        color: '#dc2626',
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Diagram Error</p>
        <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>{error}</pre>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`mermaid-diagram ${className}`}
      style={{ 
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'auto',
      }} 
    />
  );
}

// Mermaid chart types
export const mermaidExamples = {
  flowchart: `
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E
  `,
  sequence: `
sequenceDiagram
    participant User
    participant App
    participant Server
    User->>App: Request
    App->>Server: API Call
    Server-->>App: Response
    App-->>User: Display
  `,
  class: `
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +bark()
    }
    class Cat {
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
  `,
  gantt: `
gantt
    title Project Schedule
    dateFormat  YYYY-MM-DD
    section Phase 1
    Task 1           :a1, 2024-01-01, 30d
    Task 2           :after a1, 20d
    section Phase 2
    Task 3           :2024-02-20, 25d
    Task 4           :2024-03-01, 15d
  `,
};
