"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import type { RdPage } from "@/lib/types/strapi";
import { WhySection } from "./why-section";
import { PillarsSection } from "./pillars-section";
import { ProjectsSection } from "./projects-section";
import { NewsSection } from "./news-section";
import { PartnersSection } from "./partners-section";
import { LeadershipSection } from "./leadership-section";
import { ContactSection } from "./contact-section";
import { RdProgressBar } from "./rd-progress-bar";

interface RdSectionsProps {
  data: RdPage;
}

const SECTIONS = [
  { id: "why", label: "Why" },
  { id: "pillars", label: "Pillars" },
  { id: "projects", label: "Projects" },
  { id: "news", label: "News" },
  { id: "partners", label: "Partners" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

export function RdSections({ data }: RdSectionsProps): React.ReactElement {
  const count = SECTIONS.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll 0-1 to horizontal translate 0 → -(count-1)*100vw
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `${-(count - 1) * 100}vw`],
  );

  // Track active section index from scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.round(latest * (count - 1));
    setActiveIndex(Math.max(0, Math.min(count - 1, idx)));
  });

  // Clicking progress bar dot scrolls to correct vertical position
  const handleNavigate = useCallback(
    (id: string) => {
      const container = containerRef.current;
      if (!container) return;
      const idx = SECTIONS.findIndex((s) => s.id === id);
      if (idx === -1) return;
      const containerTop = container.offsetTop;
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const targetProgress = count > 1 ? idx / (count - 1) : 0;
      window.scrollTo({
        top: containerTop + targetProgress * scrollableHeight,
        behavior: "smooth",
      });
    },
    [count],
  );

  return (
    <>
      {/* Tall container drives the scroll */}
      <div
        ref={containerRef}
        style={{ height: `${count * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Horizontal track */}
          <motion.div
            style={{ translateX }}
            className="flex h-full"
            // total width = count * 100vw
            // Each child must be w-screen flex-none
          >
            <WhySection data={data} />
            <PillarsSection data={data} />
            <ProjectsSection data={data} />
            <NewsSection data={data} />
            <PartnersSection data={data} />
            <LeadershipSection data={data} />
            <ContactSection data={data} />
          </motion.div>
        </div>
      </div>

      <RdProgressBar
        sections={SECTIONS}
        activeId={SECTIONS[activeIndex]?.id ?? "why"}
        onNavigate={handleNavigate}
      />
    </>
  );
}
