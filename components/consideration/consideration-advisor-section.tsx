import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ConsiderationPage } from "@/lib/types/strapi";

interface Props {
  data: ConsiderationPage | null;
}

export function ConsiderationAdvisorSection({
  data,
}: Props): React.ReactElement {
  const title = data?.advisorTitle ?? null;
  const description = data?.advisorDescription ?? null;
  const featureText = data?.advisorFeatureText ?? null;
  const ctaText = data?.advisorCtaText ?? null;
  const ctaUrl = data?.advisorCtaUrl ?? null;
  const imageUrl = getStrapiMediaUrl(data?.advisorImage ?? null);

  if (!title) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 text-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading + body — right-aligned column */}
        <FadeIn direction="up" duration={0.7}>
          <div className="max-w-3xl ml-auto text-right">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-6 text-base lg:text-lg leading-relaxed text-white/70 whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Feature block — text left + image right + CTA */}
        {(featureText || imageUrl || ctaText) && (
          <div className="mt-16 lg:mt-24 flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <FadeIn
              direction="right"
              duration={0.7}
              className="w-full lg:flex-1">
              <div className="whitespace-pre-line">
                {featureText && (
                  <p className="text-base lg:text-lg leading-relaxed text-white/70">
                    {featureText}
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

            {imageUrl && (
              <FadeIn
                direction="left"
                delay={0.15}
                duration={0.7}
                className="w-full lg:w-[45%]">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </FadeIn>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
