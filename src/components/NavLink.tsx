"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const active =
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={active ? "nav-link active" : "nav-link"}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
