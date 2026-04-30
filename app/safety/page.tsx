export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { SafetySections } from "@/components/safety/safety-sections";
import { getSafetyPage } from "@/lib/api/safety";
import { getNews } from "@/lib/api/news";

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
