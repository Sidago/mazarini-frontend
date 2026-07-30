import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ConsiderationPage } from "@/lib/types/strapi";
import { ParallaxText } from "../ui/scroll-animations";

interface Props {
  data: ConsiderationPage | null;
}

export function ConsiderationHeroSection({ data }: Props): React.ReactElement {
  const title = data?.heroTitle ?? null;
  const text = data?.heroText ?? null;
  const body = data?.heroBody ?? null;
  const watermark = data?.heroWatermark ?? null;
  const imageUrl = getStrapiMediaUrl(data?.heroImage ?? null);

  if (!title) {
    return <></>;
  }

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white py-24 lg:py-32">
      {watermark && (
        <div className="pointer-events-none select-none absolute pt-[20vh]">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(71, 10, 104, 0.40)"
            direction="horizontal">
            {watermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 mt-[25vh] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
          <FadeIn direction="right" duration={0.7} className="w-full lg:flex-1">
            <div className="whitespace-pre-line">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight tracking-tight">
                {title}
              </h1>
              {text && (
                <p className="mt-8 text-base lg:text-lg leading-relaxed text-white/70">
                  {text}
                </p>
              )}
            </div>
          </FadeIn>

          {imageUrl && (
            <FadeIn
              direction="left"
              delay={0.15}
              duration={0.7}
              className="w-full lg:w-[40%] flex justify-center">
              <div className="relative aspect-square w-80 sm:w-96">
                {/* Purple accent behind the circular image */}
                <div className="absolute -inset-4 rounded-full bg-[rgba(71,10,104,0.45)] blur-2xl" />
                <div className="absolute inset-0 rounded-full ring-2 ring-[rgba(124,58,237,0.6)]" />
                <div className="relative aspect-square w-full overflow-hidden rounded-full">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 24rem, 40vw"
                  />
                </div>
              </div>
            </FadeIn>
          )}
        </div>

        {body && (
          <FadeIn direction="up" delay={0.2} duration={0.7}>
            <div className="mt-16 max-w-4xl">
              <p className="text-base lg:text-lg leading-relaxed text-white/70 whitespace-pre-line">
                {body}
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
