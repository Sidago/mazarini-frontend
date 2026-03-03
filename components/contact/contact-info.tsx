import { SocialLinks } from "@/components/home/social-links";
import { FadeIn } from "@/components/ui/fade-in";
import type { SocialLinkComponent } from "@/lib/types/strapi";

interface ContactInfoProps {
  title: string;
  description: string;
  socialLinks: SocialLinkComponent[];
}

export function ContactInfo({
  title,
  description,
  socialLinks,
}: ContactInfoProps): React.ReactElement {
  return (
    <div className="flex flex-col justify-start lg:min-h-150">
      <div>
        <FadeIn>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 mb-6">
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-md">
            {description}
          </p>
        </FadeIn>
      </div>
      {socialLinks.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="mt-12">
            <SocialLinks links={socialLinks} />
          </div>
        </FadeIn>
      )}
    </div>
  );
}
