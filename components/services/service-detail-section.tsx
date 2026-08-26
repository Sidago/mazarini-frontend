"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceAccordion } from "@/components/services/service-accordion";
import type { Service, StrapiMedia } from "@/lib/types/strapi";

interface ServiceDetailSectionProps {
  service: Service;
}

export function ServiceDetailSection({
  service,
}: ServiceDetailSectionProps): React.ReactElement {
  // The accordion opens the first item by default, so start with its image
  // when it has one; otherwise fall back to the service's own image.
  const [activeImage, setActiveImage] = useState<StrapiMedia | null>(
    service.accordion_items?.[0]?.image ?? service.image ?? null,
  );

  const imageUrl = getStrapiMediaUrl(activeImage);

  function handleActiveChange(index: number): void {
    const itemImage = service.accordion_items?.[index]?.image ?? null;
    // Only swap if the active item actually has an image — otherwise keep the
    // currently displayed one.
    if (itemImage && getStrapiMediaUrl(itemImage)) {
      setActiveImage(itemImage);
    }
  }

  return (
    <section className="py-20 md:py-32 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-0">
          {/* Left — image (swaps with the active accordion item) */}
          <FadeIn direction="left">
            <div className="relative w-full lg:w-[450px] shrink-0 aspect-4/5 overflow-hidden">
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
                      alt={activeImage?.alternativeText ?? service.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1200px) 100vw, 480px"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>

          {/* Right — content */}
          <div className="flex-1 lg:pl-16 pt-10 lg:pt-0 flex flex-col justify-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-1">
                {service.title}
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <p className="text-lg text-neutral-400 leading-relaxed mb-5">
                {service.discriptions}
              </p>
            </FadeIn>

            {/* Accordion detail items */}
            {Array.isArray(service.accordion_items) &&
              service.accordion_items.length > 0 && (
                <FadeIn direction="right" delay={0.2}>
                  <ServiceAccordion
                    items={service.accordion_items}
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
