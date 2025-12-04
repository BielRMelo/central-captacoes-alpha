"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/animation/MotionSection";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <div className="absolute inset-x-0 -top-40 -z-10 h-80 bg-gradient-to-b from-neutral-900 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Container fullHeight className="flex flex-col justify-center gap-12 py-20">
          <div className="relative">
            {/* Blob decorativo */}
            <motion.div
              className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-alpha-500/40 via-alpha-400/20 to-transparent blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-2xl space-y-4">
              <div className="mb-4 flex items-center gap-4">
                <Image
                  src="/alpha-logo.png"
                  alt="Logo Central de Captações Alpha"
                  width={200}
                  height={80}
                  className="h-auto w-40 sm:w-52"
                  priority
                />
              </div>
              <motion.h1
                className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                Central de Captações Alpha
              </motion.h1>
              <motion.p
                className="max-w-xl text-sm text-neutral-300 sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
              >
                Plataforma para organizar captações de fotos e vídeos para restaurantes, conectando o time
                interno da Alpha à rede de fotógrafos de forma simples, rápida e rastreável.
              </motion.p>

              <motion.div
                className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
              >
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97, y: 0 }}>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/fotografo/solicitacoes">Sou Fotógrafo</Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97, y: 0 }}>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="/admin/dashboard">Sou Time Alpha</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Container>
      </motion.div>

      {/* Para Fotógrafos & Time Alpha */}
      <MotionSection className="pb-12">
        <Container className="space-y-10">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-5 shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wide text-alpha-500">
                Para Fotógrafos
              </h2>
              <p className="text-sm text-neutral-300">
                Tenha uma visão clara dos jobs disponíveis, do seu histórico e do seu desempenho na rede
                Alpha.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                <li>• Receba jobs qualificados na sua região.</li>
                <li>• Centralize entregas, notas e feedbacks em um só lugar.</li>
                <li>• Aumente seu ranking e seja chamado com prioridade.</li>
              </ul>
            </motion.div>

            <motion.div
              className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-5 shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wide text-alpha-500">
                Para o Time Alpha
              </h2>
              <p className="text-sm text-neutral-300">
                Organize todas as captações em um painel único, enxergando status, qualidade e custo por
                job.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                <li>• Crie e distribua solicitações de captação.</li>
                <li>• Acompanhe status e qualidade das entregas.</li>
                <li>• Tenha base para pagamento e controle de custo.</li>
              </ul>
            </motion.div>
          </div>
        </Container>
      </MotionSection>

      {/* Como funciona o fluxo */}
      <MotionSection className="pb-20">
        <Container className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-base font-semibold uppercase tracking-wide text-alpha-500">
              Como funciona o fluxo
            </h2>
            <p className="text-sm text-neutral-300">
              Um fluxo claro de ponta a ponta, para ninguém se perder entre criação do job, captação e
              aprovação.
            </p>
          </div>

          <div className="relative mt-4 grid gap-4 md:grid-cols-5">
            {/* Linha de conexão */}
            <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-alpha-500/40 via-alpha-400/20 to-alpha-500/40 md:block" />

            {[
              {
                step: 1,
                title: "Alpha cria a solicitação",
                text: "O time interno registra o job com cliente, local, tipo de captação e orçamento.",
              },
              {
                step: 2,
                title: "Fotógrafos elegíveis recebem o job",
                text: "O sistema encontra quem atende a região e exibe a solicitação na área do fotógrafo.",
              },
              {
                step: 3,
                title: "Um fotógrafo pega o job",
                text: "O captador interessado clica em 'Quero pegar esse job' e entra na disputa ou é atribuído.",
              },
              {
                step: 4,
                title: "Captação + envio do material",
                text: "Após o dia da captação, o fotógrafo envia os links de entrega pela plataforma.",
              },
              {
                step: 5,
                title: "Alpha aprova, paga e avalia",
                text: "O time revisa o material, aprova, dispara pagamento e registra nota/feedback.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                className="relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm shadow-lg"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-alpha-400">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-alpha-500/50 bg-black/60 text-[11px] text-alpha-300">
                    {item.step}
                  </span>
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-neutral-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </MotionSection>
    </div>
  );
}
