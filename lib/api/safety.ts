import { strapiGet } from "@/lib/api/client";
import { aliasStats } from "@/lib/api/stats";
import type { SafetyPage, StrapiResponse } from "@/lib/types/strapi";

export async function getSafetyPage(): Promise<SafetyPage> {
  const res = await strapiGet<StrapiResponse<SafetyPage>>("/safety", {
    "populate[heroImage]": "true",
    "populate[heroVedio]": "true",
    "populate[accordionImage]": "true",
    "populate[accordionItems][populate][image]": "true",
    "populate[statItems]": "true",
    "populate[carouselCard][populate][image]": "true",
    "populate[leadership_cards][populate][image]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return aliasStats(res.data);
}
