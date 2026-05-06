export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { CrSections } from "@/components/corporate-responsibility/cr-sections";
import { getCorporateResponsibilityPage } from "@/lib/api/corporate-responsibility";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getCorporateResponsibilityPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: "Corporate Responsibility",
      fallbackDescription: data.heroText ?? data.pillarsDescription,
      fallbackImage: data.heroImage,
    });
  } catch {
    return buildMetadata({ fallbackTitle: "Corporate Responsibility" });
  }
}

export default async function CorporateResponsibilityPage(): Promise<React.ReactElement> {
  const data = await getCorporateResponsibilityPage().catch(() => null);
  if (!data) return notFound();

  return <CrSections data={data} />;
}
