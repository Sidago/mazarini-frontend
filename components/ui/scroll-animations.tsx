"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type Variant,
  useMotionValueEvent,
  useMotionValue,
  useAnimationFrame,
  wrap,
  useVelocity,
} from "framer-motion";

// ─── ScaleReveal ──────────────────────────────────────────

interface ScaleRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScaleReveal({
  children,
  delay = 0,
  duration = 0.6,
  className,
  once = false,
}: ScaleRevealProps): React.ReactElement {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─── BlurFadeIn ───────────────────────────────────────────

interface BlurFadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "none";
  delay?: number;
  duration?: number;
  blurAmount?: number;
  className?: string;
  once?: boolean;
}

const blurDirectionOffsets: Record<
  NonNullable<BlurFadeInProps["direction"]>,
  number
> = {
  up: 30,
  down: -30,
  none: 0,
};

export function BlurFadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  blurAmount = 8,
  className,
  once = false,
}: BlurFadeInProps): React.ReactElement {
  const prefersReduced = useReducedMotion();
  const yOffset = blurDirectionOffsets[direction];

  return (
    <motion.div
      initial={
        prefersReduced
          ? false
          : { opacity: 0, y: yOffset, filter: `blur(${blurAmount}px)` }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─── TextReveal ───────────────────────────────────────────

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
};

const textContainerVariants = {
  hidden: {},
  visible: (custom: { staggerDelay: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delay,
    },
  }),
};

const wordVariants: Record<string, Variant> = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function TextReveal({
  text,
  as = "h2",
  staggerDelay = 0.05,
  duration: _duration,
  delay = 0,
  className,
  once = false,
}: TextRevealProps): React.ReactElement {
  const prefersReduced = useReducedMotion();
  const MotionTag = motionTags[as];
  const words = text.split(/\s+/);

  if (prefersReduced) {
    return <MotionTag className={className}>{text}</MotionTag>;
  }

  return (
    <MotionTag
      variants={textContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      custom={{ staggerDelay, delay }}
      className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
          }}>
          <motion.span
            variants={wordVariants}
            style={{ display: "inline-block" }}>
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </MotionTag>
  );
}

// ─── ParallaxSection ──────────────────────────────────────

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  offset = 50,
  className,
}: ParallaxSectionProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={prefersReduced ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── Infinite scroll ─────────────────────

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

export function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  const defaultTextClass =
    "inline-block text-[18vw] md:text-[14vw] font-black italic text-white/10 leading-none mx-4";

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={className ?? defaultTextClass}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
