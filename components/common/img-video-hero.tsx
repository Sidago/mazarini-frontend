import { StrapiMedia } from "@/lib/types/strapi";
import { HeroVideo } from "../home/hero-video";
import { FadeIn } from "../ui/fade-in";


interface ImgOrVideoHeroProps {
  title: string;
  text: string;
  heroVideo: StrapiMedia | null;
  heroImage: StrapiMedia | null;
}

export function ImgOrVideoHero({
  title,
  text,
  heroVideo,
  heroImage,
}: ImgOrVideoHeroProps): React.ReactElement {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video / Image background */}
      <HeroVideo video={heroVideo} fallbackImage={heroImage} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <FadeIn delay={0.3}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.1] max-w-5xl">
            {title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="mt-8 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
            {text}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
