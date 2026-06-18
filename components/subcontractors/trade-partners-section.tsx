"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { TradePartnerTab } from "@/lib/types/strapi";

interface TradePartnersSectionProps {
  title: string;
  description: string | null;
  tabs: TradePartnerTab[];
}

export function TradePartnersSection({
  title,
  description,
  tabs,
}: TradePartnersSectionProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) return <></>;

  const activeItem = tabs[activeTab];
  const imageUrl = getStrapiMediaUrl(activeItem.image ?? null);

  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-350 mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif font-black text-neutral-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === index
                  ? "border-primary text-neutral-900 dark:text-white font-bold"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              }`}
            >
              {tab.tabName}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            {imageUrl && (
              <div className="relative overflow-hidden aspect-[5.5/3]">
                <Image
                  src={imageUrl}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}

            {/* Content */}
            <div>
              <h3 className="text-3xl font-black text-neutral-900 dark:text-white  mb-4">
                {activeItem.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
