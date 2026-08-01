import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface KaTeXProps {
  math: string;
  display?: boolean;
  className?: string;
  throwOnError?: boolean;
}

export function KaTeX({ math, display = false, className = '', throwOnError = false }: KaTeXProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !math) return;

    try {
      katex.render(math, containerRef.current, {
        displayMode: display,
        throwOnError,
        output: 'html',
      });
    } catch (error) {
      console.error('KaTeX render error:', error);
      if (containerRef.current) {
        containerRef.current.textContent = math;
      }
    }
  }, [math, display, throwOnError]);

  return (
    <div
      ref={containerRef}
      className={`katex-render ${className}`}
      style={{
        display: display ? 'block' : 'inline',
        textAlign: display ? 'center' : 'left',
        padding: display ? '16px 0' : '0',
      }}
    />
  );
}

interface MathBlockProps {
  children: string;
  className?: string;
}

export function MathBlock({ children, className = '' }: MathBlockProps) {
  return <KaTeX math={children} display={true} className={className} />;
}

interface InlineMathProps {
  children: string;
  className?: string;
}

export function InlineMath({ children, className = '' }: InlineMathProps) {
  return <KaTeX math={children} display={false} className={className} />;
}

// Common math presets
export const mathPresets = {
  quadratic: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
  pythagorean: 'a^2 + b^2 = c^2',
  euler: 'e^{i\\pi} + 1 = 0',
  integral: '\\int_{a}^{b} f(x) \\, dx',
  derivative: '\\frac{d}{dx} f(x)',
  summation: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}',
  limit: '\\lim_{x \\to \\infty} f(x)',
  matrix: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
};
