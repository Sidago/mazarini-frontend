import type { Metadata } from "next";
import { getYouBelongHerePage } from "@/lib/api/you-belong-here";
import { buildMetadata } from "@/lib/utils/seo";
import { YbySections } from "@/components/you-belong-here/yby-sections";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getYouBelongHerePage().catch(() => {
    return notFound();
  });
  return buildMetadata({
    seo: data.seo,
    fallbackTitle: data.heroTitle ?? "You Belong Here",
    fallbackDescription: data.heroText,
  });
}

export default async function YouBelongHerePage() {
  const data = await getYouBelongHerePage();
  return <YbySections data={data} />;
}
