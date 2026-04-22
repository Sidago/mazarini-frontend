"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StrapiMedia } from "@/lib/types/strapi";
import { HeroVideo } from "../home/hero-video";
import { FadeIn } from "../ui/fade-in";

interface ImgOrVideoHeroProps {
  title: string;
  text: string;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
}

function WithLineBreaks({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export function ImgOrVideoHero({
  title,
  text,
  heroVideo,
  heroImage,
  ctaText,
  ctaUrl,
}: ImgOrVideoHeroProps): React.ReactElement {
  const pathname = usePathname();
  ctaUrl = ctaUrl || "/contact";
  ctaText = ctaText || "Contact Us";
  const showCta = ctaText && ctaUrl && ctaUrl !== pathname;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video / Image background */}
      <HeroVideo video={heroVideo} fallbackImage={heroImage} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col justify-center h-full px-6 lg:pl-[18%] lg:pr-16 text-left">
        <FadeIn delay={0.3}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] max-w-5xl">
            <WithLineBreaks text={title} />
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="mt-8 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
            <WithLineBreaks text={text} />
          </p>
        </FadeIn>

        {showCta && (
          <FadeIn delay={0.7}>
            <Link
              href={ctaUrl!}
              className="mt-10 inline-block px-10 py-4 text-white/90 text-xs font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 transition-colors">
              {ctaText}
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
