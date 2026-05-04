import { strapiGet } from "@/lib/api/client";
import type { Insight, InsightsPage, StrapiListResponse, StrapiResponse } from "@/lib/types/strapi";

export async function getInsightsPage(): Promise<InsightsPage> {
  const res = await strapiGet<StrapiResponse<InsightsPage>>("/insights-page", {
    "populate[featuredInsights][populate][image]": "true",
  });
  return res.data;
}

export async function getInsights(): Promise<Insight[]> {
  const res = await strapiGet<StrapiListResponse<Insight>>("/insights", {
    "populate[image]": "true",
    "sort": "date:desc",
    "pagination[limit]": "100",
  });
  return res.data;
}
