import { IPostConstructionPage, StrapiResponse } from "../types/strapi";
import { strapiGet } from "./client";

export async function getPostConstructionPage(): Promise<IPostConstructionPage> {
  const res = await strapiGet<StrapiResponse<IPostConstructionPage>>(
    "/post-construction-page",
    {
      "populate[heroImage]": "true",
      "populate[stats][populate][icon]": "true",
      "populate[seo][populate][shareImage]": "true",
      "populate[nextImage]": "true",
      "populate[quotes]": "true",
      "populate[accordionItems][populate][image]": "true",
      "populate[stats]": "true",
      "populate[conversationBlock]": "true",
    },
  );
  return res.data;
}
