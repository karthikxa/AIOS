"use client";

import { Button } from "@/components/ui/button";

interface FileAttachment {
  name: string;
  size: number;
  type: string;
}

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FileIcon = ({ type }: { type: string }) => {
  const icons: Record<string, string> = {
    image: "🖼",
    pdf: "📄",
    text: "📝",
    code: "💻",
    audio: "🎵",
    video: "🎬",
  };
  return <span style={{ fontSize: 14 }}>{icons[type] || "📎"}</span>;
};

function getMimeType(name: string) {
  if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(name)) return "image";
  if (/\.pdf$/i.test(name)) return "pdf";
  if (/\.(txt|md|csv|json|xml|html|css|js|py|ts)$/i.test(name)) return "text";
  if (/\.(mp3|wav|ogg)$/i.test(name)) return "audio";
  if (/\.(mp4|webm)$/i.test(name)) return "video";
  return "file";
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FileCardProps {
  file: FileAttachment;
  onRemove?: () => void;
}

export function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F4F4F5]">
        <FileIcon type={getMimeType(file.name)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-[#18181B] truncate">{file.name}</div>
        <div className="text-[11px] text-[#71717A]">{formatSize(file.size)}</div>
      </div>
      {onRemove && (
        <Button variant="ghost" size="icon" onClick={onRemove} className="flex items-center justify-center w-6 h-6 rounded-full text-[#71717A]">
          <XIcon />
        </Button>
      )}
    </div>
  );
}

interface FileListProps {
  files: FileAttachment[];
  onRemove?: (index: number) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file, i) => (
        <FileCard
          key={`${file.name}-${i}`}
          file={file}
          onRemove={onRemove ? () => onRemove(i) : undefined}
        />
      ))}
    </div>
  );
}
