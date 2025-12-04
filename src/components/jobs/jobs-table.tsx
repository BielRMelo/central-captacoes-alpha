"use client";

import { useState } from "react";
import type { CaptureJob } from "@/types/capture";
import { Button } from "@/components/ui/button";

interface JobsTableProps {
  jobs: CaptureJob[];
  onRegistrarEntrega?: (jobId: string, link: string) => void;
}

function getStatusLabel(status: CaptureJob["status"]) {
  switch (status) {
    case "CONCLUIDO":
      return "Concluído";
    case "AGUARDANDO_APROVACAO":
      return "Aguardando aprovação";
    case "AJUSTES_SOLICITADOS":
      return "Ajustes solicitados";
    default:
      return status;
  }
}

function formatDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("pt-BR");
}

function Stars({ value = 0 }: { value?: number }) {
  const max = 5;
  return (
    <div className="flex gap-0.5 text-[11px] text-amber-500">
      {Array.from({ length: max }).map((_, index) => (
        <span key={index}>{index < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export function JobsTable({ jobs, onRegistrarEntrega }: JobsTableProps) {
  const [selected, setSelected] = useState<CaptureJob | null>(null);
  const [linkEntrega, setLinkEntrega] = useState("");

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50 text-sm shadow-sm">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-black/40">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Cliente
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Data
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Tipo
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Status
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Nota
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                Feedback do cliente
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="cursor-pointer hover:bg-black/60"
                onClick={() => setSelected(job)}
              >
                <td className="px-3 py-2 text-xs font-medium text-neutral-50">
                  {job.cliente}
                </td>
                <td className="px-3 py-2 text-xs text-neutral-300">
                  {formatDate(job.dataCaptacao)}
                </td>
                <td className="px-3 py-2 text-xs text-neutral-300">
                  {job.tipoCaptacao === "FOTO"
                    ? "Foto"
                    : job.tipoCaptacao === "VIDEO"
                      ? "Vídeo"
                      : "Foto + Vídeo"}
                </td>
                <td className="px-3 py-2 text-xs text-neutral-300">
                  {getStatusLabel(job.status)}
                </td>
                <td className="px-3 py-2">
                  <Stars value={job.nota} />
                </td>
                <td className="px-3 py-2 text-xs text-neutral-300">
                  {job.feedbackCliente || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && (
          <p className="px-3 py-4 text-xs text-neutral-400">
            Nenhuma captação realizada encontrada.
          </p>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-black p-4 text-sm shadow-xl">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Detalhes da captação
                </p>
                <h2 className="text-base font-semibold text-neutral-50">
                  {selected.cliente}
                </h2>
                <p className="text-xs text-neutral-400">
                  {formatDate(selected.dataCaptacao)} • {selected.cidade} - {selected.estado}
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={() => setSelected(null)}>
                Fechar
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-medium uppercase text-neutral-400">
                  Links de entrega
                </p>
                {selected.linksEntrega.length > 0 ? (
                  <ul className="mt-1 space-y-1 text-xs text-alpha-700 dark:text-alpha-300">
                    {selected.linksEntrega.map((link) => (
                      <li key={link}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-2"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-xs text-neutral-400">Nenhum link informado.</p>
                )}
                {onRegistrarEntrega && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="url"
                      value={linkEntrega}
                      onChange={(e) => setLinkEntrega(e.target.value)}
                      placeholder="Cole aqui o link de entrega"
                      className="h-8 flex-1 rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 outline-none focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                    />
                    <Button
                      size="sm"
                      disabled={!linkEntrega}
                      onClick={() => {
                        onRegistrarEntrega(selected.id, linkEntrega);
                        setLinkEntrega("");
                      }}
                    >
                      Registrar
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase text-neutral-400">
                  Feedback interno da Alpha
                </p>
                <p className="mt-1 text-xs text-neutral-300">
                  {selected.feedbackInterno || "Nenhum feedback registrado."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
