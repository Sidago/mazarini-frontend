"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface ProjectsSectionProps {
  data: RdPage;
}

export function ProjectsSection({
  data,
}: ProjectsSectionProps): React.ReactElement {
  const projects = data.featuredProjects ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="projects"
      className="relative flex-none w-screen lg:w-auto lg:min-w-screen lg:h-screen overflow-hidden flex flex-col lg:flex-row lg:items-center py-20 lg:py-0 bg-neutral-900 text-white">

      {data.projectsWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            flip={true}>
            {data.projectsWatermark}
          </ParallaxText>
        </div>
      )}

      {/* Heading panel */}
      <div className="relative z-10 flex-none w-full lg:w-[34vw] flex flex-col justify-center px-6 lg:pl-[12vw] lg:pr-10 py-12 lg:py-0">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
          {data.projectsTitle ?? "Featured Projects"}
        </h2>
        <p className="text-base leading-relaxed text-white/60 max-w-sm">
          {data.projectsDescription}
        </p>
      </div>

      {/* Cards row */}
      <div className="relative z-10 flex flex-col items-center lg:flex-row lg:items-stretch gap-6 px-6 lg:px-0 lg:pr-[6vw]">
        {projects.map((project) => {
          const firstImage = Array.isArray(project.image)
            ? project.image[0]
            : project.image;
          const url = getStrapiMediaUrl(firstImage ?? null);
          return (
            <div
              key={project.id}
              className="group relative flex-none w-[80vw] sm:w-[26rem] lg:w-[24vw] h-96 lg:h-130 overflow-hidden">
              {url ? (
                <Image
                  src={url}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 288px, 380px"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full bg-neutral-700" />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

              {project.location && (
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-white text-sm leading-relaxed">
                    {project.location}
                  </p>
                </div>
              )}

              <span className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold uppercase tracking-widest transition-opacity duration-300 group-hover:opacity-0">
                {project.title}
              </span>
            </div>
          );
        })}
      </div>

    </section>
  );
}
