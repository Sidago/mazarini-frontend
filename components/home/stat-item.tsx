"use client";

import { CountUp } from "@/components/ui/fade-in";

interface StatItemProps {
  value: string;
  suffix?: string;
  label: string;
}

export function StatItem({
  value,
  suffix,
  label,
}: StatItemProps): React.ReactElement {
  return (
    <div className="p-8 md:p-10 flex flex-col items-center md:items-start group hover:bg-white/5 transition-colors">
      <span className="text-4xl md:text-5xl font-black tracking-tighter mb-2 group-hover:scale-110 transition-transform origin-left">
        <CountUp value={value} />
        {suffix && (
          <span className="text-blue-200 text-3xl align-top">{suffix}</span>
        )}
      </span>
      <span className="text-sm font-medium uppercase tracking-widest opacity-80">
        {label}
      </span>
    </div>
  );
}
