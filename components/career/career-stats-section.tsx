"use client";

import { NumbersMarquee } from "@/components/about/numbers-marquee";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerStatsSection({ data }: Props): React.ReactElement {
  const stats = data?.stats ?? [];

  if (stats.length === 0) return <></>;

  return (
    <NumbersMarquee
      title={data?.statsTitle ?? "By the Numbers"}
      stats={stats}
    />
  );
}
