"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceAccordion } from "@/components/services/service-accordion";
import type { AccordionItem, StrapiMedia } from "@/lib/types/strapi";

interface AccordionSectionProps {
  title: string;
  details: string | null;
  image: StrapiMedia | null;
  items: AccordionItem[];
}

export function AccordionSection({
  title,
  details,
  image,
  items,
}: AccordionSectionProps): React.ReactElement {
  // The accordion opens the first item by default, so start with its image
  // when it has one; otherwise fall back to the section's default image.
  const [activeImage, setActiveImage] = useState<StrapiMedia | null>(
    items[0]?.image ?? image,
  );

  const imageUrl = getStrapiMediaUrl(activeImage);

  function handleActiveChange(index: number): void {
    const itemImage = items[index]?.image ?? null;
    // Only swap if the active item actually has an image — otherwise keep the
    // currently displayed one.
    if (itemImage && getStrapiMediaUrl(itemImage)) {
      setActiveImage(itemImage);
    }
  }

  return (
    <section className="py-20 md:py-32 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — image (swaps with the active accordion item) */}
          <FadeIn direction="left">
            <div className="relative w-80 lg:w-96 shrink-0 aspect-[3.5/5] overflow-hidden">
              <AnimatePresence mode="wait">
                {imageUrl && (
                  <motion.div
                    key={imageUrl}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0">
                    <Image
                      src={imageUrl}
                      alt={activeImage?.alternativeText ?? title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 320px, 384px"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>

          {/* Right — content */}
          <div className="w-full lg:w-[600px] shrink-0 flex flex-col justify-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight mb-6 whitespace-pre-line">
                {title}
              </h2>
            </FadeIn>

            {details && (
              <FadeIn direction="right" delay={0.1}>
                <p className="text-lg text-neutral-400 mb-10 max-w-lg whitespace-pre-line">
                  {details}
                </p>
              </FadeIn>
            )}

            {items.length > 0 && (
              <FadeIn direction="right" delay={0.2}>
                <ServiceAccordion
                  items={items}
                  onActiveChange={handleActiveChange}
                />
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
