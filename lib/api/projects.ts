import { strapiGet } from "@/lib/api/client";
import type { Project, StrapiListResponse } from "@/lib/types/strapi";

export async function getProjects(): Promise<Project[]> {
  const res = await strapiGet<StrapiListResponse<Project>>("/projects", {
    "populate[image]": "true",
    "sort[0]": "order:asc",
  });
  return res.data;
}
