"use client";

import { LifeSection } from "@/components/about/life-section";
import type { CareerPage, LifeImage } from "@/lib/types/strapi";
import { div } from "framer-motion/client";

interface Props {
  data: CareerPage | null;
}

export function CareerPeopleSection({ data }: Props): React.ReactElement {
  const images: LifeImage[] = (data?.peopleImages ?? []).map((img) => ({
    id: img.id,
    image: img,
  }));

  return (
    <div className="bg-neutral-950 pt-10 lg:pt-24">
    <LifeSection
      heading={data?.peopleTitle ?? "Centered Around Our People"}
      description={data?.peopleSubtitle ?? null}
      images={images}
    />
    </div>
  );
}
