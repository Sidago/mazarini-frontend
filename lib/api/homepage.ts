import { strapiGet } from "@/lib/api/client";
import { aliasStats } from "@/lib/api/stats";
import type { Homepage, StrapiResponse } from "@/lib/types/strapi";

export async function getHomepage(): Promise<Homepage> {
  const res = await strapiGet<StrapiResponse<Homepage>>("/homepage", {
    "populate[heroImage]": "true",
    "populate[heroVideo]": "true",
    "populate[heroFeatured]": "true",
    "populate[heroCTAs]": "true",
    "populate[statItems]": "true",
    "populate[ctaCTAs]": "true",
    "populate[projects][populate][image]": "true",
    "populate[expertise][populate][image]": "true",
    "populate[testimonials][populate][image]": "true",
    "populate[our_clients][populate][image]": "true",
    "populate[experienceImage]": "true",
    "populate[belongImage]": "true",
    "populate[sparkImage]": "true",
    "populate[news][populate][image]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  // console.log("Fetched homepage data:", res.data);
  return aliasStats(res.data);
}
