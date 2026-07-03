import { strapiGet } from "@/lib/api/client";
import { aliasStats } from "@/lib/api/stats";
import type { ConstructionPage, StrapiResponse } from "@/lib/types/strapi";

export async function getConstructionPage(): Promise<ConstructionPage> {
  const res = await strapiGet<StrapiResponse<ConstructionPage>>("/construction-page", {
    "populate[heroImage]": "true",
    "populate[quotes][populate][authorImage]": "true",
    "populate[accordionImage]": "true",
    "populate[accordionItems][populate][image]": "true",
    "populate[statItems]": "true",
    "populate[textColumns]": "true",
    "populate[sustainabilityCards][populate][image]": "true",
    "populate[innovationItems][populate][image]": "true",
    "populate[journeyImage]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return aliasStats(res.data);
}
