"use client";

import { CountUp } from "@/components/ui/fade-in";

interface StatItemProps {
  value: string;
  suffix?: string | null;
  label: string;
  description?: string | null;
}

export function StatItem({
  value,
  suffix,
  label,
  description,
}: StatItemProps): React.ReactElement {
  return (
    <div className="flex flex-col items-start group">
      <span className="font-headline text-5xl text-stat-navy font-medium mb-2 tracking-tight group-hover:opacity-90 transition-opacity">
        <CountUp value={value} />
        {suffix && <span>{suffix}</span>}
      </span>
      <h3 className="font-headline text-lg font-bold text-on-surface">
        {label}
      </h3>
      {description && (
        <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}
