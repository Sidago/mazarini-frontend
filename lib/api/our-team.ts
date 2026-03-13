import { strapiGet } from "@/lib/api/client";
import type {
  Teams,
  TeamsPage,
  StrapiListResponse,
  StrapiResponse,
} from "@/lib/types/strapi";

export async function getTeams(): Promise<Teams[]> {
  const res = await strapiGet<StrapiListResponse<Teams>>("/teams", {
    "populate[image]": "true",
  });
  return res.data;
}

export async function getTeamsPage(): Promise<TeamsPage> {
  const res = await strapiGet<StrapiResponse<TeamsPage>>("/team-page", {
    "populate[heroImage]": "true",
    "populate[heroVedio]": "true",
  });
  return res.data;
}
