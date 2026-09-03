// components/PageHero.tsx

type PageHeroProps = {
  eyebrow?: string;
  heading: string;
  sub?: string | string[];
  align?: "left" | "center";
};

export function PageHero({ eyebrow, heading, sub, align = "left" }: PageHeroProps) {
  const subParagraphs = sub ? (Array.isArray(sub) ? sub : [sub]) : [];
  const centered = align === "center";
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <div
          className={`max-w-3xl flex flex-col gap-4 ${
            centered ? "mx-auto items-center text-center" : ""
          }`}
        >
          {eyebrow && <span className="eyebrow w-fit">{eyebrow}</span>}
          <h1 className="text-h1-page">{heading}</h1>
          {subParagraphs.map((p) => (
            <p key={p} className={`text-lead mt-2 max-w-2xl ${centered ? "mx-auto" : ""}`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
