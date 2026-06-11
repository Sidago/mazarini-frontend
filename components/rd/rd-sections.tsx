"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RdPage } from "@/lib/types/strapi";
import { WhySection } from "./why-section";
import { PillarsSection } from "./pillars-section";
import { ProjectsSection } from "./projects-section";
import { InnovationSection } from "./innovation-section";
import { NewsSection } from "./news-section";
import { PartnersSection } from "./partners-section";
import { LeadershipSection } from "./leadership-section";
import { ContactSection } from "./contact-section";
import { RdProgressBar } from "./rd-progress-bar";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";

interface RdSectionsProps {
  data: RdPage;
}

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "why", label: "Why" },
  { id: "pillars", label: "Pillars" },
  { id: "projects", label: "Projects" },
  { id: "innovation", label: "Innovation" },
  { id: "news", label: "News" },
  { id: "partners", label: "Partners" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

export function RdSections({ data }: RdSectionsProps): React.ReactElement {
  const count = SECTIONS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const canNavigateRef = useRef(true);
  const activeIndexRef = useRef(0);

  // Track breakpoint — lg = 1024px
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (!canNavigateRef.current) return;
      const next = activeIndexRef.current + direction;
      if (next < 0 || next >= count) return;
      canNavigateRef.current = false;
      activeIndexRef.current = next;
      setActiveIndex(next);
      setTimeout(() => {
        canNavigateRef.current = true;
      }, 700);
    },
    [count],
  );

  const goToIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(count - 1, idx));
      activeIndexRef.current = clamped;
      canNavigateRef.current = true;
      setActiveIndex(clamped);
    },
    [count],
  );

  // Header hide/show — desktop only
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");
    if (!header) return;

    if (isMobile) {
      header.style.transform = "";
      header.style.pointerEvents = "";
      return;
    }

    header.style.transition = "transform 0.3s ease";
    header.style.transform =
      activeIndex > 0 ? "translateY(-100%)" : "";
    header.style.pointerEvents = activeIndex > 0 ? "none" : "";

    return () => {
      header.style.transform = "";
      header.style.pointerEvents = "";
    };
  }, [activeIndex, isMobile]);

  // Wheel / keyboard / touch — desktop only
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
    };

    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
        navigate(dx > 0 ? 1 : -1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate, isMobile]);

  const handleNavigate = useCallback(
    (id: string) => {
      const idx = SECTIONS.findIndex((s) => s.id === id);
      if (idx !== -1) goToIndex(idx);
    },
    [goToIndex],
  );

  const hero = (
    <ImgOrVideoHero
      title={data.heroTitle}
      text={data.heroText ?? ""}
      heroVideo={data.heroVideo}
      heroImage={data.heroImage}
      ctaText={data.heroCtaText}
      ctaUrl={data.heroCtaUrl}
    />
  );

  return (
    <>
      {/* ── Mobile: normal vertical scroll ── */}
      <div className="lg:hidden flex flex-col gap-4">
        {hero}
        <WhySection data={data} />
        <PillarsSection data={data} />
        <ProjectsSection data={data} />
        <InnovationSection data={data} />
        <NewsSection data={data} />
        <PartnersSection data={data} />
        <LeadershipSection data={data} />
        <ContactSection data={data} />
      </div>

      {/* ── Desktop: horizontal carousel ── */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {activeIndex > 0 && (
            <motion.button
              key="back-btn"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              onClick={() => goToIndex(0)}
              className="fixed top-5 left-10 z-40 flex items-center gap-2 py-4 px-5 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors border-2">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M19 12H5M5 12l7 7M5 12l7-7" />
              </svg>
              Back
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeIndex === 0 && (
            <motion.button
              key="next-btn"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate(1)}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center text-xl px-3 font-headline text-primary hover:text-primary/70 transition-colors">
              scroll 
              <svg
                width="35"
                height="23" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="h-screen overflow-hidden">
          <motion.div
            animate={{ x: `-${activeIndex * 100}vw` }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="flex h-full">
            <div className="w-screen h-full flex-none">{hero}</div>
            <WhySection data={data} />
            <PillarsSection data={data} />
            <ProjectsSection data={data} />
            <InnovationSection data={data} />
            <NewsSection data={data} />
            <PartnersSection data={data} />
            <LeadershipSection data={data} />
            <ContactSection data={data} />
          </motion.div>
        </div>

        <AnimatePresence>
          {activeIndex > 0 && (
            <motion.div
              key="progress-bar"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}>
              <RdProgressBar
                sections={SECTIONS}
                activeId={SECTIONS[activeIndex]?.id ?? "hero"}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
