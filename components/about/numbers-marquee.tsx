"use client";

import { motion } from "framer-motion";
import type { AboutStat } from "@/lib/types/strapi";

const DEFAULT_STATS: AboutStat[] = [
  { id: 1, value: "$500M+", suffix: null, label: "Max Project Size", description: null },
  { id: 2, value: "16", suffix: null, label: "Offices Nationwide", description: null },
  { id: 3, value: "300M+", suffix: null, label: "Square Feet\nDelivered Annually", description: null },
  { id: 4, value: "$14B", suffix: null, label: "2025 Revenue", description: null },
  { id: 5, value: "3,300", suffix: null, label: "Team Members", description: null },
];

interface NumbersMarqueeProps {
  title?: string;
  stats?: AboutStat[];
}

export function NumbersMarquee({
  title = "By the Numbers",
  stats = DEFAULT_STATS,
}: NumbersMarqueeProps): React.ReactElement {
  const source = stats.length > 0 ? stats : DEFAULT_STATS;
  const items = [...source, ...source, ...source];

  return (
    <section className="bg-neutral-950 text-white pt-30 pb-60 overflow-hidden">
      <p className="text-center text-3xl md:text-4xl font-semibold mb-25 tracking-wide">
        {title}
      </p>

      <div className="flex">
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex flex-none">
          {items.map((stat, i) => (
            <div
              key={i}
              className="flex flex-none items-center gap-12 px-12">
              {/* Stat block */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-4xl md:text-5xl font-bold text-primary leading-none whitespace-nowrap">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-sm font-semibold uppercase tracking-widest text-white whitespace-pre-line leading-snug">
                  {stat.label}
                </span>
              </div>

              {/* Divider */}
              <div className="w-px h-16 bg-white/20 flex-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
