"use client";

import { StatItem } from "@/components/home/stat-item";
import type { StatComponent } from "@/lib/types/strapi";
import { TextReveal } from "../ui/scroll-animations";
import { motion } from "framer-motion";

interface StatsBarProps {
  stats: StatComponent[];
  description?: string | null;
}

export function StatsBar({
  stats,
  description,
}: StatsBarProps): React.ReactElement {
  if (!stats.length) return <></>;

  return (
    <section className="bg-surface py-16">
      <div className="max-w-360 mx-auto pt-12 px-8 md:px-16">
        <TextReveal
          text="By Numbers"
          as="h2"
          className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4"
        />
        <motion.div
          className="h-1 bg-primary mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </div>
      <div className="max-w-360 mx-auto px-8 md:px-16 py-14 flex flex-col gap-8 lg:gap-16">
        {description && (
          <div className="md:w-[60%]">
            <p className="font-headline leading-relaxed text-on-surface whitespace-pre-line">
              {description}
            </p>
          </div>
        )}

        <div className="lg:w-2/3 grid grid-cols-2 gap-y-12 md:w-[60%] ml-auto">
          {stats.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
