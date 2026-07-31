// components/PageHero.tsx

type PageHeroProps = {
  eyebrow?: string;
  heading: string;
  sub?: string;
};

export function PageHero({ eyebrow, heading, sub }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl flex flex-col gap-4">
          {eyebrow && <span className="eyebrow w-fit">{eyebrow}</span>}
          <h1 className="text-display text-[clamp(2.5rem,1.5rem+3.2vw,3.9rem)]">{heading}</h1>
          {sub && <p className="lead mt-2 max-w-2xl">{sub}</p>}
        </div>
      </div>
    </section>
  );
}
