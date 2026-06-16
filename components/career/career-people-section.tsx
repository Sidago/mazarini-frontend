"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerPeopleSection({ data }: Props): React.ReactElement {
  const images = data?.peopleImages ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right"): void {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (images.length === 0) return <></>;

  return (
    <section className="w-full py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 mb-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 mb-4">
          {data?.peopleTitle ?? "Centered Around Our People"}
        </h2>
        {data?.peopleSubtitle && (
          <p className="text-base font-serif text-neutral-500 max-w-2xl mx-auto">
            {data.peopleSubtitle}
          </p>
        )}
      </div>

      <div className="relative max-w-400 mx-auto px-8 lg:px-16">
        {/* Left arrow */}
        <motion.button
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll left"
          className="absolute hidden md:flex left-2 lg:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
          <Icon name="arrow_back" className="text-lg text-white" />
        </motion.button>

        {/* Right arrow */}
        <motion.button
          onClick={() => scroll("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll right"
          className="absolute hidden md:flex right-2 lg:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
          <Icon name="arrow_forward" className="text-lg text-white" />
        </motion.button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
          {images.map((img, index) => {
            const url = getStrapiMediaUrl(img);
            return (
              <FadeIn
                key={img.id}
                direction="right"
                delay={index * 0.05}
                className="flex-none snap-start">
                <div className="relative w-56 h-72 lg:w-72 lg:h-96 overflow-hidden">
                  <Image
                    src={url}
                    alt={img.alternativeText ?? "Team member"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 224px, 288px"
                  />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
