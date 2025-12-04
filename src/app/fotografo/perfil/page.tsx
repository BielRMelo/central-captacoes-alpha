"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";

interface PerfilDadosPessoais {
  nome: string;
  telefone: string;
  email: string;
  cidadeBase: string;
  cidadesAtende: string;
  raioKm: string;
}

interface PerfilProfissional {
  especialidades: string;
  equipamentos: string;
  portfolio: string;
}

interface PerfilFinanceiro {
  tipoPessoa: "PF" | "PJ";
  dadosBancarios: string;
  pix: string;
  contratoAssinado: boolean;
}

export default function FotografoPerfilPage() {
  const [dadosPessoais, setDadosPessoais] = useState<PerfilDadosPessoais>({
    nome: "Fotógrafo Alpha",
    telefone: "(11) 99999-9999",
    email: "fotografo@example.com",
    cidadeBase: "São Paulo - SP",
    cidadesAtende: "Grande São Paulo",
    raioKm: "30",
  });

  const [profissional, setProfissional] = useState<PerfilProfissional>({
    especialidades: "Food porn, institucional, reels para redes sociais",
    equipamentos: "Câmera full frame, 35mm 1.8, 50mm 1.8, luz contínua, tripé",
    portfolio: "https://instagram.com/seuuser",
  });

  const [financeiro, setFinanceiro] = useState<PerfilFinanceiro>({
    tipoPessoa: "PF",
    dadosBancarios: "Banco XYZ, Ag. 0000, Cc. 00000-0",
    pix: "chave-pix@example.com",
    contratoAssinado: false,
  });

  const [avaliacoes] = useState({
    notaMedia: 4.7,
    totalAvaliacoes: 18,
    comentarios: [
      "Entrega sempre no prazo e material consistente.",
      "Ótima comunicação com o cliente e equipe Alpha.",
      "Capta bem o clima do restaurante nas fotos.",
    ],
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meu perfil"
        subtitle="Centralize aqui seus dados pessoais, profissionais, financeiros e acompanhe suas avaliações."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-50">Dados pessoais</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Nome completo</label>
                <input
                  type="text"
                  value={dadosPessoais.nome}
                  onChange={(e) => setDadosPessoais({ ...dadosPessoais, nome: e.target.value })}
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  value={dadosPessoais.telefone}
                  onChange={(e) =>
                    setDadosPessoais({ ...dadosPessoais, telefone: e.target.value })
                  }
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">E-mail</label>
                <input
                  type="email"
                  value={dadosPessoais.email}
                  onChange={(e) => setDadosPessoais({ ...dadosPessoais, email: e.target.value })}
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Cidade base</label>
                <input
                  type="text"
                  value={dadosPessoais.cidadeBase}
                  onChange={(e) =>
                    setDadosPessoais({ ...dadosPessoais, cidadeBase: e.target.value })
                  }
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-neutral-200">
                  Cidades que atende
                </label>
                <input
                  type="text"
                  value={dadosPessoais.cidadesAtende}
                  onChange={(e) =>
                    setDadosPessoais({ ...dadosPessoais, cidadesAtende: e.target.value })
                  }
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Raio de deslocamento (km)</label>
                <input
                  type="number"
                  value={dadosPessoais.raioKm}
                  onChange={(e) => setDadosPessoais({ ...dadosPessoais, raioKm: e.target.value })}
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-50">Profissional</h2>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Especialidades</label>
                <textarea
                  rows={2}
                  value={profissional.especialidades}
                  onChange={(e) =>
                    setProfissional({ ...profissional, especialidades: e.target.value })
                  }
                  className="w-full rounded-md border border-neutral-700 bg-black px-2 py-1.5 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Equipamentos</label>
                <textarea
                  rows={2}
                  value={profissional.equipamentos}
                  onChange={(e) =>
                    setProfissional({ ...profissional, equipamentos: e.target.value })
                  }
                  className="w-full rounded-md border border-neutral-700 bg-black px-2 py-1.5 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Link de portfólio</label>
                <input
                  type="url"
                  value={profissional.portfolio}
                  onChange={(e) =>
                    setProfissional({ ...profissional, portfolio: e.target.value })
                  }
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-50">Financeiro & documentos</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Tipo</label>
                <select
                  value={financeiro.tipoPessoa}
                  onChange={(e) =>
                    setFinanceiro({ ...financeiro, tipoPessoa: e.target.value as "PF" | "PJ" })
                  }
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                >
                  <option value="PF">Pessoa Física</option>
                  <option value="PJ">Pessoa Jurídica</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-200">Chave Pix</label>
                <input
                  type="text"
                  value={financeiro.pix}
                  onChange={(e) => setFinanceiro({ ...financeiro, pix: e.target.value })}
                  className="h-9 w-full rounded-md border border-neutral-700 bg-black px-2 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-neutral-200">Dados bancários</label>
                <textarea
                  rows={2}
                  value={financeiro.dadosBancarios}
                  onChange={(e) =>
                    setFinanceiro({ ...financeiro, dadosBancarios: e.target.value })
                  }
                  className="w-full rounded-md border border-neutral-700 bg-black px-2 py-1.5 text-xs text-neutral-100 shadow-sm outline-none transition focus:border-alpha-500 focus:ring-1 focus:ring-alpha-500"
                />
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  id="contrato-assinado"
                  type="checkbox"
                  checked={financeiro.contratoAssinado}
                  onChange={(e) =>
                    setFinanceiro({ ...financeiro, contratoAssinado: e.target.checked })
                  }
                  className="h-3.5 w-3.5 rounded border-neutral-700 bg-black text-alpha-500 focus:ring-alpha-500"
                />
                <label htmlFor="contrato-assinado" className="text-xs text-neutral-200">
                  Contrato com a Alpha assinado
                </label>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-3 rounded-xl border border-white/10 bg-black/50 p-4 text-sm shadow-sm">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase text-neutral-400">Avaliações</p>
            <p className="text-3xl font-semibold text-alpha-500">
              {avaliacoes.notaMedia.toFixed(1)}
              <span className="ml-1 text-sm text-neutral-400">/ 5</span>
            </p>
            <p className="text-xs text-neutral-400">
              Baseado em {avaliacoes.totalAvaliacoes} avaliações
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-neutral-200">Comentários recentes</p>
            <ul className="space-y-2 text-xs text-neutral-300">
              {avaliacoes.comentarios.map((c) => (
                <li
                  key={c}
                  className="rounded-md border border-white/5 bg-black/40 px-2 py-1.5"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
