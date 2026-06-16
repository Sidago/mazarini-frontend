"use client";

import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerMissionSection({ data }: Props): React.ReactElement {
  return (
    <section className="w-full py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* Left: large serif title */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold leading-tight text-neutral-900">
              {data?.missionTitle ?? "Why Build With Us"}
            </h2>
          </div>

          {/* Right: text */}
          <div className="lg:w-1/2 flex items-center">
            {data?.missionText ? (
              <p className="text-base lg:text-lg font-serif leading-relaxed text-neutral-600 whitespace-pre-line">
                {data.missionText}
              </p>
            ) : (
              <p className="text-base lg:text-lg font-serif leading-relaxed text-neutral-400">
                Our team is made up of builders, thinkers, and problem-solvers
                who are passionate about creating lasting impact through
                construction excellence.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
