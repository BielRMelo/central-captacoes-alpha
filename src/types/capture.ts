export type CaptureType = "FOTO" | "VIDEO" | "AMBOS";

export type CaptureStatusRequest = "DISPONIVEL" | "EM_ANALISE" | "INDISPONIVEL";

export interface CaptureRequest {
  id: string;
  cliente: string;
  cidade: string;
  estado: string;
  bairro: string;
  tipoCaptacao: CaptureType;
  descricaoTipo: string;
  tipoCliente: string;
  duracaoEstimativaHoras: number;
  valorReceber: number;
  prazoEntrega: string; // ISO date
  dataDesejada: string; // ISO date
  status: CaptureStatusRequest;
}

export type CaptureJobStatus = "CONCLUIDO" | "AGUARDANDO_APROVACAO" | "AJUSTES_SOLICITADOS";

export interface CaptureJob {
  id: string;
  cliente: string;
  cidade: string;
  estado: string;
  dataCaptacao: string; // ISO date
  tipoCaptacao: CaptureType;
  status: CaptureJobStatus;
  nota?: number; // 1-5
  feedbackCliente?: string;
  linksEntrega: string[];
  feedbackInterno?: string;
}
