import { strapiGet } from "@/lib/api/client";
import type { RdPage, StrapiResponse } from "@/lib/types/strapi";

export async function getRdPage(): Promise<RdPage> {
  const res = await strapiGet<StrapiResponse<RdPage>>("/rd-page", {
    "populate[heroImage]": "true",
    "populate[heroVideo]": "true",
    "populate[whyCards][populate][image]": "true",
    "populate[pillars][populate][image]": "true",
    "populate[featuredProjects][populate][image]": "true",
    "populate[featuredNews][populate][image]": "true",
    "populate[partners][populate][image]": "true",
    "populate[featuredLeadership][populate][image]": "true",
  });
  return res.data;
}
