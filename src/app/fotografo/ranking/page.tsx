"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import {
  calcularScore,
  mockRankingGeral,
  mockRankingMensal,
  type PhotographerRankingWithScore,
} from "@/mocks/photographerRanking";

type Tab = "geral" | "mensal";

export default function FotografoRankingPage() {
  const [tab, setTab] = useState<Tab>("geral");

  const data: PhotographerRankingWithScore[] = useMemo(() => {
    const base = tab === "geral" ? mockRankingGeral : mockRankingMensal;
    return base
      .map((r) => ({ ...r, score: calcularScore(r) }))
      .sort((a, b) => b.score - a.score);
  }, [tab]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ranking de captadores"
        subtitle="Veja como você se compara a outros fotógrafos na rede Alpha, no geral e no mês atual."
      />

      <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1 text-xs shadow-sm">
        <button
          type="button"
          onClick={() => setTab("geral")}
          className={`rounded-full px-3 py-1 ${tab === "geral" ? "bg-alpha-500 text-black shadow-sm" : "text-neutral-400"}`}
        >
          Ranking geral
        </button>
        <button
          type="button"
          onClick={() => setTab("mensal")}
          className={`rounded-full px-3 py-1 ${tab === "mensal" ? "bg-alpha-500 text-black shadow-sm" : "text-neutral-400"}`}
        >
          Ranking do mês
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50 text-sm shadow-sm">
        <table className="min-w-full divide-y divide-neutral-900">
          <thead className="bg-black/40">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                #
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Fotógrafo
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Cidade
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Captações
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Nota média
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Entregas no prazo
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {data.map((item, index) => (
              <tr key={item.id} className={index === 0 ? "bg-black/50" : undefined}>
                <td className="px-3 py-2 text-xs font-semibold text-neutral-400">{index + 1}</td>
                <td className="px-3 py-2 text-xs font-medium text-neutral-50">
                  {item.nome}
                </td>
                <td className="px-3 py-2 text-xs text-neutral-300">{item.cidade}</td>
                <td className="px-3 py-2 text-xs text-neutral-300">
                  {item.captacoesRealizadas}
                </td>
                <td className="px-3 py-2 text-xs text-neutral-300">
                  {item.notaMedia.toFixed(1)}
                </td>
                <td className="px-3 py-2 text-xs text-neutral-300">
                  {item.entregasNoPrazoPct}%
                </td>
                <td className="px-3 py-2 text-xs font-semibold text-alpha-700 dark:text-alpha-300">
                  {item.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
