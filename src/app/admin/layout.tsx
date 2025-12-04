import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { AdminNav } from "@/components/layout/admin-nav";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-neutral-50">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Container className="flex h-14 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-alpha.png"
              alt="Alpha Assessoria"
              width={140}
              height={32}
              priority
            />
          </Link>
          <span className="text-xs text-neutral-400">Painel Interno Alpha</span>
        </Container>
      </header>
      <main className="py-5">
        <Container>
          <AdminNav />
          <div className="pt-5 pb-8">{children}</div>
        </Container>
      </main>
    </div>
  );
}
