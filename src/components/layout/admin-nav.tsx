"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/solicitacoes", label: "Solicitações" },
  { href: "/admin/captacoes", label: "Captações realizadas" },
  { href: "/admin/fotografos", label: "Fotógrafos" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2 text-sm">
      {links.map((link) => {
        const active = pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "rounded-full px-3 py-1.5",
              active
                ? "bg-alpha-500 text-black shadow-sm"
                : "text-neutral-300 hover:bg-black/50 hover:text-neutral-50",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
