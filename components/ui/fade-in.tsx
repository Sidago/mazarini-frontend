"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  type Variant,
} from "framer-motion";

// ─── FadeIn ────────────────────────────────────────────────

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionOffsets: Record<
  NonNullable<FadeInProps["direction"]>,
  { x: number; y: number }
> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = false,
}: FadeInProps): React.ReactElement {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer + StaggerItem ────────────────────────

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

export function StaggerContainer({
  children,
  staggerDelay = 0.15,
  className,
}: StaggerContainerProps): React.ReactElement {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      custom={staggerDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

const itemVariants: Record<string, Variant> = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function StaggerItem({
  children,
  className,
}: StaggerItemProps): React.ReactElement {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ─── CountUp ───────────────────────────────────────────────

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  duration = 2,
  className,
}: CountUpProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  // Extract the numeric part and any prefix (like $)
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numericValue = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutQuart for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * numericValue);
      setDisplay(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, numericValue, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {isInView ? display : `${prefix}0${suffix}`}
    </span>
  );
}

// ─── SlideIn ───────────────────────────────────────────────

interface SlideInProps {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({
  children,
  from = "left",
  delay = 0,
  duration = 0.7,
  className,
}: SlideInProps): React.ReactElement {
  const xOffset = from === "left" ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
