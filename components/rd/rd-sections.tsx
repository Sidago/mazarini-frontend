"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import type { RdPage } from "@/lib/types/strapi";
import { WhySection } from "./why-section";
import { RdQuoteSection } from "./rd-quote-section";
import { PillarsSection } from "./pillars-section";
import { ProjectsSection } from "./projects-section";
import { InnovationSection } from "./innovation-section";
import { NewsSection } from "./news-section";
import { PartnersSection } from "./partners-section";
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
  // { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

export function RdSections({ data }: RdSectionsProps): React.ReactElement {
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [atStart, setAtStart] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  // Track breakpoint — lg = 1024px
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP-powered section-switching animation
  const scrollToSectionIndex = useCallback((index: number, duration = 1.1) => {
    if (index < 0 || index >= SECTIONS.length) return;
    const el = scrollRef.current;
    if (!el) return;

    const targetId = SECTIONS[index].id;
    const targetEl = (Array.from(el.children) as HTMLElement[]).find(
      (c) => c.id === targetId
    );
    if (!targetEl) return;

    isAnimatingRef.current = true;
    activeIndexRef.current = index;
    setActiveId(targetId);
    setAtStart(targetId === "hero");

    gsap.killTweensOf(el);
    gsap.to(el, {
      scrollLeft: targetEl.offsetLeft,
      duration,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 200);
      },
    });
  }, []);

  const scrollToId = useCallback(
    (id: string, duration = 1.1) => {
      const idx = SECTIONS.findIndex((s) => s.id === id);
      if (idx !== -1) {
        scrollToSectionIndex(idx, duration);
      }
    },
    [scrollToSectionIndex]
  );

  const scrollNext = useCallback(() => {
    scrollToSectionIndex(1, 1.1);
  }, [scrollToSectionIndex]);

  // Desktop: scroll inside section first, then trigger GSAP section-switch animation once at the end
  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    let wheelDebounceTimeout: NodeJS.Timeout | null = null;
    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      // Allow horizontal trackpad scrolling naturally if user swipes horizontally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
        return;
      }

      if (e.deltaY === 0) return;

      const currentSectionId = SECTIONS[activeIndexRef.current]?.id;
      const currentSectionEl = (Array.from(el.children) as HTMLElement[]).find(
        (c) => c.id === currentSectionId
      );
      if (!currentSectionEl) return;

      const sectionStart = currentSectionEl.offsetLeft;
      const sectionEnd = Math.max(
        sectionStart,
        currentSectionEl.offsetLeft + currentSectionEl.offsetWidth - window.innerWidth
      );
      const currentScroll = el.scrollLeft;

      if (e.deltaY > 0) {
        // Scrolling forward
        if (currentScroll < sectionEnd - 20) {
          // Still cards left in current section: scroll within the section
          e.preventDefault();
          const nextScroll = Math.min(sectionEnd, currentScroll + e.deltaY * 1.5);
          gsap.to(el, {
            scrollLeft: nextScroll,
            duration: 0.3,
            ease: "power1.out",
            overwrite: "auto",
          });
        } else {
          // Reached the end of current section! Next scroll triggers GSAP section-switch animation
          e.preventDefault();
          accumulatedDelta += e.deltaY;
          if (wheelDebounceTimeout) clearTimeout(wheelDebounceTimeout);
          wheelDebounceTimeout = setTimeout(() => {
            accumulatedDelta = 0;
          }, 180);

          if (accumulatedDelta > 30 && activeIndexRef.current < SECTIONS.length - 1) {
            accumulatedDelta = 0;
            scrollToSectionIndex(activeIndexRef.current + 1, 1.1);
          }
        }
      } else if (e.deltaY < 0) {
        // Scrolling backward
        if (currentScroll > sectionStart + 20) {
          // Still cards before start of current section: scroll back within section
          e.preventDefault();
          const prevScroll = Math.max(sectionStart, currentScroll + e.deltaY * 1.5);
          gsap.to(el, {
            scrollLeft: prevScroll,
            duration: 0.3,
            ease: "power1.out",
            overwrite: "auto",
          });
        } else {
          // Reached the start of current section! Previous scroll triggers GSAP section-switch animation
          e.preventDefault();
          accumulatedDelta += e.deltaY;
          if (wheelDebounceTimeout) clearTimeout(wheelDebounceTimeout);
          wheelDebounceTimeout = setTimeout(() => {
            accumulatedDelta = 0;
          }, 180);

          if (accumulatedDelta < -30 && activeIndexRef.current > 0) {
            accumulatedDelta = 0;
            scrollToSectionIndex(activeIndexRef.current - 1, 1.1);
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (activeIndexRef.current < SECTIONS.length - 1) {
          scrollToSectionIndex(activeIndexRef.current + 1, 1.1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (activeIndexRef.current > 0) {
          scrollToSectionIndex(activeIndexRef.current - 1, 1.1);
        }
      }
    };

    // Update active section tracking during scroll
    let ticking = false;
    const updateActive = () => {
      ticking = false;
      if (isAnimatingRef.current) return;

      const offset = window.innerWidth * 0.35;
      const currentX = el.scrollLeft + offset;
      let currentIdx = 0;

      const children = Array.from(el.children) as HTMLElement[];
      children.forEach((child, idx) => {
        if (child.id && child.offsetLeft <= currentX) {
          currentIdx = idx;
        }
      });

      if (SECTIONS[currentIdx]) {
        activeIndexRef.current = currentIdx;
        setActiveId(SECTIONS[currentIdx].id);
        setAtStart(currentIdx === 0);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      if (wheelDebounceTimeout) clearTimeout(wheelDebounceTimeout);
    };
  }, [isMobile, scrollToSectionIndex]);

  // Hide the site header once past the hero (desktop only).
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");
    if (!header) return;

    if (isMobile) {
      header.style.transform = "";
      header.style.pointerEvents = "";
      return;
    }

    header.style.transition = "transform 0.35s ease";
    header.style.transform = atStart ? "" : "translateY(-100%)";
    header.style.pointerEvents = atStart ? "" : "none";

    return () => {
      header.style.transform = "";
      header.style.pointerEvents = "";
    };
  }, [atStart, isMobile]);

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
        {/* <LeadershipSection data={data} /> */}
        <ContactSection data={data} />
      </div>

      {/* ── Desktop: horizontal scroll with GSAP section-switch animations ── */}
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
              className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center text-lg font-semibold tracking-wider px-3 font-headline text-primary hover:text-primary/70 transition-colors cursor-pointer">
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
          {/* <LeadershipSection data={data} /> */}
          <ContactSection data={data} />
        </div>

        {/* Bottom section navigation bar */}
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
                onNavigate={(id) => scrollToId(id, 1.1)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
