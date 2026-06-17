"use client";

import { LifeSection } from "@/components/about/life-section";
import type { CareerPage, LifeImage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerPeopleSection({ data }: Props): React.ReactElement {
  const images: LifeImage[] = (data?.peopleImages ?? []).map((img) => ({
    id: img.id,
    image: img,
  }));

  return (
    <LifeSection
      heading={data?.peopleTitle ?? "Centered Around Our People"}
      description={data?.peopleSubtitle ?? null}
      images={images}
    />
  );
}
