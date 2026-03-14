"use client";

interface Section {
  id: string;
  label: string;
}

interface RdProgressBarProps {
  sections: Section[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export function RdProgressBar({
  sections,
  activeId,
  onNavigate,
}: RdProgressBarProps): React.ReactElement {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center h-12 px-8 bg-transparent">
      <div className="relative flex items-center w-full">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-neutral-600/60" />

        {/* Dots + labels */}
        <div className="relative flex justify-between w-full">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onNavigate(section.id)}
                className="flex flex-col items-center gap-1 group"
                aria-label={`Go to ${section.label}`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-primary border-primary scale-125"
                      : "bg-neutral-600 border-neutral-600 group-hover:border-primary group-hover:bg-primary/40"
                  }`}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-neutral-500 group-hover:text-primary/70"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
