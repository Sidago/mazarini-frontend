import { strapiGet } from "@/lib/api/client";
import { aliasStats } from "@/lib/api/stats";
import type { ToolsAndTechnologyPage, StrapiResponse } from "@/lib/types/strapi";

export async function getToolsAndTechnologyPage(): Promise<ToolsAndTechnologyPage> {
  const res = await strapiGet<StrapiResponse<ToolsAndTechnologyPage>>(
    "/tools-and-technology",
    {
      "populate[heroImage]": "true",
      "populate[heroVedio]": "true",
      "populate[accordionImage]": "true",
      "populate[accordionItems]": "true",
      "populate[statItems]": "true",
      "populate[carouselCard][populate][image]": "true",
      "populate[leadership_cards][populate][image]": "true",
      "populate[seo][populate][shareImage]": "true",
    },
  );
  return aliasStats(res.data);
}
