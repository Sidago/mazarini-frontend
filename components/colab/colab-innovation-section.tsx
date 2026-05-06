"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabInnovationSection({ data }: Props): React.ReactElement {
  const items = data.innovations ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (items.length === 0) return <></>;

  return (
    <section
      id="innovation"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-white text-neutral-900">
      {data.innovationWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.15}
            color="rgba(0,0,0,0.04)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="6vw"
            flip={true}>
            {data.innovationWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 w-full px-8 lg:pl-[12vw] lg:pr-[10vw]">
        {data.innovationTitle && (
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-neutral-900 mb-12">
            {data.innovationTitle}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 overflow-y-auto lg:max-h-[75vh]">
          {items.map((item) => {
            const url = getStrapiMediaUrl(item.image ?? null);
            return (
              <div key={item.id}>
                <h3 className="text-lg font-serif font-bold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    {item.description}
                  </p>
                )}
                {url && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
