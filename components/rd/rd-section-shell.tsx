"use client";

import React, { useEffect, useState } from "react";
import { ParallaxText } from "../ui/scroll-animations";

interface RdSectionShellProps {
  id: string;
  dark?: boolean;
  watermark?: string | null;
  /** CSS color for the parallax watermark text, e.g. "rgba(0,0,0,0.06)" */
  watermarkColor?: string;
  /** Scroll axis for the watermark marquee on desktop. Defaults to "vertical". */
  watermarkDirection?: "horizontal" | "vertical";
  /** Horizontal position of the vertical strip — "start" | "middle" | "end". */
  watermarkPosition?: "start" | "middle" | "end";
  /** Flip the vertical text 180° so it reads bottom-to-top. */
  watermarkFlip?: boolean;
  /** Extra classes applied to the content wrapper (overrides default centering/padding). */
  contentClassName?: string;
  /** Overrides the inner grid classes (columns + gap). */
  gridClassName?: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export function RdSectionShell({
  id,
  dark = false,
  watermark,
  watermarkColor,
  watermarkDirection = "vertical",
  watermarkPosition = "start",
  watermarkFlip = true,
  contentClassName,
  gridClassName,
  leftContent,
  rightContent,
}: RdSectionShellProps): React.ReactElement {
  const defaultWatermarkColor = dark
    ? "rgba(255,255,255,0.06)"
    : "rgba(0,0,0,0.06)";

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id={id}
      className={`relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 ${
        dark
          ? "bg-neutral-900 text-white"
          : "bg-background-light text-neutral-900"
      }`}>
      {/* Parallax watermark — absolutely positioned behind content */}
      {watermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color={watermarkColor ?? defaultWatermarkColor}
            direction={isMobile ? "horizontal" : watermarkDirection}
            position={watermarkPosition}
            flip={watermarkFlip}>
            {watermark}
          </ParallaxText>
        </div>
      )}

      <div className={`relative z-10 w-full ${contentClassName ?? "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
        <div className={`grid grid-cols-1 items-center ${gridClassName ?? "lg:grid-cols-[2fr_3fr] gap-16"}`}>
          <div className="flex flex-col justify-center">{leftContent}</div>
          <div>{rightContent}</div>
        </div>
      </div>
    </section>
  );
}
