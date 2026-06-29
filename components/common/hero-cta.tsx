"use client";

import Link from "next/link";

interface HeroCtaProps {
  ctaText: string;
  ctaUrl: string;
  className?: string;
  openInBlank?: boolean;
}

export function HeroCta({
  ctaText,
  ctaUrl,
  className,
  openInBlank = false
}: HeroCtaProps): React.ReactElement {
  const isHash = ctaUrl.startsWith("#");

  if (isHash) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
      e.preventDefault();
      const el = document.getElementById(ctaUrl.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        // Keep the hash in the URL without an extra native jump
        window.history.replaceState(null, "", ctaUrl);
      }
    };

    return (
      <a href={ctaUrl} onClick={handleClick} className={className}>
        {ctaText}
      </a>
    );
  }

  return (
    <Link href={ctaUrl} target={openInBlank ? "_blank" : undefined} rel={openInBlank ? "noopener noreferrer" : undefined} className={className}>
      {ctaText}
    </Link>
  );
}
