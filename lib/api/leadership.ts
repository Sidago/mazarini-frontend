import { strapiGet } from "@/lib/api/client";
import type { LeadershipPageData, StrapiResponse } from "@/lib/types/strapi";

export async function getLeadershipPage(): Promise<LeadershipPageData> {
  const res = await strapiGet<StrapiResponse<LeadershipPageData>>(
    "/leadership-page",
    {
      "populate[groupPhoto]": "true",
      "populate[members][populate][image]": "true",
      "populate[seo][populate][shareImage]": "true",
    },
  );
  return res.data;
}
