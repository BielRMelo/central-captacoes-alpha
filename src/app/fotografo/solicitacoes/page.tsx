"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { CardJob } from "@/components/jobs/card-job";
import type { CaptureRequest, CaptureType } from "@/types/capture";
import { AnimatedPage } from "@/components/animation/AnimatedPage";
import { pegarJob, useFlowStore } from "@/state/flowStore";

interface Filters {
  cidade: string;
  tipoCaptacao: "" | CaptureType;
  tipoCliente: string;
  dataDesejada: string;
}

export default function FotografoSolicitacoesPage() {
  const solicitacoes = useFlowStore((s) => s.solicitacoes.filter((sol) => sol.status === "ABERTA"));
  const [filters, setFilters] = useState<Filters>({
    cidade: "",
    tipoCaptacao: "",
    tipoCliente: "",
    dataDesejada: "",
  });

  const cidades = Array.from(
    new Set(solicitacoes.map((r) => `${r.cidade} - ${r.estado}`)),
  );
  const tiposCliente = Array.from(new Set(solicitacoes.map((r) => r.tipoCliente || ""))).filter(
    Boolean,
  );

  const filtered = useMemo(() => {
    return solicitacoes.filter((req) => {
      if (filters.cidade && `${req.cidade} - ${req.estado}` !== filters.cidade) return false;
      if (filters.tipoCaptacao && req.tipoCaptacao !== filters.tipoCaptacao) return false;
      if (filters.tipoCliente && req.tipoCliente !== filters.tipoCliente) return false;
      if (filters.dataDesejada) {
        const filterDate = new Date(filters.dataDesejada).toDateString();
        const jobDate = new Date(req.dataDesejada).toDateString();
        if (filterDate !== jobDate) return false;
      }
      return true;
    });
  }, [filters, solicitacoes]);

  function handleChange<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handlePick(request: CaptureRequest) {
    const fotografoId = "ph-1"; // mock do fotógrafo logado
    pegarJob(request.id, fotografoId);
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <PageHeader
          title="Solicitações de captação"
          subtitle="Veja jobs disponíveis na sua região e filtre por tipo de captação, cliente e data."
        />

        <div className="grid gap-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-200">
                Cidade / Estado
              </label>
              <select
                value={filters.cidade}
                onChange={(e) => handleChange("cidade", e.target.value)}
                className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
              >
                <option value="">Todas</option>
                {cidades.map((cidade) => (
                  <option key={cidade} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-200">
                Tipo de captação
              </label>
              <select
                value={filters.tipoCaptacao}
                onChange={(e) =>
                  handleChange("tipoCaptacao", e.target.value as Filters["tipoCaptacao"])
                }
                className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
              >
                <option value="">Foto ou vídeo</option>
                <option value="FOTO">Foto</option>
                <option value="VIDEO">Vídeo</option>
                <option value="AMBOS">Foto + Vídeo</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-200">
                Tipo de cliente
              </label>
              <select
                value={filters.tipoCliente}
                onChange={(e) => handleChange("tipoCliente", e.target.value)}
                className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
              >
                <option value="">Todos</option>
                {tiposCliente.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-200">
                Data desejada
              </label>
              <input
                type="date"
                value={filters.dataDesejada}
                onChange={(e) => handleChange("dataDesejada", e.target.value)}
                className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((req) => {
            const mapped: CaptureRequest = {
              id: req.id,
              cliente: req.cliente,
              cidade: req.cidade,
              estado: req.estado,
              bairro: req.bairro || "",
              tipoCaptacao: req.tipoCaptacao,
              descricaoTipo: req.descricaoTipo || "",
              tipoCliente: req.tipoCliente || "",
              duracaoEstimativaHoras: 2,
              valorReceber: req.valorReceber ?? 0,
              prazoEntrega: req.prazoEntrega || req.dataDesejada,
              dataDesejada: req.dataDesejada,
              status: "DISPONIVEL",
            };
            return <CardJob key={req.id} request={mapped} onPick={handlePick} />;
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-neutral-400">
              Nenhuma solicitação encontrada com os filtros selecionados.
            </p>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
