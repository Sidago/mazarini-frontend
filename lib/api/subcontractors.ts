import { strapiGet } from "./client";
import type { SubcontractorsPage, StrapiResponse } from "@/lib/types/strapi";

export async function getSubcontractorsPage(): Promise<SubcontractorsPage> {
  const res = await strapiGet<StrapiResponse<SubcontractorsPage>>(
    "/subcontractors-page",
    {
      "populate[heroVideo]": "true",
      "populate[heroImage]": "true",
      "populate[quotes]": "true",
      "populate[onboardingRequirements]": "true",
      "populate[onboardingExtraRequirements]": "true",
      "populate[tradePartnerTabs][populate][image]": "true",
      "populate[faqItems]": "true",
      "populate[seo][populate][shareImage]": "true",
    },
  );
  return res.data;
}
