import { strapiGet } from "@/lib/api/client";
import type {
  CareerPage,
  Job,
  StrapiResponse,
  StrapiListResponse,
} from "@/lib/types/strapi";

export async function getCareerPage(): Promise<CareerPage> {
  const res = await strapiGet<StrapiResponse<CareerPage>>("/career-page", {
    "populate[heroImage]": "true",
    "populate[heroVideo]": "true",
    "populate[stats]": "true",
    "populate[quotes][populate][authorImage]": "true",
    "populate[peopleImages]": "true",
    "populate[benefitsImage]": "true",
    "populate[benefitItems][populate][image]": "true",
    "populate[cultureCards][populate][image]": "true",
    "populate[featureItems][populate][image]": "true",
    "populate[belongImage]": "true",
    "populate[personImage]": "true",
    "populate[resourceItems]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}

export async function getJobs(): Promise<Job[]> {
  const res = await strapiGet<StrapiListResponse<Job>>("/jobs", {
    "filters[isActive][$eq]": "true",
    "sort[0]": "order:asc",
    "pagination[limit]": "20",
  });
  return res.data;
}
