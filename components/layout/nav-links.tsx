import Link from "next/link";
import type { LinkComponent } from "@/lib/types/strapi";

interface NavLinksProps {
  links: LinkComponent[];
}

export function NavLinks({ links }: NavLinksProps): React.ReactElement {
  return (
    <nav className="hidden md:flex space-x-8 lg:space-x-12">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          className="text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-primary transition-colors"
          {...(link.isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
