export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { SafetySections } from "@/components/safety/safety-sections";
import { getToolsAndTechnologyPage } from "@/lib/api/tools-and-technology";
import { getNews } from "@/lib/api/news";

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
