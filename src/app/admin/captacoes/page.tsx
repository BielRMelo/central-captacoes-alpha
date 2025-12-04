"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { concluirCaptacao, useFlowStore } from "@/state/flowStore";

type AdminCaptureStatus = "EM_ANDAMENTO" | "ENTREGUE" | "CONCLUIDA";

export default function AdminCaptacoesPage() {
  const captacoes = useFlowStore((s) => s.captacoes);
  const [filtroCliente, setFiltroCliente] = useState("TODOS");
  const [filtroSquad, setFiltroSquad] = useState("TODOS");
  const [filtroFotografo, setFiltroFotografo] = useState("TODOS");
  const [filtroStatus, setFiltroStatus] = useState<"TODOS" | AdminCaptureStatus>("TODOS");
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");

  const clientes = useMemo(
    () => Array.from(new Set(captacoes.map((c) => c.cliente))),
    [captacoes],
  );
  const squads = useMemo(
    () => Array.from(new Set(captacoes.map((c) => c.solicitacaoId))),
    [captacoes],
  );
  const fotografos = useMemo(
    () => Array.from(new Set(captacoes.map((c) => c.fotografoId))),
    [captacoes],
  );

  const filtradas = useMemo(() => {
    return captacoes.filter((c) => {
      if (filtroCliente !== "TODOS" && c.cliente !== filtroCliente) return false;
      if (filtroSquad !== "TODOS" && c.solicitacaoId !== filtroSquad) return false;
      if (filtroFotografo !== "TODOS" && c.fotografoId !== filtroFotografo) return false;
      if (filtroStatus !== "TODOS" && c.status !== filtroStatus) return false;

      if (filtroDataInicio) {
        const inicio = new Date(filtroDataInicio).setHours(0, 0, 0, 0);
        const data = new Date(c.dataCaptacao).setHours(0, 0, 0, 0);
        if (data < inicio) return false;
      }

      if (filtroDataFim) {
        const fim = new Date(filtroDataFim).setHours(23, 59, 59, 999);
        const data = new Date(c.dataCaptacao).getTime();
        if (data > fim) return false;
      }

      return true;
    });
  }, [captacoes, filtroCliente, filtroSquad, filtroFotografo, filtroStatus, filtroDataInicio, filtroDataFim]);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR");
  }

  function formatStatus(status: AdminCaptureStatus) {
    switch (status) {
      case "CONCLUIDA":
        return "Concluída";
      case "ENTREGUE":
        return "Entregue";
      case "EM_ANDAMENTO":
      default:
        return "Em andamento";
    }
  }

  function formatPagamento(status: "PENDENTE" | "AGENDADO" | "PAGO" | undefined) {
    if (status === "AGENDADO") return "Agendado";
    if (status === "PAGO") return "Pago";
    return "Pendente";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Captações realizadas"
        subtitle="Acompanhe captações por cliente, squad e fotógrafo, incluindo feedbacks e status de pagamento."
      />

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-neutral-50">Filtros</h2>
          <p className="text-[11px] text-neutral-400">
            Combine cliente, squad, fotógrafo, status e período para investigar operações específicas.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Cliente</label>
            <select
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="TODOS">Todos</option>
              {clientes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Squad</label>
            <select
              value={filtroSquad}
              onChange={(e) => setFiltroSquad(e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="TODOS">Todos</option>
              {squads.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Fotógrafo</label>
            <select
              value={filtroFotografo}
              onChange={(e) => setFiltroFotografo(e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="TODOS">Todos</option>
              {fotografos.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as typeof filtroStatus)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="TODOS">Todos</option>
              <option value="PENDENTE">Pendente</option>
              <option value="EM_PROCESSAMENTO">Em processamento</option>
              <option value="CONCLUIDA">Concluída</option>
              <option value="PAGA">Paga</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Período</label>
            <div className="flex gap-1">
              <input
                type="date"
                value={filtroDataInicio}
                onChange={(e) => setFiltroDataInicio(e.target.value)}
                className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-[11px] text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
              />
              <span className="self-center text-[10px] text-neutral-500">até</span>
              <input
                type="date"
                value={filtroDataFim}
                onChange={(e) => setFiltroDataFim(e.target.value)}
                className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-[11px] text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-neutral-50">Captações</h2>
          <p className="text-[11px] text-neutral-400">
            Visão consolidada das captações, com feedbacks do account, cliente e situação de pagamento.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/60 text-xs">
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
                  Fotógrafo
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Cidade
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Data
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Feedback account
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Feedback cliente
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Nota
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Links de entrega
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Pagamento
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filtradas.map((c) => (
                <tr key={c.id}>
                  <td className="px-3 py-2 text-neutral-50">{c.cliente}</td>
                  <td className="px-3 py-2 text-neutral-300">{c.squad}</td>
                  <td className="px-3 py-2 text-neutral-300">
                    {c.fotografoNome || c.fotografoId}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">{c.cidade}</td>
                  <td className="px-3 py-2 text-neutral-300">{formatDate(c.dataCaptacao)}</td>
                  <td className="px-3 py-2 text-neutral-300">{formatStatus(c.status)}</td>
                  <td className="px-3 py-2 text-neutral-300 max-w-xs break-words">
                    {c.feedbackAccount || "—"}
                  </td>
                  <td className="px-3 py-2 text-neutral-300 max-w-xs break-words">
                    {c.feedbackCliente || "—"}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">
                    {typeof c.notaCliente === "number" ? `${c.notaCliente.toFixed(1)}/5` : "—" }
                  </td>
                  <td className="px-3 py-2 text-neutral-300">
                    {c.linksEntrega.length > 0 ? (
                      <ul className="space-y-0.5">
                        {c.linksEntrega.map((link) => (
                          <li key={link}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="underline underline-offset-2"
                            >
                              abrir
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">{formatPagamento(c.statusPagamento)}</td>
                </tr>
              ))}
              {filtradas.length === 0 && (
                <tr>
                  <td
                    colSpan={11}
                    className="px-3 py-3 text-center text-[11px] text-neutral-400"
                  >
                    Nenhuma captação encontrada para o filtro selecionado.
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
