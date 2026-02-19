import { strapiGet } from "@/lib/api/client";
import type { Expertise, StrapiListResponse } from "@/lib/types/strapi";

export async function getExpertises(): Promise<Expertise[]> {
  const res = await strapiGet<StrapiListResponse<Expertise>>("/expertises", {
    "populate[image]": "true",
    "sort[0]": "order:asc",
  });
  return res.data;
}
