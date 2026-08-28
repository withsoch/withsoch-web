// components/ui/DiagramFrame.tsx
//
// Shared "diagram panel" frame: cream/dot-grid surface, corner-bracket
// accents, an eyebrow label top-left, and a caption strip along the bottom.
// Extracted from ServicesGrid.tsx so the homepage panel and the service
// detail page's accordion panel render the identical frame around whichever
// diagram/content is passed in.

type DiagramFrameProps = {
  // Optional - omit both when the content (e.g. a full-bleed photo) should
  // carry its own context instead of duplicating it in a text strip.
  eyebrow?: string;
  caption?: string;
  // Full-bleed mode: children fill the entire card edge-to-edge with no
  // padding, for real photography that should read as one image rather
  // than an illustration floating in a padded card.
  bleed?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function DiagramFrame({
  eyebrow,
  caption,
  bleed = false,
  children,
  className = "",
}: DiagramFrameProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white ${className}`}
    >
      {!bleed && <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />}
      {!bleed && (
        <>
          {/* corner-bracket frame, matching reference layout */}
          <span aria-hidden="true" className="absolute left-4 top-4 z-10 h-4 w-4 border-l-2 border-t-2 border-ink/30" />
          <span aria-hidden="true" className="absolute right-4 top-4 z-10 h-4 w-4 border-r-2 border-t-2 border-ink/30" />
          <span aria-hidden="true" className="absolute bottom-4 left-4 z-10 h-4 w-4 border-b-2 border-l-2 border-ink/30" />
          <span aria-hidden="true" className="absolute bottom-4 right-4 z-10 h-4 w-4 border-b-2 border-r-2 border-ink/30" />
        </>
      )}

      {eyebrow && (
        // top strip: category / service label - mirrors the bottom caption strip
        <div className="relative z-10 px-6 pt-6 text-left text-xs font-semibold uppercase tracking-wide text-muted">
          {eyebrow}
        </div>
      )}

      <div
        className={
          bleed
            ? "relative z-0 flex flex-1"
            : "relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
        }
      >
        {children}
      </div>

      {caption && (
        // bottom strip: caption - equal weight/position to the top strip
        <div className="relative z-10 px-6 pb-6 text-center text-xs text-muted">{caption}</div>
      )}
    </div>
  );
}
