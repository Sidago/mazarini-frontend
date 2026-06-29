import { strapiGet } from "@/lib/api/client";
import type {
  Job,
  JobsPage,
  StrapiListResponse,
  StrapiResponse,
} from "@/lib/types/strapi";

export async function getJobsPage(): Promise<JobsPage> {
  const res = await strapiGet<StrapiResponse<JobsPage>>("/jobs-page", {
    "populate[heroImage]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}

export async function getAllJobs(): Promise<Job[]> {
  const res = await strapiGet<StrapiListResponse<Job>>("/jobs", {
    "filters[isActive][$eq]": "true",
    "sort[0]": "order:asc",
    "sort[1]": "createdAt:desc",
    "pagination[limit]": "200",
  });
  return res.data;
}
