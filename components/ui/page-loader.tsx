"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXIT_ANIMATION_MS = 900;
const MAX_WAIT_MS = 3000;

export function PageLoader(): React.ReactElement | null {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function lockScroll(): void {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function unlockScroll(): void {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    function preventTouch(e: TouchEvent): void {
      e.preventDefault();
    }

    lockScroll();
    document.addEventListener("touchmove", preventTouch, { passive: false });

    function triggerExit(): void {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        unlockScroll();
        document.removeEventListener("touchmove", preventTouch);
      }, EXIT_ANIMATION_MS);
    }

    // Hard cap: exit after MAX_WAIT_MS even if load hasn't fired yet
    const maxTimer = setTimeout(triggerExit, MAX_WAIT_MS);

    if (document.readyState === "complete") {
      clearTimeout(maxTimer);
      const t = setTimeout(triggerExit, 300);
      return () => {
        clearTimeout(t);
        unlockScroll();
        document.removeEventListener("touchmove", preventTouch);
      };
    }

    window.addEventListener("load", () => {
      clearTimeout(maxTimer);
      triggerExit();
    });
    return () => {
      clearTimeout(maxTimer);
      window.removeEventListener("load", triggerExit);
      unlockScroll();
      document.removeEventListener("touchmove", preventTouch);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-background-dark"
        >
          <motion.span
            initial={{ opacity: 1, letterSpacing: "0.05em", scaleY: 1 }}
            animate={
              isAnimating
                ? { opacity: 1, letterSpacing: "0.7em", scaleY: 1.4 }
                : { opacity: 1, letterSpacing: "0.05em", scaleY: 1 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold tracking-widest text-primary sm:text-5xl"
          >
            MAZARINI
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
