import React from "react";
import Link from "next/link";
import type { RdPage } from "@/lib/types/strapi";

interface ContactSectionProps {
  data: RdPage;
}

export function ContactSection({ data }: ContactSectionProps): React.ReactElement {
  return (
    <section
      id="contact"
      className="relative w-screen h-screen flex-none bg-background-light text-neutral-900 overflow-hidden flex items-center"
    >
      {/* Watermark */}
      <span
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold leading-none"
        style={{
          fontSize: "clamp(120px, 20vw, 260px)",
          color: "rgba(0,0,0,0.04)",
          whiteSpace: "nowrap",
        }}
      >
        Contact
      </span>

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              {data.contactTitle ?? "Let's Work Together"}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600 max-w-sm mb-10">
              {data.contactDescription}
            </p>
            {data.contactCtaUrl && (
              <Link
                href={data.contactCtaUrl}
                className="inline-block border-2 border-neutral-900 px-10 py-4 text-sm font-bold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                {data.contactCtaText ?? "Contact Us"}
              </Link>
            )}
          </div>

          {/* Right: simple accent block */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="w-full h-1 bg-primary" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Innovation", value: "Driven" },
                { label: "Collaboration", value: "Focused" },
                { label: "Research", value: "Led" },
                { label: "Impact", value: "Measured" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-neutral-200 p-6"
                >
                  <p className="text-2xl font-bold text-neutral-900 mb-1">{item.value}</p>
                  <p className="text-sm text-neutral-500 uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
