"use client";

import { Icon } from "@/components/ui/icon";
import type { Job } from "@/lib/types/strapi";

interface JobCardProps {
  job: Job;
  isActive?: boolean;
  onSelect?: (job: Job) => void;
}

export function postedLabel(createdAt: string | null): string | null {
  if (!createdAt) return null;
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return null;
  const diffMs = Date.now() - created.getTime();
  const days = Math.max(0, Math.floor(diffMs / 86_400_000));
  if (days === 0) return "Posted Today";
  if (days === 1) return "Posted 1 Day Ago";
  return `Posted ${days} Days Ago`;
}

export function JobCard({
  job,
  isActive = false,
  onSelect,
}: JobCardProps): React.ReactElement {
  const posted = postedLabel(job.createdAt);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(job)}
      className={`block w-full text-left py-6 pl-4 border-l-4 border-b border-neutral-200 dark:border-neutral-700 transition-colors cursor-pointer ${
        isActive
          ? "border-l-primary bg-primary/5"
          : "border-l-transparent hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40"
      }`}
    >
      <span
        className={`text-lg lg:text-xl font-semibold underline underline-offset-4 transition-colors ${
          isActive
            ? "text-primary"
            : "text-neutral-900 dark:text-neutral-100"
        }`}
      >
        {job.title}
      </span>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
        {job.location && (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="place" className="text-base text-neutral-400" />
            {job.location}
          </span>
        )}
        {job.jobType && (
          <span className="inline-flex items-center gap-1.5">
            <Icon
              name="business_center"
              className="text-base text-neutral-400"
            />
            {job.jobType}
          </span>
        )}
      </div>

      {posted && (
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          {posted}
        </p>
      )}

      {job.jobCode && (
        <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
          {job.jobCode}
        </p>
      )}
    </button>
  );
}
