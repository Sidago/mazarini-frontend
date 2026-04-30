import Link from "next/link";
import Image from "next/image";
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
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="relative w-full aspect-33/40 overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={project.image[0]?.alternativeText ?? project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/10 to-black/50" />
        <div className="absolute top-5 left-5">
          <span className="text-[11px] font-bold text-white uppercase tracking-widest">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-6 left-5 right-5">
          <h3 className="text-2xl font-bold text-white leading-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
