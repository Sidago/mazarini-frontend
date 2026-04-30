"use client";

import Link from "next/link";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { LeadershipBlock } from "@/lib/types/strapi";

interface LeadershipBlocksSectionProps {
  blocks: LeadershipBlock[];
}

export function LeadershipBlocksSection({
  blocks,
}: LeadershipBlocksSectionProps): React.ReactElement {
  if (blocks.length === 0) return <></>;

  return (
    <>
      {blocks.map((block) => {
        const imageUrl = getStrapiMediaUrl(block.image);

        return (
          <section
            key={block.id}
            className="relative bg-neutral-950 text-white overflow-hidden py-24 md:py-30">
            {/* Watermark */}
            {block.watermark && (
              <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[35%] z-0">
                <ParallaxText
                  baseVelocity={0.15}
                  color="rgba(255,255,255,0.15)"
                  direction="horizontal">
                  {block.watermark}
                </ParallaxText>
              </div>
            )}

            <div className="relative z-10 flex flex-col items-center px-6 text-center">
              {/* Image */}
              {imageUrl && (
                <div className="w-full max-w-2xl mb-10 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={block.image?.alternativeText ?? "Leadership"}
                    width={block.image?.width ?? 800}
                    height={block.image?.height ?? 500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mb-8">
                {block.description}
              </p>

              {/* CTA */}
              {block.ctaUrl && (
                <Link
                  href={block.ctaUrl}
                  className="inline-block bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80">
                  {block.ctaText ?? "Learn More"}
                </Link>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
