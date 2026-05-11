import type { Metadata } from "next";
import { getYouBelongHerePage } from "@/lib/api/you-belong-here";
import { buildMetadata } from "@/lib/utils/seo";
import { YbySections } from "@/components/you-belong-here/yby-sections";
import { notFound } from "next/navigation";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getYouBelongHerePage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "You Belong Here",
      fallbackDescription: data.heroText ?? "Explore career opportunities at Mazarini Inc. Join a team that builds with purpose, passion, and precision.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "You Belong Here",
      fallbackDescription: "Explore career opportunities at Mazarini Inc. Join a team that builds with purpose, passion, and precision.",
    });
  }
}

export default async function YouBelongHerePage() {
  const data = await getYouBelongHerePage().catch(() => null);
  if (!data) return notFound();
  return <YbySections data={data} />;
}
