export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getColabPage } from "@/lib/api/colab";
import { buildMetadata } from "@/lib/utils/seo";
import { ColabSections } from "@/components/colab/colab-sections";
import { YouMightBeInterested } from "@/components/common/you-might-be-interested";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getColabPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? data.introTitle ?? "CoLab",
      fallbackDescription: data.heroText ?? data.introText ?? "Mazarini CoLab: a collaborative innovation hub where ideas, partnerships, and cutting-edge construction solutions come together.",
      fallbackImage: data.heroImage ?? data.introImage,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "CoLab",
      fallbackDescription: "Mazarini CoLab: a collaborative innovation hub where ideas, partnerships, and cutting-edge construction solutions come together.",
    });
  }
}

export default async function ColabPage() {
  const data = await getColabPage().catch(() => null);
  if (!data) return notFound();

  return <ColabSections data={data} moreSection={<YouMightBeInterested title="More" />} />;
}
