import { CaptureJob } from "@/types/capture";

export const mockCaptureJobs: CaptureJob[] = [
  {
    id: "job-1",
    cliente: "Pizzaria La Fornaia",
    cidade: "São Paulo",
    estado: "SP",
    dataCaptacao: new Date().toISOString(),
    tipoCaptacao: "AMBOS",
    status: "CONCLUIDO",
    nota: 5,
    feedbackCliente: "Fotos incríveis, captaram bem o ambiente!",
    linksEntrega: [
      "https://drive.google.com/example-fotos",
      "https://drive.google.com/example-videos",
    ],
    feedbackInterno:
      "Cumpriu roteiro, chegou no horário e entregou antes do prazo. Material bem organizado.",
  },
  {
    id: "job-2",
    cliente: "Burger House",
    cidade: "São Paulo",
    estado: "SP",
    dataCaptacao: new Date().toISOString(),
    tipoCaptacao: "FOTO",
    status: "AGUARDANDO_APROVACAO",
    nota: 4,
    feedbackCliente: "Gostamos bastante, talvez ajustar algumas composições.",
    linksEntrega: ["https://wetransfer.com/example-burger"],
    feedbackInterno: "Material bom, mas precisou de uma rodada de ajustes de enquadramento.",
  },
  {
    id: "job-3",
    cliente: "Restaurante Dona Maria",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    dataCaptacao: new Date().toISOString(),
    tipoCaptacao: "VIDEO",
    status: "AJUSTES_SOLICITADOS",
    linksEntrega: ["https://drive.google.com/example-dona-maria"],
    feedbackInterno: "Regravar alguns trechos de áudio, ruído alto no salão.",
  },
];
