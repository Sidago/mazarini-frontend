import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { StrapiMedia } from "@/lib/types/strapi";

interface SparkSectionProps {
  heading: string | null;
  description: string | null;
  image: StrapiMedia | null;
  ctaText: string | null;
  ctaUrl: string | null;
}

export function SparkSection({
  heading,
  description,
  image,
  ctaText,
  ctaUrl,
}: SparkSectionProps): React.ReactElement {
  if (!heading && !description) return <></>;

  const imageUrl = getStrapiMediaUrl(image ?? null);

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-360 mx-auto px-8 md:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">

          {/* Left: image */}
          {imageUrl && (
            <FadeIn direction="left" duration={0.7} className="w-full lg:w-1/3 shrink-0">
              <div className="relative aspect-5/6 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={image?.alternativeText ?? heading ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </FadeIn>
          )}

          {/* Right: content */}
          <FadeIn direction="right" delay={0.2} duration={0.7} className="w-full lg:w-fit">
            {heading && (
              <h2 className="text-3xl lg:text-5xl font-semibold max-w-lg text-neutral-900 leading-tight mb-6">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-neutral-500 text-lg font-thin leading-relaxed mb-10 max-w-lg">
                {description}
              </p>
            )}
            {ctaText && (
              <Link
                href={ctaUrl ?? "#"}
                className="inline-block px-8 py-3 border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
              >
                {ctaText}
              </Link>
            )}
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
