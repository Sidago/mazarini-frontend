import { strapiGet } from "@/lib/api/client";
import type { YouBelongHerePage, StrapiResponse } from "@/lib/types/strapi";

export async function getYouBelongHerePage(): Promise<YouBelongHerePage> {
  const res = await strapiGet<StrapiResponse<YouBelongHerePage>>(
    "/you-belong-here-page",
    {
      "populate[heroImage]": "true",
      "populate[heroVideo]": "true",
      "populate[quoteAuthorImage]": "true",
      "populate[belongingItems]": "true",
      "populate[missionItems]": "true",
      "populate[subcontractorsImage]": "true",
      "populate[accomplishments]": "true",
      "populate[goals]": "true",
      "populate[careersImage]": "true",
      "populate[featuredNews][populate][image]": "true",
      "populate[featuredLeadership][populate][image]": "true",
      "populate[seo][populate][shareImage]": "true",
    },
  );
  return res.data;
}
