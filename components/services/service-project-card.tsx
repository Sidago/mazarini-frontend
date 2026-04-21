import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Project } from "@/lib/types/strapi";

interface ServiceProjectCardProps {
  project: Project;
}

export function ServiceProjectCard({
  project,
}: ServiceProjectCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(project.image[0] ?? null);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative h-115 rounded-none overflow-hidden cursor-pointer block">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={project.image[0]?.alternativeText ?? project.title}
          className="absolute inset-0 w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {project.category && (
          <span className="inline-block w-fit px-3 py-1 mb-3 border border-white/30 rounded-none text-[11px] font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
            {project.category}
          </span>
        )}
        <h3 className="text-2xl font-bold text-white leading-tight">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
