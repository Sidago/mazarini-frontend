import { strapiGet } from "@/lib/api/client";
import type { Global, StrapiResponse } from "@/lib/types/strapi";

export async function getGlobal(): Promise<Global> {
  const res = await strapiGet<StrapiResponse<Global>>("/global", {
    "populate[logo]": "true",
    "populate[favicon]": "true",
    "populate[defaultSeo][populate][shareImage]": "true",
    "populate[navLinks]": "true",
    "populate[footerColumns][populate][links]": "true",
    "populate[socialLinks]": "true",
    "populate[bottomLinks]": "true",
  });
  return res.data;
}
