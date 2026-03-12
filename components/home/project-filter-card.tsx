import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Project } from "@/lib/types/strapi";

interface ProjectFilterCardProps {
  project: Project;
}

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

export function ProjectFilterCard({
  project,
}: ProjectFilterCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(project.image[0] ?? null);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block px-2"
    >
      <div className="relative w-[90%]  aspect-[10/10.5] overflow-hidden rounded-lg">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={project.image[0]?.alternativeText ?? project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-4 px-1">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          {truncateWords(project.description, 6)}
        </p>
      </div>
    </Link>
  );
}
