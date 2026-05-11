export const revalidate = 300;

import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getSustainabilityPage } from "@/lib/api/sustainability";
import { buildMetadata } from "@/lib/utils/seo";
import { SustainabilitySections } from "@/components/sustainability/sustainability-sections";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSustainabilityPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.title ?? "Sustainability",
      fallbackDescription: data.heroText ?? "Mazarini Inc. is committed to sustainable construction practices, green building, and environmental stewardship.",
      fallbackImage: data.heroImage,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Sustainability",
      fallbackDescription: "Mazarini Inc. is committed to sustainable construction practices, green building, and environmental stewardship.",
    });
  }
}

export default async function SustainabilityPage(): Promise<React.ReactElement> {
  const data = await getSustainabilityPage().catch(() => null);
  if (!data) return notFound();

  return <SustainabilitySections data={data} />;
}
