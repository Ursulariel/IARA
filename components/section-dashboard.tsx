import Link from "next/link"
import { AltArrowRightIcon } from "@solar-icons/react/outline/alt-arrow-right"

import {
  AnalyticsIllustration,
  ClassroomIllustration,
  type PaletteName,
  TextDocumentIllustration,
} from "@/components/document-card-illustrations"

type DashboardSection = "turmas" | "avaliacoes" | "planejamentos" | "analises"

type DashboardCard = {
  title: string
  detail: string
  badge: string
  palette: PaletteName
  type: "document" | "analysis" | "classroom"
  letter?: string
}

const dashboardContent: Record<
  DashboardSection,
  {
    title: string
    description: string
    action: string
    actionHref: string
    metricLabel: string
    metrics: Array<{ value: string; label: string }>
    cardsTitle: string
    cards: DashboardCard[]
  }
> = {
  turmas: {
    title: "Suas turmas",
    description:
      "Acompanhe as turmas, organize atividades e identifique os próximos passos de cada grupo.",
    action: "Criar turma",
    actionHref: "/inicio#turmas",
    metricLabel: "Panorama das turmas",
    metrics: [
      { value: "5", label: "turmas ativas" },
      { value: "118", label: "estudantes" },
      { value: "92%", label: "participação média" },
    ],
    cardsTitle: "Turmas em acompanhamento",
    cards: [
      { title: "1º ano A", detail: "24 estudantes", badge: "Turma", palette: "orange-light", type: "classroom", letter: "A" },
      { title: "2º ano A", detail: "23 estudantes", badge: "Turma", palette: "blue-deep", type: "classroom", letter: "A" },
      { title: "1º ano B", detail: "25 estudantes", badge: "Turma", palette: "orange-deep", type: "classroom", letter: "B" },
      { title: "2º ano B", detail: "22 estudantes", badge: "Turma", palette: "blue-light", type: "classroom", letter: "B" },
    ],
  },
  avaliacoes: {
    title: "Avaliações",
    description:
      "Crie instrumentos de avaliação e acompanhe evidências de aprendizagem por turma.",
    action: "Criar avaliação",
    actionHref: "/inicio#crie-uma-avaliacao",
    metricLabel: "Panorama das avaliações",
    metrics: [
      { value: "5", label: "avaliações em andamento" },
      { value: "2", label: "aguardando aplicação" },
      { value: "78%", label: "aprendizagens consolidadas" },
    ],
    cardsTitle: "Avaliações recentes",
    cards: [
      { title: "Avaliação diagnóstica de leitura", detail: "1º ano A · pronta para aplicar", badge: "Avaliação", palette: "orange-light", type: "document" },
      { title: "Compreensão de textos curtos", detail: "2º ano A · em revisão", badge: "Avaliação", palette: "blue-deep", type: "document" },
      { title: "Leitura de palavras e sílabas", detail: "1º ano B · aplicada hoje", badge: "Avaliação", palette: "orange-deep", type: "document" },
      { title: "Convenções da escrita", detail: "2º ano B · pronta para aplicar", badge: "Avaliação", palette: "blue-light", type: "document" },
    ],
  },
  planejamentos: {
    title: "Planejamentos de aula",
    description:
      "Centralize os planos, mantenha a sequência didática visível e prepare a próxima aula com a IARA.",
    action: "Criar planejamento",
    actionHref: "/inicio",
    metricLabel: "Panorama dos planejamentos",
    metrics: [
      { value: "5", label: "planos criados" },
      { value: "3", label: "para esta semana" },
      { value: "4", label: "atividades vinculadas" },
    ],
    cardsTitle: "Planejamentos recentes",
    cards: [
      { title: "Leitura compartilhada: fábulas", detail: "1º ano A · atualizado hoje", badge: "Planejamento", palette: "orange-light", type: "document" },
      { title: "Rimas e aliterações", detail: "2º ano A · atualizado há 4 dias", badge: "Planejamento", palette: "blue-deep", type: "document" },
      { title: "Sequência de leitura: parlendas", detail: "1º ano B · atualizado ontem", badge: "Planejamento", palette: "orange-deep", type: "document" },
      { title: "Roda de conversa literária", detail: "2º ano B · atualizado na semana passada", badge: "Planejamento", palette: "blue-light", type: "document" },
    ],
  },
  analises: {
    title: "Análises",
    description:
      "Transforme registros e resultados em uma leitura clara para orientar suas decisões pedagógicas.",
    action: "Criar análise",
    actionHref: "/inicio",
    metricLabel: "Panorama das análises",
    metrics: [
      { value: "4", label: "análises disponíveis" },
      { value: "2", label: "pontos de atenção" },
      { value: "82%", label: "engajamento médio" },
    ],
    cardsTitle: "Análises recentes",
    cards: [
      { title: "Mapa de conceitos", detail: "1º ano A · atualizado hoje", badge: "Análise", palette: "orange-light", type: "analysis" },
      { title: "Evolução da leitura", detail: "2º ano A · atualizado ontem", badge: "Análise", palette: "blue-deep", type: "analysis" },
      { title: "Participação nas atividades", detail: "1º ano B · atualizado há 2 dias", badge: "Análise", palette: "orange-deep", type: "analysis" },
      { title: "Progresso da turma", detail: "2º ano B · atualizado na semana passada", badge: "Análise", palette: "blue-light", type: "analysis" },
    ],
  },
}

export function SectionDashboard({ section }: { section: DashboardSection }) {
  const content = dashboardContent[section]

  return (
    <main className="relative min-h-full overflow-hidden px-6 py-5 sm:py-7 lg:py-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{
          background:
            "linear-gradient(to right, #ffedd5 0%, #fff7ed 44%, #eff6ff 56%, #dbeafe 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 58%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 58%, transparent 100%)",
        }}
      />
      <div className="relative space-y-9">
        <section className="py-3 sm:py-5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {content.title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                {content.description}
              </p>
            </div>
            <Link
              href={content.actionHref}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              <span className="text-lg leading-none">+</span>
              {content.action}
            </Link>
          </div>
        </section>

        <section aria-label={content.metricLabel}>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.metrics.map((metric) => (
              <article key={metric.label} className="rounded-2xl bg-gradient-to-br from-orange-600 to-orange-400 p-5">
                <p className="font-heading text-3xl font-semibold tracking-tight text-white">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-white/85">{metric.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby={`${section}-recentes`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 id={`${section}-recentes`} className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              {content.cardsTitle}
            </h2>
            <Link
              href="/inicio"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 transition-colors hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Ver no início
              <AltArrowRightIcon size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {content.cards.map((card) => (
              <DashboardCard key={card.title} card={card} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function DashboardCard({ card }: { card: DashboardCard }) {
  return (
    <Link
      href={`/conteudo/${slugify(card.title)}`}
      aria-label={`Abrir ${card.title}`}
      className="group relative isolate flex min-h-64 flex-col overflow-hidden rounded-[24px] bg-neutral-100 p-5 outline-none focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="relative z-10 inline-flex w-fit rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
        {card.badge}
      </span>
      <DashboardIllustration card={card} />
      <div className="relative z-10 mt-auto">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{card.title}</h3>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{card.detail}</p>
      </div>
    </Link>
  )
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function DashboardIllustration({ card }: { card: DashboardCard }) {
  const className = "pointer-events-none absolute top-12 left-1/2 h-40 w-52 -translate-x-1/2"

  if (card.type === "classroom") {
    return <ClassroomIllustration letter={card.letter ?? "A"} palette={card.palette} className={className} />
  }

  if (card.type === "analysis") {
    return <AnalyticsIllustration palette={card.palette} className={className} />
  }

  return <TextDocumentIllustration palette={card.palette} className={className} />
}
