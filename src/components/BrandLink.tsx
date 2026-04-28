import Link from "next/link";
import LogoMark from "./LogoMark";

export default function BrandLink({
  variant = "header",
}: {
  variant?: "header" | "footer";
}) {
  const isFooter = variant === "footer";
  return (
    <Link
      href="/"
      className="brand-link"
      aria-label="TIDA Personal トップへ"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: isFooter ? "#fff" : "var(--c-primary)",
        fontWeight: 900,
        fontSize: isFooter ? 20 : 22,
        letterSpacing: "-0.01em",
      }}
    >
      <LogoMark size={isFooter ? 26 : 28} />
      <span>
        TIDA<span style={{ color: isFooter ? "#5eead4" : "var(--c-accent)" }}>.</span>Personal
      </span>
    </Link>
  );
}
