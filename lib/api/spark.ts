import { strapiGet } from "@/lib/api/client";
import type { SparkPage, StrapiResponse } from "@/lib/types/strapi";

export async function getSparkPage(): Promise<SparkPage> {
  const res = await strapiGet<StrapiResponse<SparkPage>>("/spark-page", {
    "populate[heroImage]": "true",
    "populate[heroVideo]": "true",
    "populate[statementImage]": "true",
    "populate[blocks][populate][image]": "true",
    "populate[wideImage]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}
