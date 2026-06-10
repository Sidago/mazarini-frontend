import { strapiGet } from "@/lib/api/client";
import type { About, StrapiResponse } from "@/lib/types/strapi";

export async function getAbout(): Promise<About> {
  const res = await strapiGet<StrapiResponse<About>>("/about", {
    "populate[heroVideo]": "true",
    "populate[heroImage]": "true",
    "populate[stats]": "true",
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
  return res.data;
}
