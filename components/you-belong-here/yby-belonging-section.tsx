"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { YouBelongHerePage } from "@/lib/types/strapi";

interface Props {
  data: YouBelongHerePage;
}

export function YbyBelongingSection({ data }: Props): React.ReactElement {
  const items = data.belongingItems ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (items.length === 0) return <></>;

  const activeItem = items[activeIndex];

  return (
    <section
      id="belonging"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex flex-col overflow-hidden bg-background-light text-neutral-900">

      {/* Watermark */}
      {data.belongingWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(0,0,0,0.05)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart={isMobile ? "0vh" : "12vw"}
            flip={true}>
            {data.belongingWatermark}
          </ParallaxText>
        </div>
      )}

      {/* Main content — fills available height above the bottom nav */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 min-h-0 w-full">

        {/* Left — static section heading + description */}
        <div className="w-full lg:w-[50vw] flex-none flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-10 py-12 lg:py-0">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold leading-tight mb-6 text-neutral-900">
            {data.belongingTitle ?? "Why Belonging Matters"}
          </h2>
          {data.belongingDescription && (
            <p className="text-sm font-serif leading-relaxed text-neutral-600 max-w-xl">
              {data.belongingDescription}
            </p>
          )}
        </div>

        {/* Right — active item: title + description + image */}
        <div className="w-full lg:w-[50vw] flex-none px-6 lg:pr-[8vw] lg:pl-8 py-8 lg:py-16 flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col">

              <h3 className="text-base font-bold font-serif text-neutral-900 mb-3">
                {activeItem.title}
              </h3>

              <p className="text-sm font-serif text-neutral-600 leading-relaxed mb-6 max-w-lg">
                {activeItem.description}
              </p>

              {activeItem.image && (
                <div className="w-full max-w-lg overflow-hidden">
                  <Image
                    src={getStrapiMediaUrl(activeItem.image)}
                    alt={activeItem.image.alternativeText ?? activeItem.title}
                    width={activeItem.image.width ?? 600}
                    height={activeItem.image.height ?? 420}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom dot navigation */}
      <div className="relative z-10 px-6 lg:px-[8vw] pb-8 pt-4">
        <div className="flex items-center">
          {items.map((item, i) => (
            <div key={item.id} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="relative flex flex-col items-center shrink-0 group">
                {i === activeIndex && (
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-primary whitespace-nowrap">
                    {item.title}
                  </span>
                )}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-3 h-3 bg-primary"
                      : "w-2.5 h-2.5 bg-neutral-300 group-hover:bg-neutral-500"
                  }`}
                />
              </button>
              {i < items.length - 1 && (
                <div className="flex-1 h-px bg-neutral-300 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
