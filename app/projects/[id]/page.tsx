import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { Icon } from "@/components/ui/icon";
import { getProject } from "@/lib/api/projects";
import { getStrapiMediaUrl } from "@/lib/api/client";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  let project;
  try {
    project = await getProject(id);
  } catch {
    notFound();
  }

  if (!project) notFound();

  const heroImage = getStrapiMediaUrl(project.image[0] ?? null);

  return (
    <>
      {/* Hero image */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-neutral-900">
        {heroImage && (
          <img
            src={heroImage}
            alt={project.image[0]?.alternativeText ?? project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
                {project.type && (
                  <span className="px-3 py-1 border border-white/30 rounded text-xs font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
                    {project.type}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-amber-500 transition-colors mb-12"
            >
              <Icon name="arrow_back" className="text-lg" />
              Back to Projects
            </Link>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.1}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-12">
              {project.description}
            </p>
          </FadeIn>

          {/* Additional images */}
          {project.image.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {project.image.slice(1).map((img) => (
                <FadeIn key={img.id}>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src={getStrapiMediaUrl(img)}
                      alt={img.alternativeText ?? project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
