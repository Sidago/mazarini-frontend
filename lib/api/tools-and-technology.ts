import { strapiGet } from "@/lib/api/client";
import type { ToolsAndTechnologyPage, StrapiResponse } from "@/lib/types/strapi";

export async function getToolsAndTechnologyPage(): Promise<ToolsAndTechnologyPage> {
  const res = await strapiGet<StrapiResponse<ToolsAndTechnologyPage>>(
    "/tools-and-technology",
    {
      "populate[heroImage]": "true",
      "populate[heroVedio]": "true",
      "populate[accordionImage]": "true",
      "populate[accordionItems]": "true",
      "populate[stats]": "true",
      "populate[carouselCard][populate][image]": "true",
      "populate[leadership_cards][populate][image]": "true",
    },
  );
  return res.data;
}
