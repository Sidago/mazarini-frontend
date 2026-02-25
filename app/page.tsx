import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { StatsBar } from "@/components/home/stats-bar";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { ProjectFilterSection } from "@/components/home/project-filter-section";
import { ProjectShowcase } from "@/components/home/project-showcase";
import { OurClientsSection } from "@/components/home/our-clients-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { BelongSection } from "@/components/home/belong-section";
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
  introHeading:
    "Delivering a premium construction experience on every project we build.",
  introHighlightText: "premium construction experience",
  introDescription:
    "With decades of expertise in commercial and residential construction, Mazzarini Group delivers projects that stand the test of time. Our commitment to quality craftsmanship and client satisfaction drives every decision we make.",
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
  experienceHeading: "The Mazzarini Experience, Built on Trust",
  experienceHighlightText: "Trust",
  experienceDescription:
    "Our success is built on a foundation of reliability, relationships, ingenuity, and proven outcomes. We have a passion for elevating the business of building and ensuring an exceptional experience for every client.",
  experienceImage: null,
  experienceCtaText: "TRUST, BUILT",
  belongHeading: "You Belong Here",
  belongDescription:
    "You're talented, resourceful, and driven. We're passionate, progressive, and disciplined, and our team members are the true foundation of our business. Let's build a future together.",
  belongImage: null,
  belongCtaText: "JOIN OUR TEAM",
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
      <IntroSection
        heading={homepage.introHeading}
        highlightText={homepage.introHighlightText}
        description={homepage.introDescription}
      />
      <ProjectFilterSection projects={homepage.projects ?? []} />
      <ExpertiseSection
        heading={homepage.expertiseHeading}
        subheading={homepage.expertiseSubheading}
        expertises={homepage.expertise ?? []}
      />
      <ExperienceSection
        heading={homepage.experienceHeading}
        highlightText={homepage.experienceHighlightText}
        description={homepage.experienceDescription}
        image={homepage.experienceImage}
        ctaText={homepage.experienceCtaText}
      />
      <BelongSection
        heading={homepage.belongHeading}
        description={homepage.belongDescription}
        image={homepage.belongImage}
        ctaText={homepage.belongCtaText}
      />
      {/* <ProjectShowcase
        heading={homepage.projectsHeading}
        projects={homepage.projects ?? []}
      /> */}
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
