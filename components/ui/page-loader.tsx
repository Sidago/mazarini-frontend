"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader(): React.ReactElement | null {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoading(false);
      return;
    }

    function handleLoad(): void {
      setIsLoading(false);
    }

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background-dark"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
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
