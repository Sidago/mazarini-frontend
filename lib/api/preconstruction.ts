import { strapiGet } from "@/lib/api/client";
import type { PreconstructionPage, StrapiResponse } from "@/lib/types/strapi";

export async function getPreconstructionPage(): Promise<PreconstructionPage> {
  const res = await strapiGet<StrapiResponse<PreconstructionPage>>(
    "/preconstruction-page",
    {
      "populate[heroImage]": "true",
      "populate[accordionImage]": "true",
      "populate[accordionItems][populate][image]": "true",
      "populate[journeyImage]": "true",
      "populate[seo][populate][shareImage]": "true",
    }
  );
  return res.data;
}
