import React from "react";
import { RdSectionShell } from "./rd-section-shell";
import { DragScrollRow } from "./drag-scroll-row";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface ProjectsSectionProps {
  data: RdPage;
}

export function ProjectsSection({ data }: ProjectsSectionProps): React.ReactElement {
  const projects = data.featuredProjects ?? [];

  return (
    <RdSectionShell
      id="projects"
      dark={true}
      watermark={data.projectsWatermark ?? "Projects"}

      leftContent={
        <>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            {data.projectsTitle ?? "Featured Projects"}
          </h2>
          <p className="text-lg leading-relaxed text-white/60 max-w-sm">
            {data.projectsDescription}
          </p>
        </>
      }
      rightContent={
        <DragScrollRow>
          {projects.map((project) => {
            const firstImage = Array.isArray(project.image) ? project.image[0] : project.image;
            const url = getStrapiMediaUrl(firstImage ?? null);
            return (
              <div
                key={project.id}
                className="relative flex-none w-64 h-80 overflow-hidden rounded-sm group"
              >
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm leading-snug">{project.title}</p>
                  {project.location && (
                    <p className="text-white/60 text-xs mt-0.5">{project.location}</p>
                  )}
                </div>
              </div>
            );
          })}
        </DragScrollRow>
      }
    />
  );
}
