import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Project } from "@/lib/types/strapi";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(project.image[0] ?? null);

  return (
    <div className="group relative cursor-pointer rounded-lg overflow-hidden">
      <div className="relative w-full h-[500px]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={project.image[0]?.alternativeText ?? project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 md:p-12 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-3 py-1 mb-4 border border-white/30 rounded text-xs font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-md">
            {project.category}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-neutral-300 font-light max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
