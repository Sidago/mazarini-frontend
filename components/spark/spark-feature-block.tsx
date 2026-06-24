import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SparkBlock } from "@/lib/types/strapi";

interface Props {
  block: SparkBlock | null | undefined;
  /** Swap the image and text columns. */
  reverse?: boolean;
}

export function SparkFeatureBlock({
  block,
  reverse = false,
}: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(block?.image ?? null);
  const title = block?.title ?? null;
  const text = block?.text ?? null;
  const ctaText = block?.ctaText ?? null;
  const ctaUrl = block?.ctaUrl ?? null;

  if (!title && !imageUrl) {
    return <></>;
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          className={`flex flex-col items-center gap-12 lg:gap-20 ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}>
          {imageUrl && (
            <FadeIn
              direction={reverse ? "right" : "left"}
              duration={0.7}
              className="w-full lg:w-[40%]">
              <div className="relative w-full aspect-[3.6/4.5] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={title ?? "Feature"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </FadeIn>
          )}

          {(title || text || ctaText) && (
            <FadeIn
              direction={reverse ? "left" : "right"}
              delay={0.15}
              duration={0.7}
              className="w-full lg:flex-1">
              <div className="whitespace-pre-line">
                {title && (
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight tracking-tight">
                    {title}
                  </h2>
                )}
                {text && (
                  <p className="mt-6 text-base lg:text-lg leading-relaxed">
                    {text}
                  </p>
                )}
                {ctaText && ctaUrl && (
                  <Link
                    href={ctaUrl}
                    className="inline-block mt-8 px-8 py-3 border border-black text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-black transition-colors">
                    {ctaText}
                  </Link>
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
