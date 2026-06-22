import { strapiGet } from "@/lib/api/client";
import { aliasStats } from "@/lib/api/stats";
import type {
  Service,
  ServicesPage,
  StrapiListResponse,
  StrapiResponse,
} from "@/lib/types/strapi";

export async function getServices(): Promise<Service[]> {
  const res = await strapiGet<StrapiListResponse<Service>>("/services", {
    "populate[image]": "true",
  });
  return res.data;
}

export async function getService(slug: string): Promise<Service> {
  const res = await strapiGet<StrapiResponse<Service>>("/services", {
    "filters[slug][$eq]": slug,
    "populate[image]": "true",
    "populate[heroImage]": "true",
    "populate[accordion_items]": "true",
    "populate[testimonials][populate][image]": "true",
    "populate[teams][populate][image]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}

export async function getServicesPage(): Promise<ServicesPage> {
  const res = await strapiGet<StrapiResponse<ServicesPage>>(
    "/services-page",
    {
      "populate[heroVideo]": "true",
      "populate[heroImage]": "true",
      "populate[featuredServices][populate][image]": "true",
      "populate[statItems]": "true",
      "populate[seo][populate][shareImage]": "true",
    },
  );
  return aliasStats(res.data);
}
