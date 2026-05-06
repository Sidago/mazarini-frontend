import { strapiGet } from "@/lib/api/client";
import type { About, StrapiResponse } from "@/lib/types/strapi";

export async function getAbout(): Promise<About> {
  const res = await strapiGet<StrapiResponse<About>>("/about", {
    "populate[heroVideo]": "true",
    "populate[heroImage]": "true",
    "populate[stats]": "true",
    "populate[leadershipBlocks][populate][image]": "true",
    "populate[cultureCards][populate][image]": "true",
    "populate[lifeImages][populate][image]": "true",
    // "populate[blocks][populate]": "*",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}
