"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AccordionItem } from "@/lib/types/strapi";

interface FaqSectionProps {
  title: string;
  description: string | null;
  items: AccordionItem[];
}

export function FaqSection({
  title,
  description,
  items,
}: FaqSectionProps): React.ReactElement {
  const [openIndex, setOpenIndex] = useState(0);

  if (items.length === 0) return <></>;

  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-350 mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          {/* Left column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white italic leading-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Right column - accordion */}
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.id ?? index} className="py-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white pr-4">
                      {item.title}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-8 h-8 flex items-center justify-center text-neutral-500 text-2xl"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
