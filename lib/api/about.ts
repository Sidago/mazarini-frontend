import { strapiGet } from "@/lib/api/client";
import type { About, StrapiResponse } from "@/lib/types/strapi";

export async function getAbout(): Promise<About> {
  const res = await strapiGet<StrapiResponse<About>>("/about", {
    "populate[blocks][populate]": "*",
  });
  return res.data;
}
