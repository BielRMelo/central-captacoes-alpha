"use client";

import { CaptureRequest } from "@/types/capture";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardJobProps {
  request: CaptureRequest;
  onPick?: (request: CaptureRequest) => void;
}

function formatValor(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("pt-BR");
}

function getStatusLabel(status: CaptureRequest["status"]) {
  switch (status) {
    case "DISPONIVEL":
      return "Disponível";
    case "EM_ANALISE":
      return "Em análise";
    case "INDISPONIVEL":
      return "Indisponível";
    default:
      return status;
  }
}

export function CardJob({ request, onPick }: CardJobProps) {
  const disabled = request.status !== "DISPONIVEL";

  return (
    <Card className="flex flex-col justify-between gap-2 bg-black/50">
      <CardHeader className="flex flex-col gap-1 border-b border-white/5 pb-2 pr-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-semibold text-neutral-50">
              {request.cliente}
            </CardTitle>
            <p className="text-xs text-neutral-400">
              {request.cidade} • {request.bairro} • {request.estado}
            </p>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              request.status === "DISPONIVEL"
                ? "bg-emerald-50 text-emerald-700"
                : request.status === "EM_ANALISE"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-neutral-200 text-neutral-800"
            }`}
          >
            {getStatusLabel(request.status)}
          </span>
        </div>
        <p className="mt-1 text-xs text-neutral-300">{request.descricaoTipo}</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
        <div>
          <p className="text-[11px] uppercase text-neutral-400">Tipo de captação</p>
          <p className="font-medium text-neutral-50">
            {request.tipoCaptacao === "FOTO"
              ? "Foto"
              : request.tipoCaptacao === "VIDEO"
                ? "Vídeo"
                : "Foto + Vídeo"}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase text-neutral-400">Duração estimada</p>
          <p className="font-medium text-neutral-50">{request.duracaoEstimativaHoras}h</p>
        </div>
        <div>
          <p className="text-[11px] uppercase text-neutral-400">Valor a receber</p>
          <p className="font-medium text-emerald-700">{formatValor(request.valorReceber)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase text-neutral-400">Prazo de entrega</p>
          <p className="font-medium text-neutral-50">{formatDate(request.prazoEntrega)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <p className="text-[11px] text-neutral-400">Tipo de cliente: {request.tipoCliente}</p>
        <Button
          size="sm"
          disabled={disabled}
          onClick={() => onPick?.(request)}
        >
          Quero pegar esse job
        </Button>
      </CardFooter>
    </Card>
  );
}
