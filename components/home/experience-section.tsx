"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { ScrollCircle } from "@/components/ui/scroll-circle";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { StrapiMedia } from "@/lib/types/strapi";

interface ExperienceSectionProps {
  heading: string | null;
  highlightText: string | null;
  description: string | null;
  image: StrapiMedia | null;
  ctaText: string | null;
}

function renderHeading(
  text: string,
  highlight: string | null,
): React.ReactNode {
  if (!highlight) return text;
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);
  return (
    <>
      {before}
      <span className="text-primary italic">{match}</span>
      {after}
    </>
  );
}

export function ExperienceSection({
  heading,
  highlightText,
  description,
  image,
  ctaText,
}: ExperienceSectionProps): React.ReactElement {
  if (!heading && !description) return <></>;

  const imageUrl = getStrapiMediaUrl(image ?? null);

  return (
    <section className="relative bg-neutral-950 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading ── */}
        {heading && (
          <FadeIn direction="up" duration={0.7}>
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-16 lg:mb-24 max-w-4xl mx-auto">
              {renderHeading(heading, highlightText)}
            </h2>
          </FadeIn>
        )}

        {/* ── Image + Circle + Description layout ── */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center">
          {/* Circle + Image group */}
          <div className="relative">
            {/* Animated scroll circle */}
            <div className="absolute -top-12 -left-16 lg:-top-16 lg:-left-20 z-0">
              <ScrollCircle
                size={480}
                strokeWidth={1.5}
                className="w-[350px] h-[350px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]"
              />
            </div>

            {/* Image */}
            <FadeIn direction="up" delay={0.2}>
              <div className="relative z-10 w-[280px] md:w-[350px] lg:w-[400px] aspect-[3/4] rounded-sm overflow-hidden">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Experience"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/25" />
              </div>
            </FadeIn>
          </div>

          {/* Description + CTA — overlaps image on desktop */}
          <div className="relative z-20 mt-8 lg:mt-0 lg:-ml-16 lg:self-end lg:mb-12 max-w-md">
            <FadeIn direction="right" delay={0.4}>
              {description && (
                <p className="font-semibold text-white/80 leading-relaxed mb-8">
                  {description}
                </p>
              )}
              {ctaText && (
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                >
                  {ctaText}
                </a>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
