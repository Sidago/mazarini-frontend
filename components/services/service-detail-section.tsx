import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { Service } from "@/lib/types/strapi";

interface ServiceDetailSectionProps {
  service: Service;
}

export function ServiceDetailSection({
  service,
}: ServiceDetailSectionProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(service.image ?? null);

  return (
    <section className="py-20 md:py-32 bg-neutral-950">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-0 mx-auto w-fit">
          {/* Left — image */}
          <FadeIn direction="left">
            <div className="relative w-full lg:w-100 shrink-0 max-h-145 aspect-3/5 overflow-hidden">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={service.image?.alternativeText ?? service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </FadeIn>

          {/* Right — content */}
          <div className="flex-1 lg:pl-16 pt-10 lg:pt-0 flex flex-col justify-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {service.title}
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <p className="text-lg text-neutral-400 leading-relaxed mb-10">
                {service.discriptions}
              </p>
            </FadeIn>

            {/* Detail descriptions rendered as content blocks with left border */}
            {Array.isArray(service.detail_discriptions) &&
              (service.detail_discriptions as DetailBlock[]).length > 0 && (
                <div className="space-y-0">
                  {(service.detail_discriptions as DetailBlock[]).map(
                    (block, index) => (
                      <DetailBlockItem
                        key={block.id ?? index}
                        block={block}
                        index={index}
                      />
                    ),
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface DetailBlock {
  id?: number;
  type: string;
  children?: DetailChild[];
}

interface DetailChild {
  type: string;
  text?: string;
  bold?: boolean;
  children?: DetailChild[];
}

interface DetailBlockItemProps {
  block: DetailBlock;
  index: number;
}

function DetailBlockItem({
  block,
  index,
}: DetailBlockItemProps): React.ReactElement {
  const text = extractBlockText(block);
  if (!text) return <></>;

  return (
    <FadeIn direction="right" delay={0.15 + index * 0.05}>
      <div className="border-l-4 border-primary pl-6 py-4">
        <p className="text-white font-bold text-lg">{text}</p>
      </div>
    </FadeIn>
  );
}

function extractBlockText(block: DetailBlock): string {
  if (!block.children) return "";
  return block.children
    .map((child) => {
      if (child.text) return child.text;
      if (child.children) return extractBlockText(child as DetailBlock);
      return "";
    })
    .join("");
}
