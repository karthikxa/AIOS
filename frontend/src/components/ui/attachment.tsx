import React, { createContext, useContext } from "react";

type AttachmentContextType = {
  orientation?: "horizontal" | "vertical";
  state?: "idle" | "uploading" | string;
};

const AttachmentContext = createContext<AttachmentContextType>({});

export function Attachment({
  children,
  orientation = "horizontal",
  state = "idle",
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  state?: "idle" | "uploading" | string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AttachmentContext.Provider value={{ orientation, state }}>
      <div
        className={`
          relative flex rounded-xl border border-zinc-200/80 bg-white p-2.5 shadow-sm transition-all duration-200 hover:border-zinc-300
          ${orientation === "vertical" ? "flex-col w-[160px]" : "flex-row items-center w-full max-w-sm"}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    </AttachmentContext.Provider>
  );
}

export function AttachmentGroup({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-wrap gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AttachmentMedia({
  children,
  variant = "icon",
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  variant?: "icon" | "image";
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useContext(AttachmentContext);
  return (
    <div
      className={`
        flex items-center justify-center bg-zinc-100 overflow-hidden shrink-0 border border-zinc-100/50
        ${orientation === "vertical" ? "w-full aspect-video rounded-lg mb-2.5" : "w-10 h-10 rounded-lg mr-3"}
        ${className}
      `}
      {...props}
    >
      {variant === "image" ? (
        React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === "img") {
            return React.cloneElement(child, {
              className: `w-full h-full object-cover ${child.props.className || ""}`,
            } as any);
          }
          return child;
        })
      ) : (
        <div className="text-zinc-500 w-5 h-5 flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5">
          {children}
        </div>
      )}
    </div>
  );
}

export function AttachmentContent({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col min-w-0 flex-1 leading-normal ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AttachmentTitle({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`font-semibold text-zinc-900 text-[13px] truncate ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function AttachmentDescription({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`text-zinc-500 text-[11px] font-normal truncate mt-0.5 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function AttachmentActions({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`absolute top-2 right-2 flex items-center gap-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AttachmentAction({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`
        flex items-center justify-center w-5 h-5 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all duration-150 p-0 border border-transparent cursor-pointer outline-none [&_svg]:w-3.5 [&_svg]:h-3.5
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
