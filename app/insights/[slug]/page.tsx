import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { Icon } from "@/components/ui/icon";
import { InsightDownloadForm } from "@/components/insights/insight-download-form";
import { getInsightBySlug } from "@/lib/api/insights";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { buildMetadata } from "@/lib/utils/seo";

interface InsightDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const insight = await getInsightBySlug(slug);
    return buildMetadata({
      seo: insight.seo,
      fallbackTitle: insight.title,
      fallbackDescription: insight.description ?? "Read the latest insights and thought leadership articles from Mazarini Inc.",
      fallbackImage: insight.image,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Insights",
      fallbackDescription: "Read the latest insights and thought leadership articles from Mazarini Inc.",
    });
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  let insight;

  try {
    insight = await getInsightBySlug(slug);
  } catch {
    notFound();
  }

  if (!insight) notFound();

  const imageUrl = getStrapiMediaUrl(insight.image ?? null);
  const fileUrl = getStrapiMediaUrl(insight.file ?? null);
  const fileName = insight.file?.url?.split("/").pop() ?? `${insight.slug}.pdf`;

  return (
    <section className="py-16 lg:py-35 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        {/* <FadeIn>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-amber-500 transition-colors mb-12"
          >
            <Icon name="arrow_back" className="text-lg" />
            Back to Insights
          </Link>
        </FadeIn> */}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start pt-10">
          {/* Left: content */}
          <FadeIn direction="up" delay={0.05}>
            <div>
              {/* Hero image */}
              {imageUrl && (
                <div className="relative w-full aspect-[16/10] overflow-hidden mb-8">
                  <Image
                    src={imageUrl}
                    alt={insight.image?.alternativeText ?? insight.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority
                  />
                </div>
              )}

              {/* Category + date */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {insight.category && (
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest border border-neutral-300 px-3 py-1 text-neutral-600">
                    {insight.category}
                    {fileUrl && (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M18 10h-1V7A5 5 0 0 0 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-7H9V7a3 3 0 0 1 6 0v3Z" />
                      </svg>
                    )}
                  </span>
                )}
                {insight.date && (
                  <span className="text-sm text-neutral-400">
                    {formatDate(insight.date)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-black font-serif text-neutral-900 dark:text-white leading-tight mb-6">
                {insight.title}
              </h1>

              {/* Description */}
              {insight.description && (
                <p className="text-base lg:text-lg text-neutral-600 dark:text-neutral-400 tracking-wide leading-relaxed">
                  {insight.description}
                </p>
              )}

              {fileUrl && (
                <p className="mt-10 text-sm font-bold text-neutral-700 dark:text-neutral-300 text-center">
                  Fill out the form to download the report.
                </p>
              )}
            </div>
          </FadeIn>

          {/* Right: download form */}
          <FadeIn direction="up" delay={0.15}>
            <div className="lg:sticky lg:top-28">
              <InsightDownloadForm fileUrl={fileUrl} fileName={fileName} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
