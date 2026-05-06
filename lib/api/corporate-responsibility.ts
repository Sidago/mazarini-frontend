import { strapiGet } from "@/lib/api/client";
import type { CorporateResponsibilityPage, StrapiResponse } from "@/lib/types/strapi";

export async function getCorporateResponsibilityPage(): Promise<CorporateResponsibilityPage> {
  const res = await strapiGet<StrapiResponse<CorporateResponsibilityPage>>(
    "/corporate-responsibility-page",
    {
      "populate[heroImage]": "true",
      "populate[heroVideo]": "true",
      "populate[quoteAuthorImage]": "true",
      "populate[pillars][populate][image]": "true",
      "populate[foundationImage]": "true",
      "populate[metrics]": "true",
      "populate[featuredNews][populate][image]": "true",
      "populate[executives][populate][image]": "true",
      "populate[seo][populate][shareImage]": "true",
    },
  );
  return res.data;
}
