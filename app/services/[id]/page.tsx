import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceDetailSection } from "@/components/services/service-detail-section";
import { ServiceRelatedProjects } from "@/components/services/service-related-projects";
import { ContactForm } from "@/components/contact/contact-form";
import { getService, getServicesPage } from "@/lib/api/services";
import { getProjects } from "@/lib/api/projects";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import type { News, Project, Service } from "@/lib/types/strapi";
import { NewsSection } from "@/components/home/news-section";
import { getNews } from "@/lib/api/news";

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  let service: Service | null = null;
  try {
    service = await getService(id);
    service = Array.isArray(service) ? service[0] : service;
  } catch {
    notFound();
  }

  if (!service) notFound();

  // Use service-specific heroImage if set, otherwise fall back to common hero from services-page
  let heroImage = service.heroImage ?? null;
  let heroVideo = null;

  if (!heroImage) {
    try {
      const servicesPage = await getServicesPage();
      heroImage = servicesPage.heroImage ?? null;
      heroVideo = servicesPage.heroVideo ?? null;
    } catch {
      // services-page not available — hero will render without media
    }
  }

  let relatedProjects: Project[] = [];
  try {
    const allProjects = await getProjects();
    relatedProjects = [...allProjects]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
  } catch {
    // projects unavailable — section will be hidden
  }

  let news: News[] = [];
  const newsHeading = "News\n& Insights";
  try {
    const allNews = await getNews();
    news = allNews
      .sort(
        (a, b) =>
          new Date(b.publishedDate as string).getTime() -
          new Date(a.publishedDate as string).getTime(),
      )
      .slice(0, 3);
  } catch {
    // Strapi unavailable or permissions not set — news section will be hidden
  }

  const title = service.title ?? "Service Detail";
  const text = service.discriptions
    ? service.discriptions.substring(0, 160)
    : "Learn more about our services and how we can help your business thrive.";

  return (
    <>
      {/* Hero: per-service heroImage if available, otherwise common hero from services-page */}
      <ImgOrVideoHero
        title={title}
        text={text}
        heroImage={heroImage}
        heroVideo={heroVideo}
      />

      {/* Detail content section — image + text */}
      <ServiceDetailSection service={service} />

      {/* Related projects */}
      <ServiceRelatedProjects projects={relatedProjects} />

      {/* News & Insights section */}
      <NewsSection heading={newsHeading} news={news ?? []} />

      {/* Contact form section */}
      <section className="py-20 md:py-32 w-full bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="w-full">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-6xl font-black text-neutral-900 dark:text-white mb-4 text-left">
                Get in Touch
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 text-left">
                Interested in our {service.title.toLowerCase()} services? Reach
                out and let&apos;s discuss your project.
              </p>
            </FadeIn>
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
