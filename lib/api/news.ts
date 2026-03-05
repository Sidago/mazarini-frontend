import { strapiGet } from "@/lib/api/client";
import type {
  News,
  NewsPage,
  StrapiListResponse,
  StrapiResponse,
} from "@/lib/types/strapi";

export async function getNews(): Promise<News[]> {
  const res = await strapiGet<StrapiListResponse<News>>("/newses", {
    "populate[image]": "true",
    "sort[0]": "publishedDate:desc",
  });
  return res.data;
}

export async function getNewsBySlug(slug: string): Promise<News> {
  const res = await strapiGet<StrapiListResponse<News>>("/newses", {
    "filters[slug][$eq]": slug,
    "populate[image]": "true",
  });
  return res.data[0];
}

export async function getNewsPage(): Promise<NewsPage> {
  const res = await strapiGet<StrapiResponse<NewsPage>>("/news-page", {
    "populate[featuredNews][populate][image]": "true",
  });
  return res.data;
}
