"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RdPage } from "@/lib/types/strapi";
import { WhySection } from "./why-section";
import { RdQuoteSection } from "./rd-quote-section";
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
  { id: "quote", label: "Quote" },
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [atStart, setAtStart] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track breakpoint — lg = 1024px
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: wheel → continuous horizontal scroll + track active section.
  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const offset = window.innerWidth * 0.4;
      const x = el.scrollLeft + offset;
      let current = "hero";
      for (const child of Array.from(el.children) as HTMLElement[]) {
        if (child.id && child.offsetLeft <= x) current = child.id;
      }
      setActiveId(current);
      setAtStart(el.scrollLeft < offset);
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  // Hide the site header once past the hero (desktop only).
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");
    if (!header) return;

    if (isMobile) {
      header.style.transform = "";
      header.style.pointerEvents = "";
      return;
    }

    header.style.transition = "transform 0.3s ease";
    header.style.transform = atStart ? "" : "translateY(-100%)";
    header.style.pointerEvents = atStart ? "" : "none";

    return () => {
      header.style.transform = "";
      header.style.pointerEvents = "";
    };
  }, [atStart, isMobile]);

  const scrollToId = useCallback((id: string) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = (Array.from(el.children) as HTMLElement[]).find(
      (c) => c.id === id,
    );
    el.scrollTo({ left: target?.offsetLeft ?? 0, behavior: "smooth" });
  }, []);

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const next = (el.children[1] as HTMLElement) ?? null;
    el.scrollTo({ left: next?.offsetLeft ?? window.innerWidth, behavior: "smooth" });
  }, []);

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
        <RdQuoteSection data={data} />
        <PillarsSection data={data} />
        <ProjectsSection data={data} />
        <InnovationSection data={data} />
        <NewsSection data={data} />
        <PartnersSection data={data} />
        <LeadershipSection data={data} />
        <ContactSection data={data} />
      </div>

      {/* ── Desktop: one continuous horizontal scroll ── */}
      <div className="hidden lg:block">
        {/* Back button — appears once past the hero */}
        <AnimatePresence>
          {!atStart && (
            <motion.button
              key="back-btn"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              onClick={() => scrollToId("hero")}
              className="fixed top-5 left-10 z-50 flex items-center gap-2 py-4 px-5 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors border-2">
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

        {/* Scroll hint — on the hero, right center */}
        <AnimatePresence>
          {atStart && (
            <motion.button
              key="scroll-btn"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
              onClick={scrollNext}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center text-lg font-semibold tracking-wider px-3 font-headline text-primary hover:text-primary/70 transition-colors">
              scroll
              <svg
                width="30"
                height="22"
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

        <div
          ref={scrollRef}
          className="relative h-screen overflow-x-auto overflow-y-hidden scrollbar-hide flex">
          <div id="hero" className="w-screen h-full flex-none">
            {hero}
          </div>
          <RdQuoteSection data={data} />
          <WhySection data={data} />
          <PillarsSection data={data} />
          <ProjectsSection data={data} />
          <InnovationSection data={data} />
          <NewsSection data={data} />
          <PartnersSection data={data} />
          <LeadershipSection data={data} />
          <ContactSection data={data} />
        </div>

        {/* Bottom section navigation */}
        <AnimatePresence>
          {!atStart && (
            <motion.div
              key="progress-bar"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}>
              <RdProgressBar
                sections={SECTIONS}
                activeId={activeId}
                onNavigate={scrollToId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
