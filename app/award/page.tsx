import type { Metadata } from "next";
import { getAwardPage } from "@/lib/api/award";
import { buildMetadata } from "@/lib/utils/seo";
import { AwardSections } from "@/components/award/award-sections";
import type { AwardPage } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getAwardPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Project Award",
      fallbackDescription:
        data.heroText ??
        "Recognizing the people and projects that set the standard for excellence.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Project Award",
      fallbackDescription:
        "Recognizing the people and projects that set the standard for excellence.",
    });
  }
}

export default async function AwardPageRoute(): Promise<React.ReactElement> {
  const data = await getAwardPage().catch((error) => {
    console.error("Failed to fetch award page:", error);
    return null as AwardPage | null;
  });

  return <AwardSections data={data} />;
}
