import { getStrapiUrl } from "@/lib/api/client";
import type {
  Project,
  News,
  Expertise,
  Service,
  StrapiListResponse,
} from "@/lib/types/strapi";

export interface SearchResults {
  projects: Project[];
  services: Service[];
  news: News[];
  expertises: Expertise[];
}

async function searchStrapi<T>(
  endpoint: string,
  query: string,
  populateParams: Record<string, string>,
): Promise<T[]> {
  const url = new URL(`/api${endpoint}`, getStrapiUrl());
  url.searchParams.set("filters[title][$containsi]", query);
  url.searchParams.set("pagination[pageSize]", "5");
  Object.entries(populateParams).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return [];
  const json = (await res.json()) as StrapiListResponse<T>;
  return json.data;
}

export async function searchContent(query: string): Promise<SearchResults> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { projects: [], services: [], news: [], expertises: [] };
  }

  const [projects, services, news, expertises] = await Promise.all([
    searchStrapi<Project>("/projects", trimmed, { "populate[image]": "true" }),
    searchStrapi<Service>("/services", trimmed, { "populate[image]": "true" }),
    searchStrapi<News>("/newses", trimmed, { "populate[image]": "true" }),
    searchStrapi<Expertise>("/expertises", trimmed, {
      "populate[image]": "true",
    }),
  ]);

  return { projects, services, news, expertises };
}
