"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Keep the loader on screen long enough for the dot animation to be seen,
// even when the page is already loaded (common in dev).
const MIN_DISPLAY_MS = 1600;
const MAX_WAIT_MS = 4000;

export function LogoLoader(): React.ReactElement | null {
  const [isVisible, setIsVisible] = useState(true);

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

    let done = false;
    function finish(): void {
      if (done) return;
      done = true;
      setIsVisible(false); // triggers the AnimatePresence exit animation
      unlockScroll();
      document.removeEventListener("touchmove", preventTouch);
    }

    // After the minimum display window, leave once the page is fully loaded.
    function waitForLoad(): void {
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    }

    const minTimer = setTimeout(waitForLoad, MIN_DISPLAY_MS);
    const maxTimer = setTimeout(finish, MAX_WAIT_MS); // hard cap

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", finish);
      unlockScroll();
      document.removeEventListener("touchmove", preventTouch);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="logo-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background-dark">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}>
            {/* Local public asset — use a plain img to bypass the custom Strapi
                next/image loader (which would rewrite this to a broken URL). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Logo.png"
              alt="Mazarini"
              className="h-20 w-auto object-contain"
            />
          </motion.div>

          {/* 3-dot loading indicator */}
          <motion.div
            className="mt-6 flex items-center gap-2.5"
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-2.5 h-2.5 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
