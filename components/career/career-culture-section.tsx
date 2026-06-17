"use client";

import { ExpertiseSection } from "@/components/home/expertise-section";
import type { CareerPage, Expertise } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerCultureSection({ data }: Props): React.ReactElement {
  const cards = data?.cultureCards ?? [];

  const expertises: Expertise[] = cards.map((card, index) => ({
    id: card.id,
    documentId: String(card.id),
    title: card.title,
    description: "",
    icon: card.tag ?? "",
    image: card.image as Expertise["image"],
    order: index,
  }));

  return (
    <ExpertiseSection
      heading={data?.cultureTitle ?? "A glimpse into our culture"}
      subheading={data?.cultureSubtitle ?? null}
      expertises={expertises}
    />
  );
}
