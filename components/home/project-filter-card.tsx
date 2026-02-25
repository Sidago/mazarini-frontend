import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Project } from "@/lib/types/strapi";

interface ProjectFilterCardProps {
  project: Project;
}

export function ProjectFilterCard({
  project,
}: ProjectFilterCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(project.image[0] ?? null);

  return (
    <Link
      href={`/projects/${project.documentId}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <div className="relative w-full aspect-[4/3]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={project.image[0]?.alternativeText ?? project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-colors duration-500 group-hover:from-black/90" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <span className="inline-block w-fit px-3 py-1 mb-3 border border-white/30 rounded text-[11px] font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
            {project.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
