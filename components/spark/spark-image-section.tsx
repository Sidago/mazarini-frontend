import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { StrapiMedia } from "@/lib/types/strapi";

interface Props {
  image: StrapiMedia | null;
  caption?: string | null;
  wide?: boolean;
}

export function SparkImageSection({
  image,
  caption,
  wide = false,
}: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(image ?? null);

  if (!imageUrl) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 py-16 lg:py-24">
      <div className="px-6 sm:px-10 lg:px-16">
        <FadeIn direction="up" duration={0.7}>
          <div
            className={`relative w-full mx-auto ${
              wide ? "max-w-6xl aspect-video" : "max-w-3xl aspect-4/3"
            }`}>
            <Image
              src={imageUrl}
              alt={caption ?? "Spark"}
              fill
              className="object-cover"
              sizes={wide ? "(max-width: 1152px) 100vw, 1152px" : "(max-width: 768px) 100vw, 768px"}
            />
          </div>
        </FadeIn>

        {caption && (
          <FadeIn direction="up" delay={0.15} duration={0.7}>
            <p
              className={`mx-auto mt-8 text-center text-base lg:text-lg text-white/60 leading-relaxed ${
                wide ? "max-w-3xl" : "max-w-2xl"
              }`}>
              {caption}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
