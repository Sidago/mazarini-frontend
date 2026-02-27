import { FadeIn } from "@/components/ui/fade-in";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { ProjectGrid } from "@/components/projects/project-grid";
import { getProjects, getProjectsPage } from "@/lib/api/projects";
import type { Project, ProjectsPage as ProjectsPageType } from "@/lib/types/strapi";

export default async function ProjectsPage(): Promise<React.ReactElement> {
  let pageData: ProjectsPageType | null = null;
  let projects: Project[] = [];

  try {
    [pageData, projects] = await Promise.all([
      getProjectsPage().catch(() => null),
      getProjects(),
    ]);

    // console.log("Projects page data:", pageData);
    console.log("Projects data:", projects);
  } catch (error) {
    // Strapi may be unavailable
    console.error("Error fetching projects data:", error);
  }

  const featuredProjects = pageData?.featuredProjects ?? [];
  const ctaText = pageData?.featuredCTA ?? "LEARN MORE";
  const pageTitle = pageData?.pageTitle ?? "Our Projects";
  const pageDescription =
    pageData?.pageDescription ??
    "Explore our most recent construction projects from markets across the country.";

  return (
    <>
      {/* Hero carousel */}
      {featuredProjects.length > 0 && (
        <ProjectCarousel projects={featuredProjects} ctaText={ctaText} />
      )}

      {/* Page heading */}
      <section className="pt-16 lg:pt-24 pb-8 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
      <ProjectGrid projects={projects} />
    </>
  );
}
