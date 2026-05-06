"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { YouBelongHerePage } from "@/lib/types/strapi";

interface Props {
  data: YouBelongHerePage;
}

export function YbyCareersSection({ data }: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(data.careersImage ?? null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="careers"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden">
      {/* Background image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Careers"
          fill
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Watermark */}
      {data.careersWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-20">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="14vw"
            flip={true}>
            {data.careersWatermark}
          </ParallaxText>
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 w-full px-8 lg:pl-[18vw] lg:pr-[10vw] py-20 lg:py-0 flex flex-col justify-center max-w-4xl">
        {data.careersText && (
          <p className="text-white font-serif text-lg lg:text-xl font-semibold leading-snug mb-10 max-w-2xl">
            {data.careersText}
          </p>
        )}
        {data.careersCtaUrl && (
          <Link
            href={data.careersCtaUrl}
            className="inline-block self-start bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-amber-500 transition-colors">
            {data.careersCtaText ?? "Explore Careers"}
          </Link>
        )}
      </div>
    </section>
  );
}
