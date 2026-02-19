import Image from "next/image";
import { getAbout } from "@/lib/api/about";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { ContentBlock } from "@/lib/types/strapi";

export const dynamic = "force-dynamic";

function BlockRenderer({ block }: { block: ContentBlock }): React.ReactElement {
  switch (block.__component) {
    case "shared.rich-text":
      return (
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: block.body }}
        />
      );
    case "shared.media":
      return (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image
            src={getStrapiMediaUrl(block.file)}
            alt={block.file.alternativeText ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      );
    case "shared.quote":
      return (
        <blockquote className="border-l-4 border-primary pl-6 py-4">
          {block.title && (
            <p className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {block.title}
            </p>
          )}
          <p className="text-neutral-600 dark:text-neutral-300 italic text-lg">
            {block.body}
          </p>
        </blockquote>
      );
  }
}

export default async function About(): Promise<React.ReactElement> {
  let about = { id: 0, documentId: "", title: "About Us", blocks: [] as ContentBlock[] };

  try {
    about = await getAbout();
  } catch {
    // Strapi unavailable or permissions not set — render with fallback data
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <FadeIn>
        <h1 className="text-5xl md:text-6xl font-black text-neutral-900 dark:text-white mb-16">
          {about.title}
        </h1>
      </FadeIn>
      <div className="space-y-12">
        {about.blocks?.map((block, index) => (
          <FadeIn key={block.id} delay={index * 0.1}>
            <BlockRenderer block={block} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
