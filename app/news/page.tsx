import { FadeIn } from "@/components/ui/fade-in";
import { NewsCarousel } from "@/components/news/news-carousel";
import { NewsGrid } from "@/components/news/news-grid";
import { getNews, getNewsPage } from "@/lib/api/news";
import type { News, NewsPage as NewsPageType } from "@/lib/types/strapi";

export const metadata = {
  title: "News & Insights | Mazzarini Group",
  description:
    "Stay up to date with the latest news, insights, and updates from Mazzarini Group.",
};

export default async function NewsPage(): Promise<React.ReactElement> {
  let pageData: NewsPageType | null = null;
  let news: News[] = [];

  try {
    [pageData, news] = await Promise.all([
      getNewsPage().catch(() => null),
      getNews(),
    ]);
  } catch (error) {
    console.error("Error fetching news data:", error);
  }

  const featuredNews = pageData?.featuredNews ?? [];
  const ctaText = pageData?.featuredCTA ?? "READ MORE";
  const pageTitle = pageData?.pageTitle ?? "News & Insights";
  const pageDescription =
    pageData?.pageDescription ??
    "Stay up to date with the latest news, insights, and updates from Mazzarini Group.";

  return (
    <>
      {/* Hero carousel */}
      {featuredNews.length > 0 && (
        <NewsCarousel news={featuredNews} ctaText={ctaText} />
      )}

      {/* Page heading */}
      <section className="pt-16 lg:pt-24 pb-8 bg-background-light dark:bg-background-dark">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4">
              {pageTitle}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {pageDescription}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filterable grid */}
      <NewsGrid news={news} />
    </>
  );
}
