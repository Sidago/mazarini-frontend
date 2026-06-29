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
  description: string | null;
}

export interface SocialLinkComponent {
  id: number;
  platform: "linkedin" | "twitter" | "instagram" | "facebook" | "youtube";
  url: string;
}

export interface ContactSubmissionPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  inquiryType: string;
  notes: string;
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
  category?: string | null;
  description?: string | null;
}

export interface SubNavItem {
  id: number;
  documentId: string;
  name: string;
  slug?: string;
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
  seo?: SeoComponent | null;
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
  introHeading: string | null;
  introHighlightText: string | null;
  introDescription: string | null;
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
  experienceHeading: string | null;
  experienceHighlightText: string | null;
  experienceDescription: string | null;
  experienceImage: StrapiMedia | null;
  experienceCtaText: string | null;
  belongHeading: string | null;
  belongDescription: string | null;
  belongImage: StrapiMedia | null;
  belongCtaText: string | null;
  sparkHeading: string | null;
  sparkDescription: string | null;
  sparkImage: StrapiMedia | null;
  sparkCtaText: string | null;
  sparkCtaUrl: string | null;
  newsHeading: string | null;
  news: News[];
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

// Strapi "blocks" rich-text field (the Blocks editor) — a tree of nodes.
export interface BlocksNode {
  type: string;
  level?: number;
  format?: "ordered" | "unordered";
  url?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: BlocksNode[];
}

export type BlocksContent = BlocksNode[];

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

export interface CoreValue {
  id: number;
  title: string;
  description: string | null;
}

export interface About {
  id: number;
  documentId: string;
  title: string;
  seo?: SeoComponent | null;
  heroTitle: string;
  heroText: string;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
  introHeading: string | null;
  introHighlight: string | null;
  introDiscription: string | null;
  timelineHeading: string | null;
  timelineDescription: string | null;
  blocks: ContentBlock[];
  stats: AboutStat[];
  leadershipHeading: string | null;
  leadershipDescription: string | null;
  leadershipBlocks: LeadershipBlock[];
  coreValuesImage: StrapiMedia | null;
  coreValues: CoreValue[];
  cultureHeading: string | null;
  cultureDescription: string | null;
  cultureWatermark: string | null;
  cultureCards: CultureCard[];
  lifeHeading: string | null;
  lifeDescription: string | null;
  lifeImages: LifeImage[];
}

export interface AboutStat {
  id: number;
  value: string;
  suffix: string | null;
  label: string;
  description: string | null;
}

export interface LeadershipBlock {
  id: number;
  watermark: string | null;
  image: StrapiMedia;
  description: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
}

export interface CultureCard {
  id: number;
  tag: string | null;
  title: string;
  image: StrapiMedia;
  url: string | null;
  description: string | null;
}

export interface LifeImage {
  id: number;
  image: StrapiMedia;
}

export interface Contact {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  heroTitle: string;
  heroText: string;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
  formTitle: string | null;
  formDescription: string | null;
  cultureHeading: string | null;
  cultureDescription: string | null;
  cultureWatermark: string | null;
  cultureCards: CultureCard[];
}

export interface TimelineMilestone {
  id: number;
  year: string;
  description: string;
}

export interface TimelineEntry {
  id: number;
  documentId: string;
  decade: string;
  title: string;
  description: string;
  image: StrapiMedia;
  order: number | null;
  milestones: TimelineMilestone[] | null;
}

export interface News {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  title: string;
  description: string | null;
  slug: string;
  category: string | null;
  image: StrapiMedia | null;
  publishedDate: string | null;
}

export interface NewsPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  pageTitle: string;
  pageDescription: string | null;
  featuredNews: News[];
  featuredCTA: string | null;
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
  seo?: SeoComponent | null;
  title: string;
  description: string;
  category: string;
  location: string | null;
  type: string | null;
  client: string | null;
  contractValue: string | null;
  squareFeet: string | null;
  yearCompleted: string | null;
  schedule: string | null;
  keyPartners: string | null;
  projectTypes: string[] | null;
  teams: Teams[];
  image: StrapiMedia[];
  detail_discriptions: unknown;
}

export interface ProjectsPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  pageTitle: string;
  pageDescription: string | null;
  featuredProjects: Project[];
  featuredCTA: string | null;
}

export interface AccordionItem {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia | null;
}

export interface Service {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  title: string;
  discriptions: string;
  catagory: string | null;
  image: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  detail_discriptions: unknown;
  accordion_items: AccordionItem[];
  slug: string | null;
  testimonials?: Testimonial[];
  teams?: Teams[];
}

export interface ServicesPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  pageTitle: string;
  pageDescription: string | null;
  heroTitle: string;
  heroText: string | null;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  featuredCTA?: string | null;
  featuredServices: Service[];
  stats?: StatComponent[];
}

// Experience
export interface ExperienceStep {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: StrapiMedia | null;
  ctaText: string | null;
  ctaUrl: string | null;
  order: number;
}

export interface ExperiencePage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  heroTitle: string;
  heroText: string | null;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
  experience_steps: ExperienceStep[];
}

// Locations
export interface LocationPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  title: string;
  heroTitle: string;
  heroText: string;
  heroVideo: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
  heroImage: StrapiMedia | null;
}

export interface Location {
  id: number;
  documentId: string;
  state: string;
  city: string;
  phoneNumber: string;
  email: string;
  address: string;
  mapEmbedUrl: string | null;
}

// Our Teams

export interface Teams {
  id: number;
  documentId: string;
  name: string;
  position: string;
  catagory: string;
  bio: string | null;
  location: string | null;
  image: StrapiMedia | null;
}

export interface TeamsPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  heroTitle: string;
  heroText: string;
  heroVedio: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
}

// R&D Page

// Subcontractors Page

export interface SubcontractorQuote {
  id: number;
  quote: string;
  authorName: string;
  company: string | null;
  designation: string | null;
}

export interface OnboardingItem {
  id: number;
  text: string;
}

export interface TradePartnerTab {
  id: number;
  tabName: string;
  title: string;
  description: string;
  image: StrapiMedia | null;
}

export interface SubcontractorsPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  heroTitle: string;
  heroText: string;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
  quoteTitle: string | null;
  quotes: SubcontractorQuote[];
  onboardingTitle: string | null;
  onboardingCtaText: string | null;
  onboardingCtaUrl: string | null;
  onboardingRequirements: OnboardingItem[];
  onboardingExtraTitle: string | null;
  onboardingExtraRequirements: OnboardingItem[];
  formTitle: string | null;
  formDescription: string | null;
  tradePartnersTitle: string | null;
  tradePartnersDescription: string | null;
  tradePartnerTabs: TradePartnerTab[];
  faqTitle: string | null;
  faqDescription: string | null;
  faqItems: AccordionItem[];
}

// R&D Page

export interface RdInnovationItem {
  id: number;
  title: string | null;
  image: StrapiMedia | null;
}

export interface RdWhyCard {
  id: number;
  documentId: string;
  label: string;
  description: string | null;
  image: StrapiMedia | null;
  order: number | null;
}

export interface RdPillar {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: StrapiMedia | null;
  order: number | null;
}

export interface RdPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  heroTitle: string;
  heroText: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;

  quoteText: string | null;
  quoteAuthorName: string | null;
  quoteAuthorPosition: string | null;
  quoteAuthorImage: StrapiMedia | null;

  whyTitle: string | null;
  whyDescription: string | null;
  whyWatermark: string | null;
  whyCards: RdWhyCard[];

  pillarsTitle: string | null;
  pillarsDescription: string | null;
  pillarsWatermark: string | null;
  pillars: RdPillar[];

  projectsTitle: string | null;
  projectsDescription: string | null;
  projectsWatermark: string | null;
  featuredProjects: Project[];

  innovationTitle: string | null;
  innovationDescription: string | null;
  innovationWatermark: string | null;
  innovationItems: RdInnovationItem[];

  newsTitle: string | null;
  newsWatermark: string | null;
  newsCtaText: string | null;
  newsCtaUrl: string | null;
  featuredNews: News[];

  partnersTitle: string | null;
  partnersDescription: string | null;
  partnersWatermark: string | null;
  partners: OurClient[];

  leadershipTitle: string | null;
  leadershipDescription: string | null;
  leadershipWatermark: string | null;
  featuredLeadership: Teams[];

  contactTitle: string | null;
  contactDescription: string | null;
  contactCtaText: string | null;
  contactCtaUrl: string | null;
}

// Safety Page & Tools and Technology Page (identical structure)

export interface SafetyPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  title: string;
  heroTitle: string;
  heroText: string;
  heroImage: StrapiMedia | null;
  heroVedio: StrapiMedia | null;
  accordianTitle: string;
  accordianDetails: string | null;
  accordionImage: StrapiMedia | null;
  accordionItems: AccordionItem[];
  stats: StatComponent[];
  carouselTitle: string;
  carouselText: string;
  carouselCard: CultureCard[];
  leadershipTitle: string;
  leadershipDetails: string | null;
  leadershipParallaxText: string | null;
  leadership_cards: Teams[];
}

export type ToolsAndTechnologyPage = SafetyPage;

export interface SustainabilityPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  title: string | null;
  heroTitle: string | null;
  heroText: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  accordionTitle: string | null;
  accordionDetails: string | null;
  accordionImage: StrapiMedia | null;
  accordionItems: AccordionItem[];
  stats: StatComponent[];
  carouselTitle: string | null;
  carouselText: string | null;
  carouselCards: CultureCard[];
  leadershipTitle: string | null;
  leadershipDetails: string | null;
  leadershipParallaxText: string | null;
  leadershipCards: Teams[];
}

export interface ColabElementCard {
  id: number;
  label: string;
  image: StrapiMedia | null;
  title: string | null;
  description: string | null;
  title2: string | null;
  description2: string | null;
}

export interface ColabChallengeCard {
  id: number;
  label: string;
  description: string | null;
  hoverDescription: string | null;
  image: StrapiMedia | null;
  order: number | null;
}

export interface ColabInnovationItem {
  id: number;
  title: string;
  description: string | null;
  image: StrapiMedia | null;
}

export interface ColabPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;

  heroTitle: string | null;
  heroText: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;

  introTitle: string | null;
  introText: string | null;
  introImage: StrapiMedia | null;
  introVideo: StrapiMedia | null;
  introCtaText: string | null;
  introCtaUrl: string | null;
  introLocation: string | null;
  introClient: string | null;
  introProjectTypes: string | null;
  introKeyPartners: string | null;
  introCertifications: string | null;
  introAwards: string | null;

  numbersTitle: string | null;
  numbersWatermark: string | null;
  numbersImage: StrapiMedia | null;
  stats: StatComponent[];

  visionTitle: string | null;
  visionSubtitle: string | null;
  visionWatermark: string | null;
  visionItems: AccordionItem[];

  experienceText: string | null;
  experienceCtaText: string | null;
  experienceCtaUrl: string | null;
  experienceImage: StrapiMedia | null;

  testimonialQuote: string | null;
  testimonialAuthorName: string | null;
  testimonialAuthorPosition: string | null;
  testimonialImage: StrapiMedia | null;

  elementsTitle: string | null;
  elementsWatermark: string | null;
  elementCards: ColabElementCard[];

  challengesTitle: string | null;
  challengesDescription: string | null;
  challengesWatermark: string | null;
  challengeCards: ColabChallengeCard[];

  innovationTitle: string | null;
  innovationWatermark: string | null;
  innovations: ColabInnovationItem[];

  resultsTitle: string | null;
  resultsWatermark: string | null;
  resultsImages: StrapiMedia[];

  teamTitle: string | null;
  teamDescription: string | null;
  teamWatermark: string | null;
  teamMembers: Teams[];

  newsTitle: string | null;
  newsWatermark: string | null;
  newsCtaText: string | null;
  newsCtaUrl: string | null;
  featuredNews: News[];
}

// Leadership Page

export interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  quote: string | null;
  bio: string | null;
  linkedinUrl: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  image: StrapiMedia;
}

export interface LeadershipPageData {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  pageTitle: string;
  pageDescription: string | null;
  groupPhoto: StrapiMedia | null;
  members: LeadershipMember[];
}

// Insights

export interface Insight {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  title: string;
  slug: string;
  category: string | null;
  date: string | null;
  description: string | null;
  image: StrapiMedia | null;
  file: StrapiMedia | null;
}

export interface InsightsPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  pageTitle: string;
  pageDescription: string | null;
  featuredCTA: string | null;
  featuredInsights: Insight[];
}

// Corporate Responsibility Page

export interface CrPillar {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: StrapiMedia | null;
  order: number | null;
}

export interface CrMetric {
  id: number;
  documentId: string;
  value: string;
  label: string;
  order: number | null;
}

export interface CorporateResponsibilityPage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;
  heroTitle: string;
  heroText: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;

  quoteText: string | null;
  quoteAuthorName: string | null;
  quoteAuthorPosition: string | null;
  quoteAuthorImage: StrapiMedia | null;

  pillarsTitle: string | null;
  pillarsDescription: string | null;
  pillarsWatermark: string | null;
  pillars: CrPillar[];

  foundationTitle: string | null;
  foundationDescription: string | null;
  foundationImage: StrapiMedia | null;
  foundationCtaText: string | null;
  foundationCtaUrl: string | null;

  impactTitle: string | null;
  impactWatermark: string | null;
  impactCtaText: string | null;
  impactCtaUrl: string | null;
  metrics: CrMetric[];

  newsTitle: string | null;
  newsWatermark: string | null;
  newsCtaText: string | null;
  newsCtaUrl: string | null;
  featuredNews: News[];

  executivesTitle: string | null;
  executivesDescription: string | null;
  executivesWatermark: string | null;
  executives: Teams[];
}

// Career Page

export interface ResourceItem {
  id: number;
  title: string;
  url: string | null;
}

export interface CareerQuote {
  id: number;
  text: string;
  authorName: string | null;
  authorPosition: string | null;
  contactUrl: string | null;
  authorImage: StrapiMedia | null;
}

export interface CareerCultureCard {
  id: number;
  title: string;
  tag: string | null;
  url: string | null;
  image: StrapiMedia | null;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string | null;
  image: StrapiMedia | null;
}

export interface Job {
  id: number;
  documentId: string;
  title: string;
  jobCode: string | null;
  department: string | null;
  location: string | null;
  jobType: string | null;
  description: BlocksContent | null;
  applyUrl: string | null;
  order: number | null;
  isActive: boolean;
  createdAt: string | null;
}

export interface JobsPage {
  id: number;
  documentId: string;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImage: StrapiMedia | null;
  aboutTitle: string | null;
  aboutText: string | null;
  fraudTitle: string | null;
  fraudText: string | null;
  fraudUrl: string | null;
  seo: SeoComponent | null;
}

export interface CareerPage {
  id: number;
  documentId: string;
  heroTitle: string | null;
  heroText: string | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  missionTitle: string | null;
  missionHighlight: string | null;
  missionText: string | null;
  statsTitle: string | null;
  stats: StatComponent[];
  quotesTitle: string | null;
  quotes: CareerQuote[];
  jobsSectionTitle: string | null;
  peopleTitle: string | null;
  peopleSubtitle: string | null;
  peopleImages: StrapiMedia[];
  benefitsTitle: string | null;
  benefitsHighlight: string | null;
  benefitsText: string | null;
  benefitsImage: StrapiMedia | null;
  benefitItems: AccordionItem[];
  cultureTitle: string | null;
  cultureSubtitle: string | null;
  cultureCards: CareerCultureCard[];
  featuresTitle: string | null;
  featureItems: FeatureItem[];
  belongTitle: string | null;
  belongDescription: string | null;
  belongImage: StrapiMedia | null;
  personName: string | null;
  personPosition: string | null;
  personQuote: string | null;
  personCtaText: string | null;
  personCtaUrl: string | null;
  personImage: StrapiMedia | null;
  resourcesTitle: string | null;
  resourceItems: ResourceItem[];
  seo: SeoComponent | null;
}

// Spark Page ("Igniting Progress")

export interface SparkBlock {
  id: number;
  title: string | null;
  text: string | null;
  image: StrapiMedia | null;
  ctaText: string | null;
  ctaUrl: string | null;
}

export interface SparkPage {
  id: number;
  documentId: string;
  heroTitle: string | null;
  heroText: string | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  introHeading: string | null;
  introHighlight: string | null;
  introText: string | null;
  statementHeading: string | null;
  statementHighlight: string | null;
  statementImage: StrapiMedia | null;
  blocks: SparkBlock[];
  wideImage: StrapiMedia | null;
  wideCaption: string | null;
  newsTitle: string | null;
  contactTitle: string | null;
  contactDescription: string | null;
  seo: SeoComponent | null;
}

// You Belong Here Page

export interface YouBelongHerePage {
  id: number;
  documentId: string;
  seo?: SeoComponent | null;

  heroTitle: string | null;
  heroText: string | null;
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
  heroCtaText: string | null;
  heroCtaUrl: string | null;

  quoteText: string | null;
  quoteAuthorName: string | null;
  quoteAuthorPosition: string | null;
  quoteAuthorImage: StrapiMedia | null;

  belongingTitle: string | null;
  belongingDescription: string | null;
  belongingWatermark: string | null;
  belongingItems: AccordionItem[];

  missionTitle: string | null;
  missionDescription: string | null;
  missionWatermark: string | null;
  missionItems: AccordionItem[];

  subcontractorsText: string | null;
  subcontractorsCtaText: string | null;
  subcontractorsCtaUrl: string | null;
  subcontractorsImage: StrapiMedia | null;

  accomplishmentsTitle: string | null;
  accomplishmentsSubtitle: string | null;
  accomplishmentsWatermark: string | null;
  accomplishments: AccordionItem[];

  goalsTitle: string | null;
  goalsWatermark: string | null;
  goalsDescription: string | null;
  goals: AccordionItem[];

  careersText: string | null;
  careersCtaText: string | null;
  careersCtaUrl: string | null;
  careersImage: StrapiMedia | null;
  careersWatermark: string | null;

  newsTitle: string | null;
  newsWatermark: string | null;
  newsCtaText: string | null;
  newsCtaUrl: string | null;
  featuredNews: News[];

  leadershipTitle: string | null;
  leadershipDescription: string | null;
  leadershipWatermark: string | null;
  featuredLeadership: Teams[];
}
