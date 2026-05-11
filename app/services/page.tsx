export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceGrid } from "@/components/services/service-grid";
import { getServices, getServicesPage } from "@/lib/api/services";
import { buildMetadata } from "@/lib/utils/seo";
import type {
  Service,
  ServicesPage as ServicesPageType,
} from "@/lib/types/strapi";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { ServiceCarousel } from "@/components/services/service-carousel";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getServicesPage();
    return buildMetadata({
      seo: pageData.seo,
      fallbackTitle: pageData.pageTitle ?? "Our Services",
      fallbackDescription: pageData.pageDescription ?? pageData.heroText ?? "Mazarini Inc. offers a comprehensive range of construction and project management services tailored to every need.",
      fallbackImage: pageData.heroImage,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Our Services",
      fallbackDescription: "Mazarini Inc. offers a comprehensive range of construction and project management services tailored to every need.",
    });
  }
}

export default async function ServicesPage(): Promise<React.ReactElement> {
  let pageData: ServicesPageType | null = null;
  let services: Service[] = [];

  try {
    [pageData, services] = await Promise.all([
      getServicesPage().catch(() => null),
      getServices(),
    ]);
  } catch (error) {
    console.error("Error fetching services data:", error);
  }

  const featuredServices = pageData?.featuredServices ?? [];
  const ctaText = pageData?.featuredCTA ?? "LEARN MORE";
  const pageTitle = pageData?.pageTitle ?? "Our Services";

  const pageDescription =
    pageData?.pageDescription ??
    "Explore the services we provide and how we deliver excellence across industries.";
  const heroTitle = pageData?.heroTitle ?? "Services";
  const heroText =
    pageData?.heroText ?? "Delivering excellence across every discipline.";

  return (
    <>
      {/* Hero carousel */}
      {featuredServices.length > 0 && (
        <ServiceCarousel services={featuredServices} ctaText={ctaText} />
      )}

      {/* Page heading - left aligned with grid */}
      <section className="pt-16 lg:pt-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
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

      <ServiceGrid services={services} />
    </>
  );
}
