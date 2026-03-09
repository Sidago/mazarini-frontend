import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceDetailSection } from "@/components/services/service-detail-section";
import { ContactForm } from "@/components/contact/contact-form";
import { getService, getServicesPage } from "@/lib/api/services";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import type { Service } from "@/lib/types/strapi";

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

      {/* Contact form section */}
      <section className="py-20 md:py-32 bg-background-light dark:bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-4 text-center">
              Get in Touch
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center mb-12">
              Interested in our {service.title.toLowerCase()} services? Reach
              out and let&apos;s discuss your project.
            </p>
          </FadeIn>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
