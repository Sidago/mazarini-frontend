import Link from "next/link";

interface FooterLinkColumnProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export function FooterLinkColumn({
  title,
  links,
}: FooterLinkColumnProps): React.ReactElement {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">
        {title}
      </h4>
      <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
