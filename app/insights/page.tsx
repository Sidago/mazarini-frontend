export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { InsightsCarousel } from "@/components/insights/insights-carousel";
import { InsightsList } from "@/components/insights/insights-list";
import { getInsights, getInsightsPage } from "@/lib/api/insights";
import { buildMetadata } from "@/lib/utils/seo";
import type { Insight, InsightsPage } from "@/lib/types/strapi";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getInsightsPage();
    return buildMetadata({
      seo: pageData.seo,
      fallbackTitle: pageData.pageTitle ?? "Insights",
      fallbackDescription: pageData.pageDescription ?? "Expert perspectives, industry trends, and thought leadership from the Mazarini Inc. team.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Insights",
      fallbackDescription: "Expert perspectives, industry trends, and thought leadership from the Mazarini Inc. team.",
    });
  }
}

export default async function InsightsPageRoute(): Promise<React.ReactElement> {
  let pageData: InsightsPage | null = null;
  let insights: Insight[] = [];

  try {
    [pageData, insights] = await Promise.all([
      getInsightsPage().catch(() => null),
      getInsights(),
    ]);
  } catch {
    // Strapi unavailable — render empty state
    notFound();
  }

  const featuredInsights = pageData?.featuredInsights ?? [];
  const ctaText = pageData?.featuredCTA ?? "Read More";
  const pageTitle = pageData?.pageTitle ?? "Insights";
  const pageDescription = pageData?.pageDescription ?? "";

  return (
    <>
      {featuredInsights.length > 0 && (
        <InsightsCarousel insights={featuredInsights} ctaText={ctaText} />
      )}

      <section className="pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <FadeIn direction="up">
            <h2 className="text-4xl font-serif md:text-5xl font-semibold text-neutral-900 mb-4">
              {pageTitle}
            </h2>
          </FadeIn>
          {pageDescription && (
            <FadeIn direction="up" delay={0.1}>
              <p className="text-base tracking-wider leading-relaxed text-neutral-500 max-w-2xl">
                {pageDescription}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <InsightsList insights={insights} />
    </>
  );
}
