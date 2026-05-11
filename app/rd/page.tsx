export const revalidate = 300;

import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { RdSections } from "@/components/rd/rd-sections";
import { getRdPage } from "@/lib/api/rd";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getRdPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: "Research & Development",
      fallbackDescription: data.heroText ?? data.whyDescription ?? "Mazarini Inc. invests in research and development to pioneer new construction technologies, materials, and methodologies.",
      fallbackImage: data.heroImage,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Research & Development",
      fallbackDescription: "Mazarini Inc. invests in research and development to pioneer new construction technologies, materials, and methodologies.",
    });
  }
}

export default async function RdPage(): Promise<React.ReactElement> {
  const data = await getRdPage().catch(() => null);
  if (!data) return notFound();

  return <RdSections data={data} />;
}
