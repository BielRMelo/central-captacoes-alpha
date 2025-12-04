"use client";

import { PageHeader } from "@/components/ui/page-header";
import { AnimatedPage } from "@/components/animation/AnimatedPage";
import { AnimatedCard } from "@/components/animation/AnimatedCard";

export default function AdminDashboardPage() {
  return (
    <AnimatedPage>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard de captações"
          subtitle="Visão geral de captações abertas, em andamento, concluídas e destaque dos fotógrafos."
        />

        <div className="grid gap-4 md:grid-cols-4">
          <AnimatedCard>
            <div className="space-y-1 p-4 text-sm">
              <p className="text-xs font-medium text-neutral-400">Captações abertas hoje</p>
              <p className="text-2xl font-semibold text-neutral-50">8</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={0.05}>
            <div className="space-y-1 p-4 text-sm">
              <p className="text-xs font-medium text-neutral-400">Captações em andamento</p>
              <p className="text-2xl font-semibold text-neutral-50">21</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={0.1}>
            <div className="space-y-1 p-4 text-sm">
              <p className="text-xs font-medium text-neutral-400">Captações concluídas no mês</p>
              <p className="text-2xl font-semibold text-neutral-50">54</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={0.15}>
            <div className="space-y-1 p-4 text-sm">
              <p className="text-xs font-medium text-neutral-400">Top fotógrafos do mês</p>
              <ul className="mt-1 space-y-1 text-xs text-neutral-200">
                <li>• Ana Souza – score 95</li>
                <li>• Bruna Martins – score 85</li>
                <li>• Eduardo Santos – score 80</li>
              </ul>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </AnimatedPage>
  );
}
