import { strapiGet } from "@/lib/api/client";
import type {
  Project,
  ProjectsPage,
  StrapiListResponse,
  StrapiResponse,
} from "@/lib/types/strapi";

export async function getProjects(): Promise<Project[]> {
  const res = await strapiGet<StrapiListResponse<Project>>("/projects", {
    "populate[image]": "true",
  });
  return res.data;
}

export async function getProject(id: string): Promise<Project> {
  const res = await strapiGet<StrapiResponse<Project>>(`/projects`, {
    "filters[id][$eq]": id,
    "populate[image]": "true",
  });
  return res.data;
}

export async function getProjectsPage(): Promise<ProjectsPage> {
  const res = await strapiGet<StrapiResponse<ProjectsPage>>("/projects-page", {
    "populate[featuredProjects][populate][image]": "true",
  });

  console.log("Fetched projects page data:", res.data);
  return res.data;
}
