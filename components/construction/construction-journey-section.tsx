import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ConstructionPage } from "@/lib/types/strapi";

interface Props {
  data: ConstructionPage | null;
}

export function ConstructionJourneySection({
  data,
}: Props): React.ReactElement {
  const title = data?.journeyTitle ?? null;
  const text = data?.journeyText ?? null;
  const ctaText = data?.journeyCtaText ?? null;
  const ctaUrl = data?.journeyCtaUrl ?? null;
  const imageUrl = getStrapiMediaUrl(data?.journeyImage ?? null);

  if (!title) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 text-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
          {imageUrl && (
            <FadeIn
              direction="right"
              duration={0.7}
              className="w-full lg:w-[40%] flex justify-center">
              <div className="relative aspect-square w-72 sm:w-96 overflow-hidden rounded-full">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 24rem, 40vw"
                />
              </div>
            </FadeIn>
          )}

          <FadeIn
            direction="left"
            delay={0.15}
            duration={0.7}
            className="w-full lg:flex-1">
            <div className="whitespace-pre-line">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
                {title}
              </h2>
              {text && (
                <p className="mt-6 text-base lg:text-lg leading-relaxed text-white/70">
                  {text}
                </p>
              )}
              {ctaText && ctaUrl && (
                <Link
                  href={ctaUrl}
                  className="inline-block mt-8 bg-primary text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                  {ctaText}
                </Link>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
