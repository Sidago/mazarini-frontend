import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { getProject, getProjectTeams } from "@/lib/api/projects";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { buildMetadata } from "@/lib/utils/seo";
import { ProjectDetailsSection } from "@/components/projects/project-details-section";
import { ProjectOverviewSection } from "@/components/projects/project-overview-section";
import { ProjectKeyTeamSection } from "@/components/projects/project-key-team-section";
import type { Project } from "@/lib/types/strapi";
import { YouMightBeInterested } from "@/components/common/you-might-be-interested";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const raw = await getProject(id);
    const project = Array.isArray(raw) ? raw[0] : raw;
    return buildMetadata({
      seo: project.seo,
      fallbackTitle: project.title,
      fallbackDescription: project.description ?? "Explore Mazarini Inc.'s portfolio of landmark construction and real estate projects delivered with precision.",
      fallbackImage: project.image?.[0] ?? null,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Projects",
      fallbackDescription: "Explore Mazarini Inc.'s portfolio of landmark construction and real estate projects delivered with precision.",
    });
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  let project: Project | null = null;
  try {
    project = await getProject(id);
    project = Array.isArray(project) ? project[0] : project;
  } catch {
    notFound();
  }

  if (!project) notFound();

  const teams = await getProjectTeams(id);
  const heroImage = getStrapiMediaUrl(project?.image[0] ?? null);

  return (
    <>
      {/* Hero */}
      {/* <section className="relative w-full h-[60vh] min-h-100 overflow-hidden bg-neutral-900">
        {heroImage && (
          <Image
            src={heroImage}
            alt={project.image[0]?.alternativeText ?? project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 border border-white/30 rounded text-xs font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
                  {project.category}
                </span>
                {project.location && (
                  <span className="px-3 py-1 border border-white/30 rounded text-xs font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
                    {project.location}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </FadeIn>
          </div>
        </div>
      </section> */}

      <ImgOrVideoHero
        title={project.title}
        text={project.location ? `${project.location}` : ""}
        heroImage={project.image[0]}
        heroVideo={null}
      />

      {/* Project metadata + image carousel */}
      <ProjectDetailsSection
        location={project.location}
        client={project.client}
        contractValue={project.contractValue}
        squareFeet={project.squareFeet}
        yearCompleted={project.yearCompleted}
        schedule={project.schedule}
        keyPartners={project.keyPartners}
        projectTypes={project.projectTypes}
        type={project.type}
        images={project.image}
        title={project.title}
      />

      {/* Overview */}
      <ProjectOverviewSection
        detail_discriptions={project.detail_discriptions}
      />

      {/* Key Team Members */}
      <ProjectKeyTeamSection members={teams} />

      <YouMightBeInterested />
    </>
  );
}
