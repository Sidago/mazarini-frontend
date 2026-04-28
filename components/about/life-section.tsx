"use client";

import { motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { LifeImage } from "@/lib/types/strapi";

interface LifeSectionProps {
  heading: string | null;
  description: string | null;
  images: LifeImage[];
}

export function LifeSection({
  heading,
  description,
  images,
}: LifeSectionProps): React.ReactElement {
  if (!heading && images.length === 0) return <></>;

  const items = [...images, ...images, ...images];

  return (
    <section className="bg-neutral-950 text-white py-30 overflow-hidden">
      {/* Heading + description */}
      {(heading || description) && (
        <div className="text-center mb-14 px-6">
          {heading && (
            <h2 className="text-3xl lg:text-5xl font-bold font-serif mb-4">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-base lg:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Auto-scrolling image strip */}
      {images.length > 0 && (
        <div className="flex">
          <motion.div
            animate={{ x: ["0%", "-15%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-none gap-5">
            {items.map((item, i) => {
              const url = getStrapiMediaUrl(item.image);
              return (
                <div
                  key={i}
                  className="flex-none h-64 lg:h-80 overflow-hidden">
                  {url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt={item.image?.alternativeText ?? "Life at Mazarini"}
                      className="h-full w-auto object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="h-full w-64 bg-neutral-800" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
}
