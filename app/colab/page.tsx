export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getColabPage } from "@/lib/api/colab";
import { buildMetadata } from "@/lib/utils/seo";
import { ColabSections } from "@/components/colab/colab-sections";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getColabPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.introTitle ?? "CoLab",
      fallbackDescription: data.introText,
      fallbackImage: data.introImage,
    });
  } catch {
    return buildMetadata({ fallbackTitle: "CoLab" });
  }
}

export default async function ColabPage() {
  const data = await getColabPage().catch(() => null);
  if (!data) return notFound();

  return <ColabSections data={data} />;
}
