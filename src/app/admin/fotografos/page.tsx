"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";

type StatusFotografo = "ATIVO" | "BLOQUEADO" | "DESTAQUE";

interface AdminFotografoRow {
  id: string;
  nome: string;
  cidade: string;
  regiao: string;
  notaMedia: number;
  jobsRealizados: number;
  entregasNoPrazoPct: number;
  status: StatusFotografo;
}

const mockFotografos: AdminFotografoRow[] = [
  {
    id: "ph-1",
    nome: "Ana Souza",
    cidade: "São Paulo - SP",
    regiao: "SP Capital",
    notaMedia: 4.8,
    jobsRealizados: 42,
    entregasNoPrazoPct: 100,
    status: "DESTAQUE",
  },
  {
    id: "ph-2",
    nome: "Carlos Lima",
    cidade: "São Paulo - SP",
    regiao: "SP Sul",
    notaMedia: 4.6,
    jobsRealizados: 35,
    entregasNoPrazoPct: 95,
    status: "ATIVO",
  },
  {
    id: "ph-3",
    nome: "Bruna Martins",
    cidade: "Curitiba - PR",
    regiao: "Sul",
    notaMedia: 4.4,
    jobsRealizados: 27,
    entregasNoPrazoPct: 98,
    status: "ATIVO",
  },
  {
    id: "ph-4",
    nome: "Diego Ferreira",
    cidade: "Belo Horizonte - MG",
    regiao: "Sudeste",
    notaMedia: 4.1,
    jobsRealizados: 18,
    entregasNoPrazoPct: 90,
    status: "BLOQUEADO",
  },
];

export default function AdminFotografosPage() {
  const [fotografos, setFotografos] = useState<AdminFotografoRow[]>(mockFotografos);
  const [filtroRegiao, setFiltroRegiao] = useState("TODAS");
  const [filtroStatus, setFiltroStatus] = useState<"TODOS" | StatusFotografo>("TODOS");
  const [filtroNotaMin, setFiltroNotaMin] = useState(0);
  const [filtroJobsMin, setFiltroJobsMin] = useState(0);

  const regioes = useMemo(
    () => Array.from(new Set(mockFotografos.map((f) => f.regiao))),
    [],
  );

  const filtrados = useMemo(() => {
    return fotografos.filter((f) => {
      if (filtroRegiao !== "TODAS" && f.regiao !== filtroRegiao) return false;
      if (filtroStatus !== "TODOS" && f.status !== filtroStatus) return false;
      if (f.notaMedia < filtroNotaMin) return false;
      if (f.jobsRealizados < filtroJobsMin) return false;
      return true;
    });
  }, [fotografos, filtroRegiao, filtroStatus, filtroNotaMin, filtroJobsMin]);

  function atualizarStatus(id: string, status: StatusFotografo) {
    setFotografos((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status,
            }
          : f,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fotógrafos"
        subtitle="Gerencie a base de fotógrafos, filtros por região, nota e quantidade de jobs, além de destacar ou bloquear perfis."
      />

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-neutral-50">Filtros</h2>
          <p className="text-[11px] text-neutral-400">
            Encontre rapidamente fotógrafos por região, performance e volume de jobs.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Região</label>
            <select
              value={filtroRegiao}
              onChange={(e) => setFiltroRegiao(e.target.value)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            >
              <option value="TODAS">Todas</option>
              {regioes.map((r) => (
                <option key={r} value={r}>
                  {r}
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
              <option value="ATIVO">Ativo</option>
              <option value="DESTAQUE">Destaque</option>
              <option value="BLOQUEADO">Bloqueado</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Nota mínima</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={filtroNotaMin}
              onChange={(e) => setFiltroNotaMin(Number(e.target.value) || 0)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-200">Mínimo de jobs</label>
            <input
              type="number"
              min={0}
              value={filtroJobsMin}
              onChange={(e) => setFiltroJobsMin(Number(e.target.value) || 0)}
              className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-neutral-50">Base de fotógrafos</h2>
          <p className="text-[11px] text-neutral-400">
            Ações aqui afetam apenas o estado local (mock). Integrações com backend virão depois.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/60 text-xs">
          <table className="min-w-full divide-y divide-neutral-900">
            <thead className="bg-black/40">
              <tr>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Fotógrafo
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Cidade / região
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Nota média
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Jobs realizados
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Entregas no prazo
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-neutral-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filtrados.map((f) => (
                <tr key={f.id}>
                  <td className="px-3 py-2 text-neutral-50">{f.nome}</td>
                  <td className="px-3 py-2 text-neutral-300">
                    {f.cidade} • {f.regiao}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">{f.notaMedia.toFixed(1)}</td>
                  <td className="px-3 py-2 text-neutral-300">{f.jobsRealizados}</td>
                  <td className="px-3 py-2 text-neutral-300">{f.entregasNoPrazoPct}%</td>
                  <td className="px-3 py-2 text-neutral-300">
                    {f.status === "ATIVO"
                      ? "Ativo"
                      : f.status === "DESTAQUE"
                        ? "Destaque"
                        : "Bloqueado"}
                  </td>
                  <td className="px-3 py-2 text-neutral-300">
                    <div className="flex flex-wrap gap-1">
                      <button
                        type="button"
                        onClick={() => atualizarStatus(f.id, "ATIVO")}
                        className="rounded-md border border-neutral-600 px-2 py-0.5 text-[11px] text-neutral-100 hover:border-alpha-500"
                      >
                        Ativar
                      </button>
                      <button
                        type="button"
                        onClick={() => atualizarStatus(f.id, "BLOQUEADO")}
                        className="rounded-md border border-red-500/60 px-2 py-0.5 text-[11px] text-red-200 hover:border-red-400"
                      >
                        Bloquear
                      </button>
                      <button
                        type="button"
                        onClick={() => atualizarStatus(f.id, "DESTAQUE")}
                        className="rounded-md border border-amber-400/70 px-2 py-0.5 text-[11px] text-amber-200 hover:border-amber-300"
                      >
                        Destacar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-3 text-center text-[11px] text-neutral-400"
                  >
                    Nenhum fotógrafo encontrado para o filtro selecionado.
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
