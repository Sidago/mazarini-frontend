import React from "react";

interface RdSectionShellProps {
  id: string;
  dark?: boolean;
  watermark?: string | null;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export function RdSectionShell({
  id,
  dark = false,
  watermark,
  leftContent,
  rightContent,
}: RdSectionShellProps): React.ReactElement {
  return (
    <section
      id={id}
      className={`relative w-screen h-screen flex-none flex items-center overflow-hidden ${
        dark ? "bg-neutral-900 text-white" : "bg-background-light text-neutral-900"
      }`}
    >
      {/* Watermark */}
      {watermark && (
        <span
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold leading-none"
          style={{
            fontSize: "clamp(120px, 20vw, 260px)",
            color: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {watermark}
        </span>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-center">
          <div className="flex flex-col justify-center">{leftContent}</div>
          <div>{rightContent}</div>
        </div>
      </div>
    </section>
  );
}
