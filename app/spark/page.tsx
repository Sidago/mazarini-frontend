import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/fade-in";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { SparkIntroSection } from "@/components/spark/spark-intro-section";
import { SparkStatementSection } from "@/components/spark/spark-statement-section";
import { SparkFeatureBlock } from "@/components/spark/spark-feature-block";
import { SparkImageSection } from "@/components/spark/spark-image-section";
import { NewsSection } from "@/components/home/news-section";
import { ContactForm } from "@/components/contact/contact-form";
import { YouMightBeInterested } from "@/components/common/you-might-be-interested";
import { getSparkPage } from "@/lib/api/spark";
import { getNews } from "@/lib/api/news";
import { buildMetadata } from "@/lib/utils/seo";
import type { News, SparkPage } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSparkPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Igniting Progress",
      fallbackDescription:
        data.heroText ??
        "Curiosity sparks every breakthrough. Discover how we redefine what's possible in construction.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Igniting Progress",
      fallbackDescription:
        "Curiosity sparks every breakthrough. Discover how we redefine what's possible in construction.",
    });
  }
}

export default async function SparkPage(): Promise<React.ReactElement> {
  const [data, news] = await Promise.all([
    getSparkPage().catch((error) => {
      console.error("Failed to fetch spark page:", error);
      return null as SparkPage | null;
    }),
    getNews()
      .then((allNews) =>
        allNews
          .sort(
            (a, b) =>
              new Date(b.publishedDate as string).getTime() -
              new Date(a.publishedDate as string).getTime(),
          )
          .slice(0, 3),
      )
      .catch(() => [] as News[]),
  ]);

  const heroTitle = data?.heroTitle ?? "IGNITING PROGRESS";
  const heroText =
    data?.heroText ??
    "Every breakthrough starts with a spark of curiosity — a question, an idea, a bold what if.";

  return (
    <>
      <ImgOrVideoHero
        title={heroTitle}
        text={heroText}
        heroImage={data?.heroImage ?? null}
        heroVideo={data?.heroVideo ?? null}
        ctaText={data?.heroCtaText}
        ctaUrl={data?.heroCtaUrl}
      />

      <SparkIntroSection data={data} />

      <SparkStatementSection data={data} />

      <SparkFeatureBlock block={data?.blocks?.[0]} />

      <SparkFeatureBlock block={data?.blocks?.[1]} reverse />

      <SparkImageSection
        image={data?.wideImage ?? null}
        caption={data?.wideCaption ?? null}
      />

      <SparkFeatureBlock block={data?.blocks?.[2]} />

      <NewsSection
        heading={data?.newsTitle ?? "News \n & Insights"}
        news={news}
      />

      <section
        id="contact"
        className="scroll-mt-28 py-20 md:py-32 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="w-full lg:mt-10">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-6xl font-serif font-black mb-4 text-left">
                {data?.contactTitle ?? "Let's Spark Something"}
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <p className="text-lg text-neutral-600 text-left">
                {data?.contactDescription ??
                  "Have a bold idea or a what-if worth exploring? Reach out and let's build what's next."}
              </p>
            </FadeIn>
          </div>
          <div className="w-full">
            <ContactForm variant="regular" />
          </div>
        </div>
      </section>

      <YouMightBeInterested />
    </>
  );
}
