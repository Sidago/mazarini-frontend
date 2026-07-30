import { strapiGet } from "@/lib/api/client";
import type { ConsiderationPage, StrapiResponse } from "@/lib/types/strapi";

export async function getConsiderationPage(): Promise<ConsiderationPage> {
  const res = await strapiGet<StrapiResponse<ConsiderationPage>>(
    "/consideration-page",
    {
      "populate[heroImage]": "true",
      "populate[advisorImage]": "true",
      "populate[partners][populate][logo]": "true",
      "populate[quizQuestions]": "true",
      "populate[journeyImage]": "true",
      "populate[seo][populate][shareImage]": "true",
    }
  );
  return res.data;
}
