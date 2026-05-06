export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { SafetySections } from "@/components/safety/safety-sections";
import { getSafetyPage } from "@/lib/api/safety";
import { getNews } from "@/lib/api/news";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSafetyPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.title ?? "Safety",
      fallbackDescription: data.heroText,
      fallbackImage: data.heroImage,
    });
  } catch {
    return buildMetadata({ fallbackTitle: "Safety" });
  }
}

export default async function SafetyPage(): Promise<React.ReactElement> {
  const result = await Promise.all([getSafetyPage(), getNews()]).catch(
    () => null,
  );
  if (!result) return notFound();

  const [safetyData, allNews] = result;

  const news = allNews
    .sort(
      (a, b) =>
        new Date(b.publishedDate ?? 0).getTime() -
        new Date(a.publishedDate ?? 0).getTime(),
    )
    .slice(0, 3);

  return (
    <SafetySections
      data={safetyData}
      news={news}
      newsHeading={"News\n& Insights"}
    />
  );
}
