import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceDetailSection } from "@/components/services/service-detail-section";
import { ServiceRelatedProjects } from "@/components/services/service-related-projects";
import { ServiceKeyTeamMembers } from "@/components/services/service-key-team-members";
import { ServiceTestimonialSection } from "@/components/services/service-testimonial-section";
import { ServiceByTheNumbers } from "@/components/services/service-by-the-numbers";
import { ContactForm } from "@/components/contact/contact-form";
import { getService, getServicesPage } from "@/lib/api/services";
import { getProjects } from "@/lib/api/projects";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { buildMetadata } from "@/lib/utils/seo";
import type { News, Project, Service, StatComponent } from "@/lib/types/strapi";
import { NewsSection } from "@/components/home/news-section";
import { getNews } from "@/lib/api/news";
import { YouMightBeInterested } from "@/components/common/you-might-be-interested";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const service = await getService(slug);
    const s = Array.isArray(service) ? service[0] : service;
    return buildMetadata({
      seo: s.seo,
      fallbackTitle: s.title,
      fallbackDescription: s.discriptions?.substring(0, 160) ?? "Learn more about Mazarini Inc.'s specialized construction and project management services.",
      fallbackImage: s.heroImage ?? s.image ?? null,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Services",
      fallbackDescription: "Learn more about Mazarini Inc.'s specialized construction and project management services.",
    });
  }
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  let service: Service | null = null;
  try {
    service = await getService(slug);
    service = Array.isArray(service) ? service[0] : service;
  } catch {
    notFound();
  }

  if (!service) notFound();

  let heroImage = service.heroImage ?? null;
  let heroVideo = null;
  let servicePageStats: StatComponent[] = [];
  try {
    const servicesPage = await getServicesPage();
    if (!heroImage) {
      heroImage = servicesPage.heroImage ?? null;
      heroVideo = servicesPage.heroVideo ?? null;
    }
    servicePageStats = servicesPage.stats ?? [];
  } catch {
    // services-page not available
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
      <ImgOrVideoHero
        title={title}
        text={text}
        heroImage={heroImage}
        heroVideo={heroVideo}
        ctaText={null}
        ctaUrl={null}
      />

      <ServiceDetailSection service={service} />

      <ServiceByTheNumbers stats={servicePageStats} />

      <ServiceRelatedProjects projects={relatedProjects} />

      <ServiceTestimonialSection testimonials={service.testimonials ?? []} />

      <ServiceKeyTeamMembers members={service.teams ?? []} />

      <NewsSection heading={newsHeading} news={news ?? []} />

      <section className="py-20 md:py-32 w-full bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="w-full">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-6xl font-serif font-black text-neutral-900 dark:text-white mb-4 text-left">
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

      <YouMightBeInterested />
    </>
  );
}
