import Link from "next/link";
import { HeroVideo } from "@/components/home/hero-video";
import type { StrapiMedia } from "@/lib/types/strapi";

interface ImgOrVideoHeroProps {
  title: string;
  text: string;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  ctaText: string | null;
  ctaUrl: string | null;
}

export function ImgOrVideoHero({
  title,
  text,
  heroVideo,
  heroImage,
  ctaText,
  ctaUrl,
}: ImgOrVideoHeroProps): React.ReactElement {
  return (
    <section className="relative w-screen h-screen overflow-hidden flex-none">
      <HeroVideo video={heroVideo} fallbackImage={heroImage} />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative lg:ps-[18%] z-20 flex flex-col items-start justify-center h-full px-10 lg:px-16 text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] max-w-5xl whitespace-pre-line">
          {title}
        </h1>

        {text && (
          <p className="mt-6 text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">
            {text}
          </p>
        )}

        {ctaText && ctaUrl && (
          <div className="mt-12">
            <Link
              href={ctaUrl}
              className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all">
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
