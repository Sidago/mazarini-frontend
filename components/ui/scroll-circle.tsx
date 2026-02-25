"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface ScrollCircleProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ScrollCircle({
  size = 550,
  strokeWidth = 3,
  className,
}: ScrollCircleProps): React.ReactElement {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Scroll-driven rotation
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const rotation = useMotionValue(0);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    const baseSpeed = 20;
    let moveBy = directionFactor.current * baseSpeed * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    rotation.set(rotation.get() + moveBy);
  });

  const arcWidth = strokeWidth * 3;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}>
      {/* Visible full circle track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Rotating arc segments */}
      <motion.g style={{ rotate: rotation, originX: "50%", originY: "50%" }}>
        {/* Arc segment 1 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgb(243,140,41)"
          strokeWidth={arcWidth}
          strokeDasharray={`${circumference * 0.07} ${circumference * 0.93}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          fill="none"
        />
        {/* Arc segment 2 — offset by 180deg */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgb(243,140,41)"
          strokeWidth={arcWidth}
          strokeDasharray={`${circumference * 0.07} ${circumference * 0.93}`}
          strokeDashoffset={-circumference * 0.5}
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </svg>
  );
}
