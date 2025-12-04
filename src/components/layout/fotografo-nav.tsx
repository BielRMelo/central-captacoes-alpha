"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/fotografo/solicitacoes", label: "Solicitações" },
  { href: "/fotografo/captacoes", label: "Captações realizadas" },
  { href: "/fotografo/ranking", label: "Ranking" },
  { href: "/fotografo/perfil", label: "Perfil" },
  { href: "/fotografo/info", label: "Info / Treinamentos" },
];

export function FotografoNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 text-sm dark:border-slate-800">
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
                : "text-neutral-400 hover:bg-black/40",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
