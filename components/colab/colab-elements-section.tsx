"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabElementsSection({ data }: Props): React.ReactElement {
  const cards = data.elementCards ?? [];
  const [active, setActive] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (cards.length === 0) return <></>;

  const card = cards[active];
  const imageUrl = getStrapiMediaUrl(card.image ?? null);

  return (
    <section
      id="elements"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex flex-col overflow-hidden bg-white text-neutral-900">
      {data.elementsWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.15}
            color="rgba(0,0,0,0.04)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="8vw"
            flip={true}>
            {data.elementsWatermark}
          </ParallaxText>
        </div>
      )}

      {/* Tab bar */}
      <div className="relative z-10 flex items-end justify-center gap-0 pt-8 lg:pt-12 pb-0 px-6 overflow-x-auto scrollbar-hide flex-none">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(i)}
            className={`relative shrink-0 px-6 pb-3 text-sm font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
              i === active
                ? "text-neutral-900"
                : "text-neutral-400 hover:text-neutral-600"
            }`}>
            {c.label}
            {i === active && (
              <motion.div
                layoutId="colab-element-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Left — image */}
          <div className="relative w-full h-64 lg:h-full lg:w-[55%] flex-none overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={card.label}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200" />
            )}
          </div>

          {/* Right — content */}
          <div className="font-serif flex-1 flex flex-col justify-center px-8 lg:px-16 py-10 lg:py-12 overflow-y-auto">
            {card.title && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
            )}
            {card.title2 && (
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {card.title2}
                </h3>
                {card.description2 && (
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {card.description2}
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
