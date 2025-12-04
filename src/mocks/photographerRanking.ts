export interface PhotographerRanking {
  id: string;
  nome: string;
  cidade: string;
  captacoesRealizadas: number;
  notaMedia: number;
  entregasNoPrazoPct: number; // 0-100
}

export interface PhotographerRankingWithScore extends PhotographerRanking {
  score: number;
}

export function calcularScore(r: PhotographerRanking): number {
  let score = r.captacoesRealizadas * 10;

  if (r.notaMedia > 4.5) {
    score += 20;
  }

  if (r.entregasNoPrazoPct === 100) {
    score += 15;
  }

  return score;
}

export const mockRankingGeral: PhotographerRanking[] = [
  {
    id: "ph-1",
    nome: "Ana Souza",
    cidade: "São Paulo - SP",
    captacoesRealizadas: 42,
    notaMedia: 4.8,
    entregasNoPrazoPct: 100,
  },
  {
    id: "ph-2",
    nome: "Carlos Lima",
    cidade: "Rio de Janeiro - RJ",
    captacoesRealizadas: 35,
    notaMedia: 4.6,
    entregasNoPrazoPct: 95,
  },
  {
    id: "ph-3",
    nome: "Bruna Martins",
    cidade: "Curitiba - PR",
    captacoesRealizadas: 27,
    notaMedia: 4.4,
    entregasNoPrazoPct: 98,
  },
  {
    id: "ph-4",
    nome: "Diego Ferreira",
    cidade: "Belo Horizonte - MG",
    captacoesRealizadas: 18,
    notaMedia: 4.2,
    entregasNoPrazoPct: 92,
  },
];

export const mockRankingMensal: PhotographerRanking[] = [
  {
    id: "ph-1",
    nome: "Ana Souza",
    cidade: "São Paulo - SP",
    captacoesRealizadas: 6,
    notaMedia: 4.9,
    entregasNoPrazoPct: 100,
  },
  {
    id: "ph-3",
    nome: "Bruna Martins",
    cidade: "Curitiba - PR",
    captacoesRealizadas: 5,
    notaMedia: 4.7,
    entregasNoPrazoPct: 100,
  },
  {
    id: "ph-5",
    nome: "Eduardo Santos",
    cidade: "Porto Alegre - RS",
    captacoesRealizadas: 4,
    notaMedia: 4.5,
    entregasNoPrazoPct: 90,
  },
];
