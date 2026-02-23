// Strapi v5 response wrappers

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi media

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

// Shared components

export interface LinkComponent {
  id: number;
  text: string;
  url: string;
  variant: "primary" | "outline" | "text";
  isExternal: boolean;
}

export interface StatComponent {
  id: number;
  value: string;
  suffix: string | null;
  label: string;
}

export interface SocialLinkComponent {
  id: number;
  platform: "linkedin" | "twitter" | "instagram" | "facebook";
  url: string;
}

export interface SeoComponent {
  id: number;
  metaTitle: string | null;
  metaDescription: string | null;
  shareImage: StrapiMedia | null;
}

export interface FooterColumnComponent {
  id: number;
  title: string;
  links: LinkComponent[];
}

export interface HeroFeaturedComponent {
  id: number;
  projectName: string | null;
  location: string | null;
  year: string | null;
}

export interface SubNavSubItem {
  id: number;
  name: string;
  linkTo: string | null;
  image: StrapiMedia | null;
}

export interface SubNavItem {
  id: number;
  documentId: string;
  name: string;
  subItems: SubNavSubItem[];
}

export interface Testimonial {
  id: number;
  documentId: string;
  client_name: string;
  quote: string;
  designation?: string | null;
  company?: string | null;
  image: StrapiMedia;
}

export interface OurClient {
  id: number;
  documentId: string;
  name: string;
  image: StrapiMedia;
}

// Content types

export interface Homepage {
  id: number;
  documentId: string;
  heroBadge: string | null;
  heroTitle: string;
  heroHighlightText: string | null;
  heroSubtitle: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  heroFeatured: HeroFeaturedComponent | null;
  heroCTAs: LinkComponent[];
  stats: StatComponent[];
  expertiseHeading: string | null;
  expertiseSubheading: string | null;
  expertise: Expertise[];
  projectsHeading: string | null;
  projects: Project[];
  ctaTitle: string | null;
  ctaHighlightWord: string | null;
  ctaSubtitle: string | null;
  testimonials: Testimonial[];
  our_clients: OurClient[];
  ctaCTAs: LinkComponent[];
}

export interface Global {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string | null;
  logo: StrapiMedia | null;
  favicon: StrapiMedia | null;
  defaultSeo: SeoComponent | null;
  navLinks: LinkComponent[];
  sub_nav_items: SubNavItem[];
  headerCtaText: string | null;
  headerCtaUrl: string | null;
  footerDescription: string | null;
  footerColumns: FooterColumnComponent[];
  socialLinks: SocialLinkComponent[];
  copyright: string | null;
  bottomLinks: LinkComponent[];
}

// Dynamic zone block types

export interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

export interface MediaBlock {
  __component: "shared.media";
  id: number;
  file: StrapiMedia;
}

export interface QuoteBlock {
  __component: "shared.quote";
  id: number;
  title: string | null;
  body: string;
}

export type ContentBlock = RichTextBlock | MediaBlock | QuoteBlock;

export interface About {
  id: number;
  documentId: string;
  title: string;
  blocks: ContentBlock[];
}

export interface Expertise {
  id: number;
  documentId: string;
  title: string;
  description: string;
  icon: string;
  image: StrapiMedia;
  order: number;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string;
  category: string;
  image: StrapiMedia[];
  detailed_description: HTMLElement;
}
