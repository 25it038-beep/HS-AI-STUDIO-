"use client";

import { ArrowUpRight } from "@/components/ui/icons";

export function ArrowLink({
  href,
  children,
  external = false,
  accent,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  accent?: string;
  className?: string;
}) {
  const shared =
    "group inline-flex items-center gap-2 font-medium tracking-tight transition-colors";

  const style =
    accent !== undefined
      ? ({ "--link-accent": accent } as React.CSSProperties)
      : undefined;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${shared} ${className}`}
      style={style}
    >
      {children}
      <ArrowUpRight
        accent={accent}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}