import { strapiGet } from "@/lib/api/client";
import type { SafetyPage, StrapiResponse } from "@/lib/types/strapi";

export async function getSafetyPage(): Promise<SafetyPage> {
  const res = await strapiGet<StrapiResponse<SafetyPage>>("/safety", {
    "populate[heroImage]": "true",
    "populate[heroVedio]": "true",
    "populate[accordionImage]": "true",
    "populate[accordionItems]": "true",
    "populate[stats]": "true",
    "populate[carouselCard][populate][image]": "true",
    "populate[leadership_cards][populate][image]": "true",
  });
  return res.data;
}
