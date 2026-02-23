import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { ProjectShowcase } from "@/components/home/project-showcase";
import { OurClientsSection } from "@/components/home/our-clients-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { CtaSection } from "@/components/home/cta-section";
import { getHomepage } from "@/lib/api/homepage";
import type { Homepage } from "@/lib/types/strapi";

export const dynamic = "force-dynamic";

const FALLBACK_HOMEPAGE: Homepage = {
  id: 0,
  documentId: "",
  heroBadge: "Architectural Excellence",
  heroTitle: "Precision in Every Beam.",
  heroHighlightText: "Every Beam.",
  heroSubtitle:
    "We transform blueprints into landmarks. With decades of expertise in commercial and residential construction, Mazzarini Group delivers projects that stand the test of time.",
  heroImage: null,
  heroVideo: null,
  heroFeatured: null,
  heroCTAs: [],
  stats: [],
  expertiseHeading: "Our Expertise",
  expertiseSubheading:
    "Comprehensive construction solutions tailored to your vision.",
  expertise: [],
  projectsHeading: "Recent Work",
  projects: [],
  ctaTitle: "Let's Build Together.",
  ctaHighlightWord: "Together.",
  ctaSubtitle:
    "Ready to start your next project? Our team of experts is here to bring your vision to life.",
  testimonials: [],
  our_clients: [],
  ctaCTAs: [],
};

export default async function Home(): Promise<React.ReactElement> {
  let homepage: Homepage = FALLBACK_HOMEPAGE;

  try {
    homepage = await getHomepage();
    // console.log("Fetched homepage data:", homepage);
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    // Strapi unavailable or permissions not set — render with fallback data
  }

  return (
    <>
      <HeroSection
        title={homepage.heroTitle}
        highlightText={homepage.heroHighlightText}
        ctas={homepage.heroCTAs}
        heroImage={homepage.heroImage}
        heroVideo={homepage.heroVideo}
      />
      <StatsBar stats={homepage.stats} />
      <ExpertiseSection
        heading={homepage.expertiseHeading}
        subheading={homepage.expertiseSubheading}
        expertises={homepage.expertise ?? []}
      />
      <ProjectShowcase
        heading={homepage.projectsHeading}
        projects={homepage.projects ?? []}
      />
      <OurClientsSection clients={homepage.our_clients ?? []} />
      <TestimonialSection testimonials={homepage.testimonials ?? []} />
      <CtaSection
        title={homepage.ctaTitle}
        highlightWord={homepage.ctaHighlightWord}
        subtitle={homepage.ctaSubtitle}
        ctas={homepage.ctaCTAs}
      />
    </>
  );
}
