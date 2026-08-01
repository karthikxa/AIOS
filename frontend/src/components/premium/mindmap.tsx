import React, { useRef, useEffect, useState } from 'react';

interface MindMapProps {
  markdown: string;
  className?: string;
  height?: string;
  width?: string;
}

export function MindMap({ markdown, className = '', height = '500px', width = '100%' }: MindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !markdown) return;

    const renderMindMap = async () => {
      try {
        const { Markmap, loadCSS, loadJS } = await import('markmap-view');
        const { Transformer } = await import('markmap-lib');

        // Clear previous content
        if (svgRef.current) {
          svgRef.current.remove();
        }

        const transformer = new Transformer();
        const { root } = transformer.transform(markdown);

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', height);
        containerRef.current?.appendChild(svg);
        svgRef.current = svg;

        const mm = Markmap.create(svg, {
          autoFit: true,
          duration: 300,
          maxWidth: 300,
        });

        mm.setData(root);
        mm.fit();
        setError(null);
      } catch (err) {
        console.error('MindMap render error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render mind map');
      }
    };

    renderMindMap();

    return () => {
      if (svgRef.current) {
        svgRef.current.remove();
      }
    };
  }, [markdown, height]);

  if (error) {
    return (
      <div className={`mindmap-error ${className}`} style={{
        padding: '16px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        color: '#dc2626',
        height,
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Mind Map Error</p>
        <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mindmap ${className}`}
      style={{
        width,
        height,
        overflow: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
      }}
    />
  );
}

// Example markdown for mind maps
export const mindMapExamples = {
  project: `
# Project Plan
## Phase 1
- Research
- Planning
- Design
## Phase 2
- Development
  - Frontend
  - Backend
  - Database
## Phase 3
- Testing
- Deployment
- Documentation
  `,
  meeting: `
# Meeting Notes
## Attendees
- Team Lead
- Developers
- Designer
## Action Items
- Review PRs
- Update docs
- Schedule follow-up
## Decisions
- Use new framework
- Extend timeline
  `,
};
