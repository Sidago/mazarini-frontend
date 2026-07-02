import { strapiGet } from "@/lib/api/client";
import type { AwardPage, StrapiResponse } from "@/lib/types/strapi";

export async function getAwardPage(): Promise<AwardPage> {
  const res = await strapiGet<StrapiResponse<AwardPage>>("/award-page", {
    "populate[heroImage]": "true",
    "populate[fieldMembers][populate][image]": "true",
    "populate[challengeCards][populate][image]": "true",
    "populate[textColumns]": "true",
    "populate[journeyImage]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}
