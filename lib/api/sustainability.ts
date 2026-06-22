import { strapiGet } from "@/lib/api/client";
import { aliasStats } from "@/lib/api/stats";
import type { SustainabilityPage, StrapiResponse } from "@/lib/types/strapi";

export async function getSustainabilityPage(): Promise<SustainabilityPage> {
  const res = await strapiGet<StrapiResponse<SustainabilityPage>>(
    "/sustainability",
    {
      "populate[heroImage]": "true",
      "populate[heroVideo]": "true",
      "populate[accordionImage]": "true",
      "populate[accordionItems]": "true",
      "populate[statItems]": "true",
      "populate[carouselCards][populate][image]": "true",
      "populate[leadershipCards][populate][image]": "true",
"populate[seo][populate][shareImage]": "true",
    },
  );
  return aliasStats(res.data);
}
