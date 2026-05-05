"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { CorporateResponsibilityPage } from "@/lib/types/strapi";

interface MetricsSectionProps {
  data: CorporateResponsibilityPage;
}

export function MetricsSection({
  data,
}: MetricsSectionProps): React.ReactElement {
  const metrics = [...(data.metrics ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="metrics"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-neutral-900 text-white">
      {data.impactWatermark && (
        <div className="pointer-events-none select-none absolute">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="15vw"
            flip={true}>
            {data.impactWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative font-serif z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-center">
          {/* Left */}
          <div className="lg:pl-[10vw]">
            <h2 className="text-3xl font-semibold leading-loose mb-6">
              {data.impactTitle ?? "Impact by the Numbers"}
            </h2>
            {data.impactCtaUrl && (
              <Link
                href={data.impactCtaUrl}
                className="inline-block max-w-50 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-center text-neutral-900 hover:bg-amber-500 transition-colors hover:cursor-pointer">
                {data.impactCtaText ?? "View Annual Report"}
              </Link>
            )}
          </div>

          {/* Right: metrics */}
          <div className="flex flex-col divide-y divide-white/10">
            {metrics.map((metric) => (
              <div key={metric.id} className="py-6">
                <p className="text-primary text-3xl font-bold mb-1">
                  {metric.value}
                </p>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
