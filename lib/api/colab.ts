import { strapiGet } from "@/lib/api/client";
import type { ColabPage, StrapiResponse } from "@/lib/types/strapi";

export async function getColabPage(): Promise<ColabPage> {
  const res = await strapiGet<StrapiResponse<ColabPage>>("/colab-page", {
    "populate[heroImage]": "true",
    "populate[heroVideo]": "true",
    "populate[introImage]": "true",
    "populate[introVideo]": "true",
    "populate[stats]": "true",
    "populate[visionItems]": "true",
    "populate[experienceImage]": "true",
    "populate[testimonialImage]": "true",
    "populate[elementCards][populate][image]": "true",
    "populate[challengeCards][populate][image]": "true",
    "populate[innovations][populate][image]": "true",
    "populate[resultsImages]": "true",
    "populate[teamMembers][populate][image]": "true",
    "populate[featuredNews][populate][image]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}
