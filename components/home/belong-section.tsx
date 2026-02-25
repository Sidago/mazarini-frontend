"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { StrapiMedia } from "@/lib/types/strapi";

interface BelongSectionProps {
  heading: string | null;
  description: string | null;
  image: StrapiMedia | null;
  ctaText: string | null;
}

export function BelongSection({
  heading,
  description,
  image,
  ctaText,
}: BelongSectionProps): React.ReactElement {
  if (!heading && !description) return <></>;

  const imageUrl = getStrapiMediaUrl(image ?? null);

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* ParallaxText background */}
      <div className="absolute flex items-center pointer-events-none select-none">
        <ParallaxText
          baseVelocity={-1}
          className="inline-block text-[20vw] md:text-[15vw] font-black text-neutral-900/[0.06] leading-none mx-4"
        >
          {heading ?? "You Belong Here"}
        </ParallaxText>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Image */}
        {imageUrl && (
          <FadeIn direction="up" duration={0.7}>
            <div className="w-[280px] sm:w-[350px] md:w-[420px] lg:w-[500px] mb-10">
              <img
                src={imageUrl}
                alt={heading ?? ""}
                className="w-full h-auto object-contain"
              />
            </div>
          </FadeIn>
        )}

        {/* Heading */}
        {heading && (
          <FadeIn direction="up" delay={0.15} duration={0.7}>
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 leading-tight mb-6">
              {heading}
            </h2>
          </FadeIn>
        )}

        {/* Description */}
        {description && (
          <FadeIn direction="up" delay={0.3} duration={0.7}>
            <p className="text-center text-neutral-500 leading-relaxed max-w-2xl mb-10">
              {description}
            </p>
          </FadeIn>
        )}

        {/* CTA */}
        {ctaText && (
          <FadeIn direction="up" delay={0.45} duration={0.7}>
            <a
              href="#careers"
              className="inline-block px-8 py-3 border border-primary text-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
            >
              {ctaText}
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
