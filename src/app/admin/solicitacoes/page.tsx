"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { createSolicitacao, useFlowStore, type FlowJobStatus } from "@/state/flowStore";
import type { CaptureType } from "@/types/capture";

export default function AdminSolicitacoesPage() {
  const solicitacoes = useFlowStore((s) => s.solicitacoes);
  const [filtroStatus, setFiltroStatus] = useState<"TODOS" | FlowJobStatus>("TODOS");

  const [form, setForm] = useState<{
    cliente: string;
    squad: string;
    plano: string;
    endereco: string;
    cidade: string;
    estado: string;
    tipoCaptacao: CaptureType;
    origem: "VENDIDA" | "INCLUSA_CONTRATO";
    orcamentoAprovado: number;
    dataLimite: string;
    roteiroBase: string;
  }>({
    cliente: "",
    squad: "",
    plano: "",
    endereco: "",
    cidade: "",
    estado: "",
    tipoCaptacao: "FOTO",
    origem: "VENDIDA",
    orcamentoAprovado: 0,
    dataLimite: "",
    roteiroBase: "",
  });

  const filtradas = useMemo(() => {
    if (filtroStatus === "TODOS") return solicitacoes;
    return solicitacoes.filter((s) => s.status === filtroStatus);
  }, [filtroStatus, solicitacoes]);

  function handleChange<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.cliente || !form.endereco || !form.cidade || !form.estado || !form.dataLimite) return;

    createSolicitacao({
      cliente: form.cliente,
      cidade: form.cidade,
      estado: form.estado,
      bairro: "",
      squad: form.squad,
      tipoCaptacao: form.tipoCaptacao,
      descricaoTipo: form.plano,
      tipoCliente: undefined,
      valorReceber: form.orcamentoAprovado,
      dataDesejada: form.dataLimite,
      prazoEntrega: form.dataLimite,
      roteiroBase: form.roteiroBase,
    });
    setForm((prev) => ({
      ...prev,
      cliente: "",
      squad: "",
      plano: "",
      endereco: "",
      cidade: "",
      estado: "",
      orcamentoAprovado: 0,
      dataLimite: "",
      roteiroBase: "",
    }));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Solicitações de captação"
        subtitle="Crie novas solicitações e acompanhe o status das captações ligadas aos clientes Alpha."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-neutral-50">Nova solicitação</h2>
          <p className="text-[11px] text-neutral-400">
            Preencha os principais dados da captação. Integrações e regras automáticas virão em versões futuras.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Cliente</label>
            <input
              type="text"
              value={form.cliente || ""}
              onChange={(e) => handleChange("cliente", e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Squad</label>
            <input
              type="text"
              value={form.squad || ""}
              onChange={(e) => handleChange("squad", e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Plano</label>
            <input
              type="text"
              value={form.plano || ""}
              onChange={(e) => handleChange("plano", e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
          <div className="space-y-1 md:col-span-3">
            <label className="text-xs font-medium text-neutral-200">Endereço completo</label>
            <input
              type="text"
              value={form.endereco || ""}
              onChange={(e) => handleChange("endereco", e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Cidade</label>
            <input
              type="text"
              value={form.cidade || ""}
              onChange={(e) => handleChange("cidade", e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Estado</label>
            <input
              type="text"
              value={form.estado || ""}
              onChange={(e) => handleChange("estado", e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Tipo de captação</label>
            <select
              value={form.tipoCaptacao}
              onChange={(e) => handleChange("tipoCaptacao", e.target.value as CaptureType)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="FOTO">Foto</option>
              <option value="VIDEO">Vídeo</option>
              <option value="AMBOS">Foto + Vídeo</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Origem</label>
            <select
              value={form.origem}
              onChange={(e) => handleChange("origem", e.target.value as "VENDIDA" | "INCLUSA_CONTRATO")}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="VENDIDA">Captação vendida</option>
              <option value="INCLUSA_CONTRATO">Inclusa no contrato</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Orçamento aprovado (R$)</label>
            <input
              type="number"
              value={form.orcamentoAprovado ?? 0}
              onChange={(e) =>
                handleChange("orcamentoAprovado", Number(e.target.value) || 0)
              }
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Data limite</label>
            <input
              type="date"
              value={form.dataLimite ? form.dataLimite.slice(0, 10) : ""}
              onChange={(e) =>
                handleChange("dataLimite", new Date(e.target.value).toISOString())
              }
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-200">Roteiro base</label>
          <textarea
            rows={3}
            value={form.roteiroBase || ""}
            onChange={(e) => handleChange("roteiroBase", e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-black px-2 py-1.5 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-alpha-500 px-4 py-1.5 text-xs font-medium text-black shadow-sm transition hover:bg-alpha-400"
          >
            Criar solicitação
          </button>
        </div>
      </form>

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-neutral-50">Solicitações criadas</h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-300">Filtrar por status:</span>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as typeof filtroStatus)}
              className="h-8 rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="TODOS">Todos</option>
              <option value="ABERTA">Aberta</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDA">Concluída</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10 bg-black/60 text-xs">
          <table className="min-w-full divide-y divide-neutral-900">
            <thead className="bg-black/40">
              <tr>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Cliente
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Squad
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Tipo
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Origem
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Orçamento
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Data limite
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filtradas.map((s) => (
                <tr key={s.id}>
                  <td className="px-3 py-2 text-neutral-50">{s.cliente}</td>
                  <td className="px-3 py-2 text-neutral-300">{s.squad}</td>
                  <td className="px-3 py-2 text-neutral-300">
                    {s.tipoCaptacao === "FOTO"
                      ? "Foto"
                      : s.tipoCaptacao === "VIDEO"
                        ? "Vídeo"
                        : "Foto + Vídeo"}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">
                    {s.origem === "VENDIDA" ? "Vendida" : "Inclusa no contrato"}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">
                    R$
                    {" "}
                    {(s.orcamentoAprovado ?? 0).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">
                    {new Date(s.dataLimite ?? s.prazoEntrega).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">
                    {s.status === "ABERTA"
                      ? "Aberta"
                      : s.status === "EM_ANDAMENTO"
                        ? "Em andamento"
                        : "Concluída"}
                  </td>
                </tr>
              ))}
              {filtradas.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-3 text-center text-[11px] text-neutral-400"
                  >
                    Nenhuma solicitação encontrada para o filtro selecionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
