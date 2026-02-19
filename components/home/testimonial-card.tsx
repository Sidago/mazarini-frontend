"use client";

import { motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Testimonial } from "@/lib/types/strapi";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(testimonial.image ?? null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="min-w-[90vw] md:min-w-[500px] snap-center bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700 flex flex-col md:flex-row h-auto md:h-[350px] transition-shadow duration-300 hover:shadow-2xl">
      <div className="w-full md:w-2/5 h-64 md:h-full relative overflow-hidden">
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt={`Portrait of ${testimonial.client_name}`}
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/20 dark:from-neutral-800/20 to-transparent" />
      </div>
      <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
        <div>
          <span className="text-primary text-6xl font-serif leading-none opacity-30">
            &ldquo;
          </span>
          <p className="text-neutral-700 dark:text-neutral-300 text-lg italic leading-relaxed relative -mt-4 z-10">
            {testimonial.quote}
          </p>
        </div>
        <div className="mt-6">
          <h4 className="text-neutral-900 dark:text-white font-bold text-lg">
            {testimonial.client_name}
          </h4>
          {(testimonial.designation || testimonial.company) && (
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              {testimonial.designation}
              {testimonial.designation && testimonial.company && ", "}
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
