import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";
import { ParallaxText } from "@/components/ui/scroll-animations";

interface NewsSectionProps {
  data: RdPage;
}

export function NewsSection({ data }: NewsSectionProps): React.ReactElement {
  const articles = (data.featuredNews ?? []).slice(0, 2);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  return (
    <section
      id="news"
      className="relative w-screen min-h-screen lg:h-screen flex-none bg-neutral-900 text-white overflow-hidden flex items-center py-20 lg:py-0">
      {/* Watermark */}
      {data.newsWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            flip={true}
            paddingStart="8vw"
          >
            {data.newsWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-center">
          {/* Left */}
          <div className="ps-6 lg:pl-[15vw] lg:pr-8 py-12 lg:py-0">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              {data.newsTitle ?? "News"}
            </h2>
            {data.newsCtaUrl && (
              <Link
                href={data.newsCtaUrl}
                className="inline-block bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80">
                {data.newsCtaText ?? "View All"}
              </Link>
            )}
          </div>

          {/* Right: stacked news items */}
          <div className="flex flex-col gap-8">
            {articles.map((article) => {
              const url = getStrapiMediaUrl(article.image ?? null);
              return (
                <div key={article.id} className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Image */}
                  <div className="relative flex-none w-full h-48 md:w-90 md:h-55 overflow-hidden">
                    {url ? (
                      <Image
                        src={url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-700" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {article.category && (
                      <span className="inline-block border border-white/40 text-white/70 text-xs font-bold uppercase tracking-widest px-2 py-0.5 mb-3">
                        {article.category}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold leading-snug mb-2 md:mb-4">
                      {article.title}
                    </h3>
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center justify-center w-7.5 h-7.5 md:w-10 md:h-10 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                      aria-label="Read article">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none">
                        <path
                          d="M3 8H13M13 8L8 3M13 8L8 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
