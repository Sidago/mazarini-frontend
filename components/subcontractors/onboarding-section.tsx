import { FadeIn } from "@/components/ui/fade-in";
import type { OnboardingItem } from "@/lib/types/strapi";

interface OnboardingSectionProps {
  title: string;
  ctaText: string | null;
  ctaUrl: string | null;
  requirements: OnboardingItem[];
  extraTitle: string | null;
  extraRequirements: OnboardingItem[];
}

export function OnboardingSection({
  title,
  ctaText,
  ctaUrl,
  requirements,
  extraTitle,
  extraRequirements,
}: OnboardingSectionProps): React.ReactElement {
  return (
    <section className="bg-neutral-950 py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left column */}
          <FadeIn direction="left">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white italic leading-tight">
                {title}
              </h2>
              {ctaText && ctaUrl && (
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block px-8 py-4 bg-primary text-black font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors"
                >
                  {ctaText}
                </a>
              )}
            </div>
          </FadeIn>

          {/* Right column */}
          <div>
            <FadeIn delay={0.2}>
              <h3 className="text-white font-bold text-lg mb-6">
                To onboard, you will need:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3">
                {requirements.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <span className="text-primary mt-1.5 text-xs">&#9679;</span>
                    <span className="text-neutral-300 leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {extraTitle && extraRequirements.length > 0 && (
              <FadeIn delay={0.4}>
                <div className="mt-12">
                  <h3 className="text-white font-bold text-lg mb-6">
                    {extraTitle}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3">
                    {extraRequirements.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <span className="text-primary mt-1.5 text-xs">
                          &#9679;
                        </span>
                        <span className="text-neutral-300 leading-relaxed">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
