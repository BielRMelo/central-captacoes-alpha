import { PageHeader } from "@/components/ui/page-header";

const aulas = [
  {
    titulo: "1. Quem é a Alpha e como funciona o processo de captação",
    descricao:
      "Visão geral da empresa, dos squads e de como as captações se conectam com a estratégia dos clientes.",
  },
  {
    titulo: "2. Padrão de material esperado",
    descricao:
      "Orientações sobre enquadramento, luz, formatos de arquivo e exemplos de bons materiais.",
  },
  {
    titulo: "3. Prazos, pagamentos e comunicação",
    descricao:
      "Como funcionam prazos, ajustes, pagamentos e canais oficiais de contato com o time Alpha.",
  },
];

const faq = [
  {
    pergunta: "Quando recebo pelo job?",
    resposta:
      "Após a aprovação final do material pelo time Alpha, seguindo o ciclo de pagamento combinado em contrato.",
  },
  {
    pergunta: "O que acontece se eu atrasar a entrega?",
    resposta:
      "Atrasos impactam diretamente sua nota e posição no ranking, e podem afetar convites para novos jobs.",
  },
  {
    pergunta: "Posso usar as fotos e vídeos no meu portfólio?",
    resposta:
      "Em geral sim, desde que respeitando o contrato com o cliente e a Alpha. Sempre alinhe antes com o time.",
  },
  {
    pergunta: "Como funciona quando o cliente pede refação?",
    resposta:
      "O pedido passa primeiro pelo time Alpha, que alinha o escopo com você e registra o ajuste na plataforma.",
  },
];

export default function FotografoInfoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Info, quem somos e treinamentos"
        subtitle="Entenda a Alpha, o fluxo de captação e acesse conteúdos para elevar a qualidade dos seus jobs."
      />

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <h2 className="text-sm font-semibold text-neutral-50">Quem é a Alpha</h2>
        <p className="text-xs text-neutral-300">
          A Alpha é uma assessoria especializada em comunicação e crescimento para negócios de alimentação.
          A Central de Captações existe para conectar restaurantes e marcas a uma rede de fotógrafos qualificados,
          garantindo padrão visual e previsibilidade de resultado.
        </p>
        <p className="text-xs text-neutral-300">
          Atuamos com squads dedicados, acompanhando clientes em diferentes cidades e estados, sempre buscando
          relações de parceria de longo prazo com os captadores.
        </p>
      </section>

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <h2 className="text-sm font-semibold text-neutral-50">Como funciona o processo de captação</h2>
        <ol className="list-decimal space-y-1 pl-5 text-xs text-neutral-300">
          <li>O time Alpha cria a solicitação de captação com cliente, local, tipo de material e prazo.</li>
          <li>O sistema encontra fotógrafos elegíveis pela região e mostra os jobs na sua aba de Solicitações.</li>
          <li>Você aplica clicando em "Quero pegar esse job".</li>
          <li>O time Alpha escolhe o profissional e envia endereço, roteiro e referências.</li>
          <li>Após a captação, você envia os links de entrega pela plataforma.</li>
          <li>O material é analisado, aprovado ou ajustado e, então, segue para pagamento e avaliação.</li>
        </ol>
      </section>

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <h2 className="text-sm font-semibold text-neutral-50">Área de treinamentos</h2>
        <p className="text-xs text-neutral-300">
          Use estes conteúdos como base para alinhar expectativas, melhorar o material entregue e crescer junto
          com a rede de fotógrafos da Alpha.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {aulas.map((aula) => (
            <div
              key={aula.titulo}
              className="space-y-1 rounded-lg border border-white/10 bg-black/50 p-3"
            >
              <p className="text-xs font-semibold text-neutral-50">{aula.titulo}</p>
              <p className="text-[11px] text-neutral-300">{aula.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm shadow-sm">
        <h2 className="text-sm font-semibold text-neutral-50">FAQ para fotógrafos</h2>
        <div className="space-y-2">
          {faq.map((item) => (
            <details
              key={item.pergunta}
              className="group rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-neutral-300"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 text-neutral-100">
                <span>{item.pergunta}</span>
                <span className="text-xs text-neutral-500 group-open:rotate-90">▶</span>
              </summary>
              <p className="mt-1 text-[11px] text-neutral-300">{item.resposta}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
