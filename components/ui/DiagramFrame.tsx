// components/ui/DiagramFrame.tsx
//
// Shared "diagram panel" frame: cream/dot-grid surface, corner-bracket
// accents, an eyebrow label top-left, and a caption strip along the bottom.
// Extracted from ServicesGrid.tsx so the homepage panel and the service
// detail page's accordion panel render the identical frame around whichever
// diagram/content is passed in.

type DiagramFrameProps = {
  eyebrow: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
};

export function DiagramFrame({ eyebrow, caption, children, className = "" }: DiagramFrameProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white ${className}`}
    >
      <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
      {/* corner-bracket frame, matching reference layout */}
      <span aria-hidden="true" className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-ink/30" />
      <span aria-hidden="true" className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-ink/30" />
      <span aria-hidden="true" className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-ink/30" />
      <span aria-hidden="true" className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-ink/30" />

      {/* top strip: category / service label — mirrors the bottom caption strip */}
      <div className="relative z-10 px-8 pt-6 text-left text-xs font-semibold uppercase tracking-wide text-muted">
        {eyebrow}
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        {children}
      </div>

      {/* bottom strip: caption — equal weight/position to the top strip */}
      <div className="relative z-10 px-8 pb-6 text-center text-xs text-muted">{caption}</div>
    </div>
  );
}
