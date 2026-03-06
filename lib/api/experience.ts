import { strapiGet } from "./client";
import type { StrapiResponse, ExperiencePage } from "@/lib/types/strapi";

export async function getExperiencePage(): Promise<StrapiResponse<ExperiencePage>> {
  return strapiGet<StrapiResponse<ExperiencePage>>("/experience-page", {
    "populate[heroVideo]": "true",
    "populate[heroImage]": "true",
    "populate[experience_steps][populate][image]": "true",
    "populate[experience_steps][sort]": "order:asc",
  });
}
