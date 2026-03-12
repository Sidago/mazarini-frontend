"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AccordionItem } from "@/lib/types/strapi";

interface ServiceAccordionProps {
  items: AccordionItem[];
}

export function ServiceAccordion({
  items,
}: ServiceAccordionProps): React.ReactElement {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full max-w-full overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.id ?? index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className={`w-full text-left border-l-4 pl-6 py-2 transition-colors cursor-pointer ${
                isOpen
                  ? "border-primary"
                  : "border-white/20 hover:border-white/40"
              }`}>
              <h3
                className={`text-lg font-bold transition-colors ${
                  isOpen ? "text-white" : "text-white/60"
                }`}>
                {item.title}
              </h3>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <div className="border-l-4 border-primary pl-8 pb-2">
                    <p className="text-neutral-400 leading-normal whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
