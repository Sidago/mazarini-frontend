"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

function MetaBlock({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  const lines = value.split("\n").filter(Boolean);
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
        {label}
      </p>
      {lines.length === 1 ? (
        <p className="text-sm text-white/70">{lines[0]}</p>
      ) : (
        <ul className="space-y-1">
          {lines.map((line, i) => (
            <li
              key={i}
              className="text-sm text-white/70 flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-none" />
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ColabIntroSection({ data }: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(data.introImage ?? null);

  return (
    <section
      id="intro"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-neutral-950 text-white">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">
        {/* Left — text + metadata */}
        <div className="w-full lg:w-[60vw] flex-none flex flex-col justify-center px-8 lg:pl-[10vw] lg:pr-12 py-12 overflow-y-auto lg:max-h-screen">
          {data.introTitle && (
            <h1 className="text-2xl lg:text-3xl font-serif font-bold leading-tight mb-2 text-white">
              {data.introTitle}
            </h1>
          )}
          {data.introText && (
            <p className="text-sm lg:text-base text-white/70 leading-relaxed mb-6 max-w-lg">
              {data.introText}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetaBlock label="Location" value={data.introLocation} />
            <MetaBlock label="Client" value={data.introClient} />
            <MetaBlock label="Project Type" value={data.introProjectTypes} />
            <MetaBlock label="Key Partners" value={data.introKeyPartners} />
            <MetaBlock
              label="Certifications"
              value={data.introCertifications}
            />
          </div>
          <div className="mt-5">
            <MetaBlock label="Awards" value={data.introAwards} />
          </div>

          {data.introCtaUrl && (
            <Link
              href={data.introCtaUrl}
              className="mt-10 inline-block self-start bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-amber-500 transition-colors">
              {data.introCtaText ?? "Learn More"}
            </Link>
          )}
        </div>

        {/* Right — image */}
        <div className="w-full lg:w-[40vw] flex-none relative h-72 lg:h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={data.introTitle ?? "CoLab"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-neutral-800" />
          )}
        </div>
      </div>
    </section>
  );
}
