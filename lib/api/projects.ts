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
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}

export async function getProjectTeams(id: string): Promise<import("@/lib/types/strapi").Teams[]> {
  try {
    const res = await strapiGet<StrapiResponse<Project>>(`/projects`, {
      "filters[id][$eq]": id,
      "populate[teams][populate][image]": "true",
    });
    const project = Array.isArray(res.data) ? res.data[0] : res.data;
    return project?.teams ?? [];
  } catch {
    return [];
  }
}

export async function getProjectsPage(): Promise<ProjectsPage> {
  const res = await strapiGet<StrapiResponse<ProjectsPage>>("/projects-page", {
    "populate[featuredProjects][populate][image]": "true",
    "populate[seo][populate][shareImage]": "true",
  });
  return res.data;
}
