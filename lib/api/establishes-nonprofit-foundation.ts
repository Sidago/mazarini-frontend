import { strapiGet } from "@/lib/api/client";
import type {
  EstablishesNonprofitFoundationPage,
  StrapiResponse,
} from "@/lib/types/strapi";

export async function getEstablishesNonprofitFoundationPage(): Promise<EstablishesNonprofitFoundationPage> {
  const res = await strapiGet<StrapiResponse<EstablishesNonprofitFoundationPage>>(
    "/establishes-nonprofit-foundation-page",
    {
      "populate[heroImage]": "true",
      "populate[galleryImage1]": "true",
      "populate[galleryImage2]": "true",
      "populate[galleryImage3]": "true",
      "populate[galleryImage4]": "true",
      "populate[promoProjectsImage]": "true",
      "populate[promoExperienceImage]": "true",
      "populate[seo][populate][shareImage]": "true",
    }
  );
  return res.data;
}
