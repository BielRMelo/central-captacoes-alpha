"use client";

import React, { useEffect, useState } from "react";
import type { CaptureType } from "@/types/capture";

export type FlowJobStatus = "ABERTA" | "EM_ANDAMENTO" | "CONCLUIDA";

export interface FlowSolicitacao {
  id: string;
  cliente: string;
  cidade: string;
  estado: string;
  bairro?: string;
  squad?: string;
  tipoCaptacao: CaptureType;
  descricaoTipo?: string;
  tipoCliente?: string;
  valorReceber?: number;
  origem?: "VENDIDA" | "INCLUSA_CONTRATO";
  orcamentoAprovado?: number;
  dataLimite?: string; // ISO
  dataDesejada: string; // ISO
  prazoEntrega: string; // ISO
  status: FlowJobStatus;
  roteiroBase?: string;
  fotografoId?: string; // quando alguém pegar o job
}

export interface FlowCaptacao {
  id: string;
  solicitacaoId: string;
  cliente: string;
  cidade: string;
  estado: string;
  dataCaptacao: string; // ISO
  tipoCaptacao: CaptureType;
  fotografoId: string;
  status: "EM_ANDAMENTO" | "ENTREGUE" | "CONCLUIDA";
  linksEntrega: string[];
  squad?: string;
  fotografoNome?: string;
  feedbackAccount?: string;
  feedbackCliente?: string;
  notaCliente?: number;
  statusPagamento?: "PENDENTE" | "AGENDADO" | "PAGO";
}

interface FlowState {
  solicitacoes: FlowSolicitacao[];
  captacoes: FlowCaptacao[];
}

let state: FlowState = {
  solicitacoes: [
    {
      id: "flow-sol-1",
      cliente: "Pizzaria La Fornaia",
      cidade: "São Paulo",
      estado: "SP",
      bairro: "Pinheiros",
      squad: "Squad SP Norte",
      tipoCaptacao: "AMBOS",
      descricaoTipo: "Food porn + institucional do ambiente",
      tipoCliente: "Pizzaria",
      valorReceber: 650,
      dataDesejada: new Date().toISOString(),
      prazoEntrega: new Date().toISOString(),
      status: "ABERTA",
      roteiroBase: "Reforçar produtos estrela e ambiente.",
    },
  ],
  captacoes: [],
};

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function getFlowState(): FlowState {
  return state;
}

export function subscribeFlow(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function createSolicitacao(input: Omit<FlowSolicitacao, "id" | "status">) {
  const nova: FlowSolicitacao = {
    ...input,
    id: `flow-sol-${state.solicitacoes.length + 1}`,
    status: "ABERTA",
  };
  state = {
    ...state,
    solicitacoes: [nova, ...state.solicitacoes],
  };
  emit();
}

export function pegarJob(solicitacaoId: string, fotografoId: string) {
  const solicitacao = state.solicitacoes.find((s) => s.id === solicitacaoId);
  if (!solicitacao || solicitacao.status !== "ABERTA") return;

  const atualizada: FlowSolicitacao = {
    ...solicitacao,
    status: "EM_ANDAMENTO",
    fotografoId,
  };

  const captacao: FlowCaptacao = {
    id: `flow-cap-${state.captacoes.length + 1}`,
    solicitacaoId: atualizada.id,
    cliente: atualizada.cliente,
    cidade: atualizada.cidade,
    estado: atualizada.estado,
    dataCaptacao: atualizada.dataDesejada,
    tipoCaptacao: atualizada.tipoCaptacao,
    fotografoId,
    status: "EM_ANDAMENTO",
    linksEntrega: [],
  };

  state = {
    solicitacoes: state.solicitacoes.map((s) => (s.id === atualizada.id ? atualizada : s)),
    captacoes: [captacao, ...state.captacoes],
  };
  emit();
}

export function registrarEntrega(captacaoId: string, link: string) {
  state = {
    ...state,
    captacoes: state.captacoes.map((c) =>
      c.id === captacaoId
        ? {
            ...c,
            status: "ENTREGUE",
            linksEntrega: link ? [...c.linksEntrega, link] : c.linksEntrega,
          }
        : c,
    ),
  };
  emit();
}

export function concluirCaptacao(captacaoId: string) {
  state = {
    ...state,
    captacoes: state.captacoes.map((c) =>
      c.id === captacaoId
        ? {
            ...c,
            status: "CONCLUIDA",
          }
        : c,
    ),
    solicitacoes: state.solicitacoes.map((s) =>
      s.id === state.captacoes.find((c) => c.id === captacaoId)?.solicitacaoId
        ? { ...s, status: "CONCLUIDA" }
        : s,
    ),
  };
  emit();
}

export function useFlowStore<T>(selector: (state: FlowState) => T): T {
  const [slice, setSlice] = useState<T>(() => selector(getFlowState()));

  useEffect(() => {
    const listener = () => {
      setSlice(selector(getFlowState()));
    };
    const unsubscribe = subscribeFlow(listener);
    // também atualiza imediatamente para o caso de o state ter mudado entre renders
    listener();
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return slice;
}
