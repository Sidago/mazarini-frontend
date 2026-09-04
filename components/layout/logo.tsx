import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "default" | "small";
  scrolled: boolean;
}

export function Logo({
  size = "default",
  scrolled,
}: LogoProps): React.ReactElement {
  const imgSize = size === "default" ? "h-13" : "h-10";
  const imageUrl = scrolled
    ? "/images/mazarini-logo-black-removebg.png"
    : "/images/Logo.png";

  return (
    <Link href="/" className="flex items-center gap-2 ">
      <img
        key={imageUrl}
        src={imageUrl}
        alt="Mazarini"
        width={200}
        height={52}
        className={`${imgSize} w-auto object-contain`}
        
      />
    </Link>
  );
}
