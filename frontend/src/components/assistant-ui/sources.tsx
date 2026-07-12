"use client";

import { Button } from "@/components/ui/button";

interface Source {
  id: string;
  title: string;
  url?: string;
  snippet?: string;
  favicon?: string;
}

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

interface SourcesProps {
  sources?: Source[];
}

export function Sources({ sources = [] }: SourcesProps) {
  if (sources.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
      {sources.map((source) => (
        <div
          key={source.id}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg shadow-sm text-xs text-[#374151] hover:border-[rgba(0,0,0,0.15)] transition-colors"
        >
          <div className="flex items-center justify-center w-5 h-5 rounded bg-[#F4F4F5]">
            {source.favicon ? (
              <img src={source.favicon} alt="" className="w-3 h-3" />
            ) : (
              <GlobeIcon />
            )}
          </div>
          <span className="font-medium truncate max-w-[120px]">{source.title}</span>
          {source.url && (
            <Button variant="ghost" size="icon" asChild className="h-4 w-4 p-0 text-[#9CA3AF] hover:text-[#374151]">
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon />
              </a>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
