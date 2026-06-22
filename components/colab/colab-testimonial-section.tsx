import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabTestimonialSection({ data }: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(data.testimonialImage ?? null);

  return (
    <section
      id="testimonial"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex flex-col lg:flex-row overflow-hidden">

      {/* Left — dark quote panel */}
      <div className="relative w-full lg:w-[55%] flex-none bg-neutral-950 flex items-center justify-end px-10 lg:px-16 py-20 lg:py-0">
        <div className="max-w-2xl">
          {/* Large opening quote mark */}
          <div
            className="text-[8rem] leading-none font-serif text-white/30 select-none -mb-10"
            aria-hidden="true">
            &ldquo;
          </div>

          {data.testimonialQuote && (
            <blockquote className="text-base lg:text-lg font-serif font-semibold leading-relaxed text-white mb-10">
              {data.testimonialQuote}
            </blockquote>
          )}

          <div>
            {data.testimonialAuthorName && (
              <p className="text-sm font-bold uppercase tracking-widest text-white">
                {data.testimonialAuthorName}
              </p>
            )}
            {data.testimonialAuthorPosition && (
              <p className="text-white/50 text-sm mt-1">
                {data.testimonialAuthorPosition}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right — full-height image */}
      <div className="relative w-full lg:w-[45%] flex-none min-h-[50vh] lg:min-h-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={data.testimonialAuthorName ?? "Testimonial"}
            fill
            className="object-cover object-left"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800" />
        )}
      </div>
    </section>
  );
}
