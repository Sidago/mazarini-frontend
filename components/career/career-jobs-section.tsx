"use client";

import Link from "next/link";
import type { CareerPage, Job } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
  jobs: Job[];
}

export function CareerJobsSection({ data, jobs }: Props): React.ReactElement {
  const title = data?.jobsSectionTitle ?? "Featured Jobs";

  return (
    <section id="jobs" className="w-full py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl lg:text-4xl font-black font-serif tracking-tight text-neutral-900">
            {title}
          </h2>
          {/* <Link
            href="/careers/jobs"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors flex items-center gap-2">
            See All
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link> */}
        </div>

        {/* Job cards grid */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border border-neutral-200 p-6 flex flex-col gap-3 hover:border-primary transition-colors group">
                {job.department && (
                  <span className="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1">
                    {job.department}
                  </span>
                )}
                <h3 className="text-base font-bold text-neutral-900 leading-snug group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-3 text-xs text-neutral-500 mt-auto pt-3 border-t border-neutral-100">
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {job.location}
                    </span>
                  )}
                  {job.jobType && (
                    <span className="flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                      </svg>
                      {job.jobType}
                    </span>
                  )}
                </div>
                {job.applyUrl && (
                  <Link
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">
                    Apply Now &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400 mb-14">
            <p className="text-base font-serif">
              No open positions at this time. Check back soon.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {/* <div className="flex justify-center">
          <Link
            href="/careers/jobs"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all">
            View All Open Positions
          </Link>
        </div> */}
      </div>
    </section>
  );
}
