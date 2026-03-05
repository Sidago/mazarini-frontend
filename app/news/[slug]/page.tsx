import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { Icon } from "@/components/ui/icon";
import { getNewsBySlug } from "@/lib/api/news";
import { getStrapiMediaUrl } from "@/lib/api/client";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  let article;

  try {
    article = await getNewsBySlug(slug);
  } catch {
    notFound();
  }

  if (!article) notFound();

  const heroImage = getStrapiMediaUrl(article.image ?? null);

  return (
    <>
      {/* Hero image */}
      <section className="relative w-full h-[60vh] min-h-100 overflow-hidden bg-neutral-900">
        {heroImage && (
          <img
            src={heroImage}
            alt={article.image?.alternativeText ?? article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {article.category && (
                  <span className="px-3 py-1 border border-white/30 rounded text-xs font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
                    {article.category}
                  </span>
                )}
                {article.publishedDate && (
                  <span className="text-sm text-white/70">
                    {formatDate(article.publishedDate)}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {article.title}
              </h1>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-amber-500 transition-colors mb-12"
            >
              <Icon name="arrow_back" className="text-lg" />
              Back to News
            </Link>
          </FadeIn>

          {/* Description */}
          {article.description && (
            <FadeIn delay={0.1}>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-12">
                {article.description}
              </p>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
