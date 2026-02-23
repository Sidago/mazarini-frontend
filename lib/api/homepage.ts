import { strapiGet } from "@/lib/api/client";
import type { Homepage, StrapiResponse } from "@/lib/types/strapi";

export async function getHomepage(): Promise<Homepage> {
  const res = await strapiGet<StrapiResponse<Homepage>>("/homepage", {
    "populate[heroImage]": "true",
    "populate[heroVideo]": "true",
    "populate[heroFeatured]": "true",
    "populate[heroCTAs]": "true",
    "populate[stats]": "true",
    "populate[ctaCTAs]": "true",
    "populate[projects][populate][image]": "true",
    "populate[expertise][populate][image]": "true",
    "populate[testimonials][populate][image]": "true",
    "populate[our_clients][populate][image]": "true",
  });
  // console.log("Fetched homepage data:", res.data);
  return res.data;
}
