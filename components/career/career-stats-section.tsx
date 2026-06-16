"use client";

import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerStatsSection({ data }: Props): React.ReactElement {
  const stats = data?.stats ?? [];

  if (stats.length === 0) return <></>;

  return (
    <section className="w-full py-16 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex-1 flex flex-col items-center justify-center py-8 sm:py-4 px-8 text-center">
              <span className="text-4xl lg:text-5xl font-black text-neutral-900 leading-none">
                {stat.value}
                {stat.suffix && (
                  <span className="text-primary">{stat.suffix}</span>
                )}
              </span>
              <span className="mt-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
                {stat.label}
              </span>
              {stat.description && (
                <p className="mt-1 text-xs text-neutral-400 max-w-xs">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
