import type { Metadata } from "next";
import { getConstructionPage } from "@/lib/api/construction";
import { buildMetadata } from "@/lib/utils/seo";
import { ConstructionSections } from "@/components/construction/construction-sections";
import type { ConstructionPage } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getConstructionPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Construction",
      fallbackDescription:
        data.heroText ??
        "Construction services that turn plans into landmark projects.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Construction",
      fallbackDescription:
        "Construction services that turn plans into landmark projects.",
    });
  }
}

export default async function ConstructionPageRoute(): Promise<React.ReactElement> {
  const data = await getConstructionPage().catch((error) => {
    console.error("Failed to fetch construction page:", error);
    return null as ConstructionPage | null;
  });

  return <ConstructionSections data={data} />;
}
