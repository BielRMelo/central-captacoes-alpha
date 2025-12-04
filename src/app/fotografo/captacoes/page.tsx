"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { JobsTable } from "@/components/jobs/jobs-table";
import { AnimatedPage } from "@/components/animation/AnimatedPage";
import { registrarEntrega, useFlowStore } from "@/state/flowStore";
import type { CaptureJob } from "@/types/capture";

export default function FotografoCaptacoesPage() {
  const fotografoId = "ph-1";
  const captacoesFlow = useFlowStore((s) => s.captacoes.filter((c) => c.fotografoId === fotografoId));

  const jobs: CaptureJob[] = useMemo(
    () =>
      captacoesFlow.map((c) => ({
        id: c.id,
        cliente: c.cliente,
        cidade: c.cidade,
        estado: c.estado,
        dataCaptacao: c.dataCaptacao,
        tipoCaptacao: c.tipoCaptacao,
        status:
          c.status === "CONCLUIDA"
            ? "CONCLUIDO"
            : c.status === "ENTREGUE"
              ? "AGUARDANDO_APROVACAO"
              : "AGUARDANDO_APROVACAO",
        linksEntrega: c.linksEntrega,
      })),
    [captacoesFlow],
  );
  return (
    <AnimatedPage>
      <div className="space-y-6">
        <PageHeader
          title="Captações realizadas"
          subtitle="Histórico de jobs, status, nota e feedbacks. Clique em uma linha para ver detalhes."
        />

        <JobsTable
          jobs={jobs}
          onRegistrarEntrega={(jobId, link) => registrarEntrega(jobId, link)}
        />
      </div>
    </AnimatedPage>
  );
}
