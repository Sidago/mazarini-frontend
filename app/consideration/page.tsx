import type { Metadata } from "next";
import { getConsiderationPage } from "@/lib/api/consideration";
import { buildMetadata } from "@/lib/utils/seo";
import { ConsiderationSections } from "@/components/consideration/consideration-sections";
import type { ConsiderationPage } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getConsiderationPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Consideration",
      fallbackDescription:
        data.heroText ??
        "Choosing the right partner for your next project starts here.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Consideration",
      fallbackDescription:
        "Choosing the right partner for your next project starts here.",
    });
  }
}

export default async function ConsiderationPageRoute(): Promise<React.ReactElement> {
  const data = await getConsiderationPage().catch((error) => {
    console.error("Failed to fetch consideration page:", error);
    return null as ConsiderationPage | null;
  });

  return <ConsiderationSections data={data} />;
}
