import { strapiGet } from "@/lib/api/client";
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

export async function getService(id: string): Promise<Service> {
  const res = await strapiGet<StrapiResponse<Service>>("/services", {
    "filters[id][$eq]": id,
    "populate[image]": "true",
    "populate[heroImage]": "true",
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
    },
  );
  return res.data;
}
