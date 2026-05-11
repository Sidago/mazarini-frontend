export const revalidate = 300;

import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { SafetySections } from "@/components/safety/safety-sections";
import { getToolsAndTechnologyPage } from "@/lib/api/tools-and-technology";
import { getNews } from "@/lib/api/news";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getToolsAndTechnologyPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.title ?? "Tools & Technology",
      fallbackDescription: data.heroText ?? "Mazarini Inc. leverages cutting-edge tools and technology to deliver smarter, faster, and more efficient construction projects.",
      fallbackImage: data.heroImage,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Tools & Technology",
      fallbackDescription: "Mazarini Inc. leverages cutting-edge tools and technology to deliver smarter, faster, and more efficient construction projects.",
    });
  }
}

export default async function ToolsAndTechnologyPage(): Promise<React.ReactElement> {
  const result = await Promise.all([
    getToolsAndTechnologyPage(),
    getNews(),
  ]).catch(() => null);
  if (!result) return notFound();

  const [pageData, allNews] = result;

  const news = allNews
    .sort(
      (a, b) =>
        new Date(b.publishedDate ?? 0).getTime() -
        new Date(a.publishedDate ?? 0).getTime(),
    )
    .slice(0, 3);

  return (
    <SafetySections
      data={pageData}
      news={news}
      newsHeading={"News\n& Insights"}
    />
  );
}
