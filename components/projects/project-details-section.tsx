import { FadeIn } from "@/components/ui/fade-in";
import { ProjectImageCarousel } from "@/components/projects/project-image-carousel";
import type { StrapiMedia } from "@/lib/types/strapi";

interface Props {
  location: string | null;
  client: string | null;
  contractValue: string | null;
  squareFeet: string | null;
  yearCompleted: string | null;
  schedule: string | null;
  keyPartners: string | null;
  projectTypes: string[] | null;
  type: string | null;
  images: StrapiMedia[];
  title: string;
}

export function ProjectDetailsSection({
  location,
  client,
  contractValue,
  squareFeet,
  yearCompleted,
  schedule,
  keyPartners,
  projectTypes,
  type,
  images,
  title,
}: Props): React.ReactElement {
  const meta: { label: string; value: string | null }[] = [
    { label: "Location", value: location },
    { label: "Client", value: client },
    { label: "Contract Value", value: contractValue },
    { label: "Square Feet", value: squareFeet },
    { label: "Year Completed", value: yearCompleted },
    { label: "Schedule", value: schedule },
    { label: "Key Partners", value: keyPartners },
  ].filter((m) => m.value);

  const resolvedTypes =
    projectTypes?.length ? projectTypes : type ? [type] : [];

  return (
    <section className="bg-neutral-950 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — metadata */}
          <FadeIn direction="up">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              {meta.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-1">
                    {label}
                  </p>
                  <p className="text-white text-base font-medium">{value}</p>
                </div>
              ))}

              {resolvedTypes.length > 0 && (
                <div className="col-span-2">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2">
                    Project Types
                  </p>
                  <div className="flex flex-col gap-1">
                    {resolvedTypes.map((pt) => (
                      <p key={pt} className="text-white text-base font-medium underline underline-offset-4">
                        {pt}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Right — image carousel (client component, clean props) */}
          {images.length > 0 && (
            <FadeIn direction="up" delay={0.1}>
              <ProjectImageCarousel images={images} title={title} />
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
