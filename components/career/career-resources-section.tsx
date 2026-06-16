"use client";

import Link from "next/link";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerResourcesSection({ data }: Props): React.ReactElement {
  const resourceItems = data?.resourceItems ?? [];

  if (resourceItems.length === 0) return <></>;

  return (
    <section className="w-full py-20 lg:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 mb-12">
          {data?.resourcesTitle ?? "Additional Resources"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {resourceItems.map((item) => {
            const content = (
              <div className="group flex items-center justify-between border-b-2 border-primary pb-5 gap-4">
                <span className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </span>
                <svg
                  className="flex-none text-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            );

            return item.url ? (
              <Link
                key={item.id}
                href={item.url}
                className="flex-1 min-w-[200px]">
                {content}
              </Link>
            ) : (
              <div key={item.id} className="flex-1 min-w-[200px]">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
