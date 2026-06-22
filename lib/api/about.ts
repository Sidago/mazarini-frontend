import { strapiGet } from "@/lib/api/client";
import { aliasStats } from "@/lib/api/stats";
import type { About, StrapiResponse } from "@/lib/types/strapi";

export async function getAbout(): Promise<About> {
  const res = await strapiGet<StrapiResponse<About>>("/about", {
    "populate[heroVideo]": "true",
    "populate[heroImage]": "true",
    "populate[statItems]": "true",
    "populate[leadershipBlocks][populate][image]": "true",
    // "populate[leadershipHeading]": "true",
    // "populate[leadershipDescription]": "true",
    "populate[cultureCards][populate][image]": "true",
    "populate[lifeImages][populate][image]": "true",
    "populate[coreValuesImage]": "true",
    "populate[coreValues]": "true",
    // "populate[blocks][populate]": "*",
    "populate[seo][populate][shareImage]": "true",
  });
  console.log("Raw about response:", res);
  return aliasStats(res.data);
}
