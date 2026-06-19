import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { RdPage } from "@/lib/types/strapi";
import { ParallaxText } from "../ui/scroll-animations";
import { ContactForm } from "../contact/contact-form";

interface ContactSectionProps {
  data: RdPage;
}

export function ContactSection({
  data,
}: ContactSectionProps): React.ReactElement {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="contact"
      className="relative w-screen min-h-screen lg:h-screen flex-none bg-background-light text-neutral-900 overflow-hidden flex items-center py-20 lg:py-0">
      {/* Watermark */}
      <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
        <ParallaxText
          baseVelocity={0.2}
          color="rgba(0,0,0,0.06)"
          direction={isMobile ? "horizontal" : "vertical"}
          position="start"
          paddingStart="15vw"
          flip={true}>
          Contact
        </ParallaxText>
      </div>

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="lg:ps-[15vw]">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
              {data.contactTitle ?? "Let's Work\nTogether"}
            </h2>
            <p className="leading-relaxed text-neutral-600 max-w-sm mb-10">
              {data.contactDescription}
            </p>
            {data.contactCtaUrl && (
              <Link
                href={data.contactCtaUrl}
                className="inline-block border-2 border-neutral-900 px-10 py-4 text-sm font-bold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white">
                {data.contactCtaText ?? "Contact Us"}
              </Link>
            )}
          </div>

          {/* Right — form constrained to 70vh and centered */}
          <div className="flex justify-start">
            <div className="w-full max-w-md md:max-h-[80vh] overflow-hidden">
              <ContactForm variant="short" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
