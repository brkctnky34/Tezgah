import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-8xl",
  xl: "text-[10rem]",
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <Link href="/" className={`kh-logo block ${sizes[size]} ${className}`}>
      <span className="block white-part">KAS</span>
      <span className="block white-part">PAR</span>
      <span className="block red-part">HAU</span>
      <span className="block red-part">SER</span>
    </Link>
  );
}

export function LogoInline({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`kh-logo text-2xl leading-none ${className}`}>
      <span className="white-part">KASPAR</span>
      <span className="red-part"> HAUSER</span>
    </Link>
  );
}
