import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { StrapiMedia } from "@/lib/types/strapi";

interface LogoProps {
  logo?: StrapiMedia | null;
  size?: "default" | "small";
}

export function Logo({ logo, size = "default" }: LogoProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(logo ?? null);
  const imgSize = size === "default" ? "h-10" : "h-8";

  return (
    <Link href="/" className="flex items-center gap-2">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={logo?.alternativeText ?? "Logo"}
          className={`${imgSize} w-auto object-contain`}
        />
      ) : (
        <FallbackLogo size={size} />
      )}
    </Link>
  );
}

function FallbackLogo({ size }: { size: "default" | "small" }): React.ReactElement {
  const boxSize = size === "default" ? "w-10 h-10 text-xl" : "w-8 h-8 text-lg";
  const textSize = size === "default" ? "text-xl" : "text-lg";

  return (
    <>
      <div
        className={`${boxSize} bg-primary text-white flex items-center justify-center font-black rounded`}
      >
        M
      </div>
      <span
        className={`font-bold ${textSize} tracking-tight uppercase text-neutral-900 dark:text-white`}
      >
        Mazzarini<span className="text-primary">.</span>
      </span>
    </>
  );
}
