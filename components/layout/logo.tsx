import Link from "next/link";

interface LogoProps {
  size?: "default" | "small";
}

export function Logo({ size = "default" }: LogoProps): React.ReactElement {
  const boxSize = size === "default" ? "w-10 h-10 text-xl" : "w-8 h-8 text-lg";
  const textSize = size === "default" ? "text-xl" : "text-lg";

  return (
    <Link href="/" className="flex items-center gap-2">
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
    </Link>
  );
}
