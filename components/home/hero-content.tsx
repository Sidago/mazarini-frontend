import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import type { LinkComponent } from "@/lib/types/strapi";

interface HeroContentProps {
  title: string;
  highlightText: string | null;
  ctas: LinkComponent[];
}

export function HeroContent({
  title,
  highlightText,
  ctas,
}: HeroContentProps): React.ReactElement {
  const titleBeforeHighlight = highlightText
    ? title.replace(highlightText, "")
    : title;

  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
      <FadeIn delay={0.3}>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.1] max-w-5xl">
          {titleBeforeHighlight}
          {highlightText && (
            <span className="italic font-light">{highlightText}</span>
          )}
        </h1>
      </FadeIn>

      {ctas.length > 0 && (
        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            {ctas.map((cta) => (
              <Link
                key={cta.id}
                href={cta.url}
                className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all"
              >
                {cta.text}
              </Link>
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
