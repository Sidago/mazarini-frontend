import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxSection } from "@/components/ui/scroll-animations";
import type { LinkComponent } from "@/lib/types/strapi";

interface CtaSectionProps {
  title: string | null;
  highlightWord: string | null;
  subtitle: string | null;
  ctas: LinkComponent[];
}

export function CtaSection({
  title,
  highlightWord,
  subtitle,
  ctas,
}: CtaSectionProps): React.ReactElement {
  const titleWithHighlight =
    title && highlightWord
      ? title.replace(
          highlightWord,
          `<span class="text-primary">${highlightWord}</span>`
        )
      : title;

  return (
    <section className="relative py-32 bg-neutral-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 dot-pattern" />
      <ParallaxSection offset={30} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          {titleWithHighlight ? (
            <h2
              className="text-5xl md:text-7xl font-black mb-8 tracking-tight"
              dangerouslySetInnerHTML={{ __html: titleWithHighlight }}
            />
          ) : (
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              Let&apos;s Build <span className="text-primary">Together.</span>
            </h2>
          )}
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.15}>
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 font-light">
              {subtitle}
            </p>
          </FadeIn>
        )}
        {ctas.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              {ctas.map((cta) =>
                cta.variant === "primary" ? (
                  <Link
                    key={cta.id}
                    href={cta.url}
                    className="px-10 py-5 bg-primary text-white font-bold rounded shadow-lg shadow-primary/30 hover:bg-amber-600 hover:-translate-y-1 transition-all uppercase tracking-wide"
                  >
                    {cta.text}
                  </Link>
                ) : (
                  <Link
                    key={cta.id}
                    href={cta.url}
                    className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold rounded hover:bg-white hover:text-neutral-900 hover:-translate-y-1 transition-all uppercase tracking-wide"
                  >
                    {cta.text}
                  </Link>
                )
              )}
            </div>
          </FadeIn>
        )}
      </ParallaxSection>
    </section>
  );
}
