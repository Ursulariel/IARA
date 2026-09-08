"use client"

import { useState } from "react"
import type {
  ComponentType,
  ElementType,
  KeyboardEvent,
  ReactNode,
} from "react"
import Link from "next/link"
import { CalendarAddIcon } from "@solar-icons/react/bold/calendar-add"
import { ChartSquareIcon } from "@solar-icons/react/bold/chart-square"
import { ChatRoundIcon } from "@solar-icons/react/bold/chat-round"
import { DocumentAddIcon } from "@solar-icons/react/bold/document-add"
import { DocumentsIcon } from "@solar-icons/react/bold/documents"
import { NotebookIcon } from "@solar-icons/react/bold/notebook"
import { UserCircleIcon } from "@solar-icons/react/bold/user-circle"
import { DiplomaIcon } from "@solar-icons/react/bold/diploma"
import { PlaneIcon } from "@solar-icons/react/bold/plane"
import { AltArrowLeftIcon } from "@solar-icons/react/outline/alt-arrow-left"
import { AltArrowRightIcon } from "@solar-icons/react/outline/alt-arrow-right"
import { HomeIcon } from "@solar-icons/react/outline/home"
import { WidgetIcon } from "@solar-icons/react/outline/widget"
import { cn } from "cn"

import {
  ChallengeTrailMaterialIllustration,
  ConceptMapMaterialIllustration,
  DebateGuideMaterialIllustration,
  ReadingJournalMaterialIllustration,
  WordSearchMaterialIllustration,
} from "@/components/home-material-illustrations"
import { ClassroomIllustration } from "@/components/classroom-illustration"
import {
  ContextualActivityIllustration,
  type ActivityTemplateId,
} from "@/components/contextual-activity-illustrations"
import { ModelExplorer } from "@/components/model-explorer"
import {
  DebatePlanIllustration,
  FractionsPlanIllustration,
  GeometryPlanIllustration,
  ReadingPlanIllustration,
  WritingPlanIllustration,
} from "@/components/plan-illustrations"
import { useHorizontalCarousel } from "@/hooks/use-horizontal-carousel"

type Action = {
  title: string
  icon: ElementType
  color: string
}

type View = "inicio" | "modelos"

type MaterialMock = {
  title: string
  kind: string
  Illustration: ComponentType<{ className?: string }>
  background: string
}

type Classroom = {
  name: string
  background: string
  accent: string
  softAccent: string
}

type PlanningMock = {
  title: string
  subject: string
  classroom: string
  updatedAt: string
  Illustration: ComponentType<{ className?: string }>
  background: string
}

type AssessmentMock = {
  title: string
  subject: "Língua Portuguesa" | "Redação" | "Matemática"
  classroom: string
  schoolYear: string
  templateId: ActivityTemplateId
  background: string
}

const actions: Action[] = [
  {
    title: "Planejamento de aula",
    icon: CalendarAddIcon,
    color: "#2563eb",
  },
  {
    title: "Criar avaliação",
    icon: DocumentAddIcon,
    color: "#ea580c",
  },
  {
    title: "Copiloto pedagógico",
    icon: NotebookIcon,
    color: "#2563eb",
  },
  {
    title: "Avaliações e insights de aprendizagem",
    icon: ChartSquareIcon,
    color: "#ea580c",
  },
  {
    title: "Jornada do estudante e personalização",
    icon: UserCircleIcon,
    color: "#2563eb",
  },
  {
    title: "Evidências e documentação",
    icon: DocumentsIcon,
    color: "#ea580c",
  },
  {
    title: "Desenvolvimento profissional",
    icon: DiplomaIcon,
    color: "#2563eb",
  },
]

const materialMocks: MaterialMock[] = [
  {
    title: "Mapa de conceitos",
    kind: "Quadro branco",
    Illustration: ConceptMapMaterialIllustration,
    background: "#E5F0FF",
  },
  {
    title: "Caça-palavras temático",
    kind: "Folha para impressão",
    Illustration: WordSearchMaterialIllustration,
    background: "#FCE7F3",
  },
  {
    title: "Trilha de desafios",
    kind: "Jogo",
    Illustration: ChallengeTrailMaterialIllustration,
    background: "#DCFCE7",
  },
  {
    title: "Diário de leitura",
    kind: "Material de apoio",
    Illustration: ReadingJournalMaterialIllustration,
    background: "#FEF3C7",
  },
  {
    title: "Roteiro de debate",
    kind: "Plano de aula",
    Illustration: DebateGuideMaterialIllustration,
    background: "#EDE9FE",
  },
]

const classrooms: Classroom[] = [
  {
    name: "2º ano B",
    background: "#E7DCFF",
    accent: "#7C3AED",
    softAccent: "#C4B5FD",
  },
  {
    name: "2º ano D",
    background: "#DCF4DF",
    accent: "#15803D",
    softAccent: "#BBF7D0",
  },
  {
    name: "5º ano A",
    background: "#D8E8FF",
    accent: "#2563EB",
    softAccent: "#BFDBFE",
  },
  {
    name: "5º ano C",
    background: "#FEF3C7",
    accent: "#D97706",
    softAccent: "#FDE68A",
  },
  {
    name: "9º ano C",
    background: "#FCE7F3",
    accent: "#DB2777",
    softAccent: "#FBCFE8",
  },
]

const planningMocks: PlanningMock[] = [
  {
    title: "Leitura compartilhada: fábulas",
    subject: "Língua Portuguesa",
    classroom: "2º ano B",
    updatedAt: "Atualizado hoje",
    Illustration: ReadingPlanIllustration,
    background: "#E5F0FF",
  },
  {
    title: "Frações no cotidiano",
    subject: "Matemática",
    classroom: "5º ano A",
    updatedAt: "Atualizado ontem",
    Illustration: FractionsPlanIllustration,
    background: "#DCFCE7",
  },
  {
    title: "Oficina de carta de opinião",
    subject: "Produção textual",
    classroom: "9º ano C",
    updatedAt: "Atualizado há 2 dias",
    Illustration: WritingPlanIllustration,
    background: "#FEF3C7",
  },
  {
    title: "Formas geométricas na escola",
    subject: "Matemática",
    classroom: "5º ano C",
    updatedAt: "Atualizado há 4 dias",
    Illustration: GeometryPlanIllustration,
    background: "#DCF4DF",
  },
  {
    title: "Roda de conversa literária",
    subject: "Língua Portuguesa",
    classroom: "2º ano D",
    updatedAt: "Atualizado na semana passada",
    Illustration: DebatePlanIllustration,
    background: "#F1E5FB",
  },
]

const assessmentMocks: AssessmentMock[] = [
  {
    title: "Avaliação diagnóstica de leitura",
    subject: "Língua Portuguesa",
    classroom: "2º ano B",
    schoolYear: "2",
    templateId: "multiple-choice",
    background: "#E5F0FF",
  },
  {
    title: "Desafio de frações",
    subject: "Matemática",
    classroom: "5º ano A",
    schoolYear: "5",
    templateId: "fill-blank",
    background: "#DCFCE7",
  },
  {
    title: "Roteiro de revisão textual",
    subject: "Redação",
    classroom: "9º ano C",
    schoolYear: "9",
    templateId: "mixed-review",
    background: "#FEE2E2",
  },
  {
    title: "Leitura de gráficos",
    subject: "Matemática",
    classroom: "5º ano C",
    schoolYear: "5",
    templateId: "matching",
    background: "#FEF3C7",
  },
  {
    title: "Palavras e sentidos",
    subject: "Língua Portuguesa",
    classroom: "2º ano D",
    schoolYear: "2",
    templateId: "word-search",
    background: "#F1E5FB",
  },
]

export function CreationActions() {
  const [view, setView] = useState<View>("inicio")
  const {
    trackRef: actionsRef,
    canScrollPrevious,
    canScrollNext,
    scroll: scrollActions,
    maskImage: actionCarouselMaskImage,
  } = useHorizontalCarousel(actions.length, {
    enabled: view === "inicio",
    minimumScrollDistance: 160,
  })

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    nextView: View
  ) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return

    event.preventDefault()
    setView(nextView)
    document.getElementById(`creation-tab-${nextView}`)?.focus()
  }

  return (
    <div className={cn(view === "inicio" && "space-y-6")}>
      <section
        className="relative overflow-hidden px-4 pt-6 pb-8 sm:pt-8 lg:px-6"
        aria-labelledby="acoes-de-criacao"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b from-amber-100 via-orange-50/70 to-transparent" />
        <div className="relative">
          <div className="pointer-events-none absolute -top-20 -left-20 size-56 rounded-full bg-amber-300/60 blur-3xl" />
          <div className="pointer-events-none absolute -top-4 -right-20 size-56 rounded-full bg-blue-300/55 blur-3xl" />
          <div className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="acoes-de-criacao"
                className="animate-iara-gradient bg-clip-text font-heading text-3xl font-medium tracking-tight text-transparent sm:text-4xl"
              >
                {view === "inicio"
                  ? "Como a IARA pode ajudar?"
                  : "Explore modelos para sua aula"}
              </h2>
            </div>
            <div
              role="tablist"
              aria-label="Navegação da área de criação"
              className="mx-auto mt-6 flex h-9 w-fit items-center rounded-full bg-white/60 p-[3px] text-muted-foreground shadow-sm"
            >
              <CreationTab
                id="creation-tab-inicio"
                panelId="creation-panel-inicio"
                active={view === "inicio"}
                onClick={() => setView("inicio")}
                onKeyDown={(event) => handleTabKeyDown(event, "modelos")}
                icon={HomeIcon}
              >
                Início
              </CreationTab>
              <CreationTab
                id="creation-tab-modelos"
                panelId="creation-panel-modelos"
                active={view === "modelos"}
                onClick={() => setView("modelos")}
                onKeyDown={(event) => handleTabKeyDown(event, "inicio")}
                icon={WidgetIcon}
              >
                Modelos
              </CreationTab>
            </div>
            {view === "inicio" ? (
              <div
                id="creation-panel-inicio"
                role="tabpanel"
                aria-labelledby="creation-tab-inicio"
              >
                <div className="mx-auto mt-6 flex max-w-2xl items-center gap-2 rounded-2xl border border-blue-200/80 bg-white/90 p-1.5 pl-3 shadow-sm backdrop-blur">
                  <ChatRoundIcon size={20} color="#3b82f6" />
                  <input
                    type="text"
                    aria-label="Mensagem para a IARA"
                    placeholder="Converse com a IARA ou escolha uma ação abaixo"
                    className="h-9 min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    aria-label="Enviar mensagem"
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    <PlaneIcon size={18} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="relative mx-auto mt-7 max-w-4xl sm:flex sm:items-center sm:justify-center sm:gap-3">
                  <CarouselButton
                    label="Ver ações anteriores"
                    onClick={() => scrollActions("previous")}
                    disabled={!canScrollPrevious}
                    controls="creation-actions-carousel"
                    className="absolute top-3 left-0 z-20 !mt-0 sm:!static sm:!mt-3 sm:self-start"
                  >
                    <AltArrowLeftIcon
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 group-hover:-translate-x-0.5"
                    />
                  </CarouselButton>
                  <div
                    ref={actionsRef}
                    id="creation-actions-carousel"
                    className="mx-auto no-scrollbar flex w-full max-w-2xl min-w-0 snap-x snap-mandatory scroll-px-10 gap-5 overflow-x-auto scroll-smooth px-10 py-1 sm:mx-0 sm:scroll-px-1 sm:gap-7 sm:px-1"
                    style={
                      actionCarouselMaskImage
                        ? {
                            maskImage: actionCarouselMaskImage,
                            WebkitMaskImage: actionCarouselMaskImage,
                          }
                        : undefined
                    }
                  >
                    {actions.map((action) => (
                      <ActionIcon key={action.title} action={action} />
                    ))}
                  </div>
                  <CarouselButton
                    label="Ver próximas ações"
                    onClick={() => scrollActions("next")}
                    disabled={!canScrollNext}
                    controls="creation-actions-carousel"
                    className="absolute top-3 right-0 z-20 !mt-0 sm:!static sm:!mt-3 sm:self-start"
                  >
                    <AltArrowRightIcon
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </CarouselButton>
                </div>
              </div>
            ) : (
              <div
                id="creation-panel-modelos"
                role="tabpanel"
                aria-labelledby="creation-tab-modelos"
              >
                <ModelExplorer />
              </div>
            )}
          </div>
        </div>
      </section>
      {view === "inicio" && (
        <>
          <MaterialMocks />
          <Classrooms />
          <PlanningMocks />
          <AssessmentMocks />
        </>
      )}
    </div>
  )
}

function MaterialMocks() {
  const [showAll, setShowAll] = useState(false)
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(materialMocks.length, { enabled: !showAll })

  return (
    <section
      className="px-4 pb-8 lg:px-6"
      aria-labelledby="historico-de-interacoes"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h2
            id="historico-de-interacoes"
            className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Histórico de interações
          </h2>
          <button
            type="button"
            aria-controls="material-mocks-carousel"
            aria-expanded={showAll}
            onClick={() => setShowAll((current) => !current)}
            className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-white/85 px-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:translate-y-0"
          >
            {showAll ? "Mostrar menos" : "Ver todos"}
            {showAll ? (
              <AltArrowLeftIcon
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-0.5"
              />
            ) : (
              <AltArrowRightIcon
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            )}
          </button>
        </div>
        <div className="relative isolate">
          {!showAll && (
            <button
              type="button"
              aria-label="Ver materiais anteriores"
              aria-controls="material-mocks-carousel"
              disabled={!canScrollPrevious}
              onClick={() => scroll("previous")}
              className="group absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
            >
              <AltArrowLeftIcon
                size={18}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-0.5"
              />
            </button>
          )}
          <div
            ref={trackRef}
            id="material-mocks-carousel"
            className={cn(
              showAll
                ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                : "no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-5 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-6"
            )}
          >
            {materialMocks.map((material) => (
              <MaterialMockCard
                key={material.title}
                material={material}
                expanded={showAll}
              />
            ))}
          </div>
          {!showAll && (
            <button
              type="button"
              aria-label="Ver próximos materiais"
              aria-controls="material-mocks-carousel"
              disabled={!canScrollNext}
              onClick={() => scroll("next")}
              className="group absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
            >
              <AltArrowRightIcon
                size={18}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function MaterialMockCard({
  material,
  expanded = false,
}: {
  material: MaterialMock
  expanded?: boolean
}) {
  const Illustration = material.Illustration

  return (
    <article
      className={cn(
        "relative isolate h-[17.25rem] overflow-hidden rounded-[24px] p-5 shadow-sm",
        expanded
          ? "w-full"
          : "w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start"
      )}
      style={{ backgroundColor: material.background }}
    >
      <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
        {material.kind}
      </span>
      <Illustration className="pointer-events-none absolute top-[3.25rem] left-1/2 z-0 h-[10.25rem] w-[12.25rem] -translate-x-1/2" />
      <span className="absolute right-5 bottom-5 left-5 z-10 text-lg font-semibold tracking-tight text-foreground">
        {material.title}
      </span>
    </article>
  )
}

function Classrooms() {
  const [showAll, setShowAll] = useState(false)
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(classrooms.length + 1, { enabled: !showAll })

  return (
    <section className="px-4 pb-8 lg:px-6" aria-labelledby="turmas">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h2
            id="turmas"
            className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Acompanhar suas turmas
          </h2>
          <button
            type="button"
            aria-controls="classrooms-carousel"
            aria-expanded={showAll}
            onClick={() => setShowAll((current) => !current)}
            className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-white/85 px-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:translate-y-0"
          >
            {showAll ? "Mostrar menos" : "Ver todos"}
            {showAll ? (
              <AltArrowLeftIcon
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-0.5"
              />
            ) : (
              <AltArrowRightIcon
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            )}
          </button>
        </div>
        <div className="relative isolate">
          {!showAll && (
            <button
              type="button"
              aria-label="Ver turmas anteriores"
              aria-controls="classrooms-carousel"
              disabled={!canScrollPrevious}
              onClick={() => scroll("previous")}
              className="group absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
            >
              <AltArrowLeftIcon
                size={18}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-0.5"
              />
            </button>
          )}
          <div
            ref={trackRef}
            id="classrooms-carousel"
            className={cn(
              showAll
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-4 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-5"
            )}
          >
            {classrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.name}
                classroom={classroom}
                expanded={showAll}
              />
            ))}
            <CreateClassroomCard expanded={showAll} />
          </div>
          {!showAll && (
            <button
              type="button"
              aria-label="Ver próximas turmas"
              aria-controls="classrooms-carousel"
              disabled={!canScrollNext}
              onClick={() => scroll("next")}
              className="group absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
            >
              <AltArrowRightIcon
                size={18}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function ClassroomCard({
  classroom,
  expanded = false,
}: {
  classroom: Classroom
  expanded?: boolean
}) {
  return (
    <Link
      href="/minhas-turmas"
      aria-label={`Abrir turma ${classroom.name}`}
      className={cn(
        "group/card relative h-[92px] overflow-hidden rounded-[20px] px-5 text-left transition-[box-shadow,transform] duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-orange-600/45 active:translate-y-0",
        expanded
          ? "w-full"
          : "w-[min(15rem,calc(100vw-3rem))] shrink-0 snap-start"
      )}
      style={{ backgroundColor: classroom.background }}
    >
      <span className="relative z-10 flex h-full w-[55%] items-center justify-center text-center text-base font-semibold text-foreground">
        {classroom.name}
      </span>
      <ClassroomIllustration
        accent={classroom.accent}
        softAccent={classroom.softAccent}
        className="pointer-events-none absolute -right-5 -bottom-6 h-[118px] w-[160px] transition-transform duration-300 group-hover/card:-translate-y-1 group-hover/card:scale-[1.03] motion-reduce:transition-none"
      />
    </Link>
  )
}

function CreateClassroomCard({ expanded = false }: { expanded?: boolean }) {
  return (
    <Link
      href="/minhas-turmas#criar-turma"
      aria-label="Criar uma turma"
      className={cn(
        "group/card relative flex h-[92px] items-center justify-center gap-2 overflow-hidden rounded-[20px] border border-dashed border-orange-300 bg-orange-50 px-5 text-center text-base font-semibold text-orange-800 transition-[background-color,transform] duration-200 outline-none hover:-translate-y-0.5 hover:bg-orange-100 focus-visible:ring-3 focus-visible:ring-orange-600/45 active:translate-y-0",
        expanded
          ? "w-full"
          : "w-[min(15rem,calc(100vw-3rem))] shrink-0 snap-start"
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-orange-600 text-xl leading-none font-medium text-white transition-transform duration-200 group-hover/card:scale-110">
        +
      </span>
      Criar turma
    </Link>
  )
}

function PlanningMocks() {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(planningMocks.length)

  return (
    <section className="px-4 pb-8 lg:px-6" aria-labelledby="planejamentos">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h2
            id="planejamentos"
            className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Seus planejamentos de aula
          </h2>
          <Link
            href="/meus-planejamentos"
            className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-white/85 px-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:translate-y-0"
          >
            Ver todos
            <AltArrowRightIcon
              size={16}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="relative isolate">
          <button
            type="button"
            aria-label="Ver planejamentos anteriores"
            aria-controls="planning-mocks-carousel"
            disabled={!canScrollPrevious}
            onClick={() => scroll("previous")}
            className="group absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
          >
            <AltArrowLeftIcon
              size={18}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </button>
          <div
            ref={trackRef}
            id="planning-mocks-carousel"
            className="no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-5 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-6"
          >
            {planningMocks.map((planning) => (
              <PlanningMockCard key={planning.title} planning={planning} />
            ))}
          </div>
          <button
            type="button"
            aria-label="Ver próximos planejamentos"
            aria-controls="planning-mocks-carousel"
            disabled={!canScrollNext}
            onClick={() => scroll("next")}
            className="group absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
          >
            <AltArrowRightIcon
              size={18}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  )
}

function AssessmentMocks() {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(assessmentMocks.length + 1)

  return (
    <section className="px-4 pb-8 lg:px-6" aria-labelledby="crie-uma-avaliacao">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h2
            id="crie-uma-avaliacao"
            className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Crie uma avaliação
          </h2>
          <Link
            href="/minhas-avaliacoes"
            className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-white/85 px-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:translate-y-0"
          >
            Ver todos
            <AltArrowRightIcon
              size={16}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="relative isolate">
          <button
            type="button"
            aria-label="Ver avaliações anteriores"
            aria-controls="assessment-mocks-carousel"
            disabled={!canScrollPrevious}
            onClick={() => scroll("previous")}
            className="group absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
          >
            <AltArrowLeftIcon
              size={18}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </button>
          <div
            ref={trackRef}
            id="assessment-mocks-carousel"
            className="no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-5 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-6"
          >
            {assessmentMocks.map((assessment) => (
              <AssessmentMockCard
                key={assessment.title}
                assessment={assessment}
              />
            ))}
            <CreateAssessmentCard />
          </div>
          <button
            type="button"
            aria-label="Ver próximas avaliações"
            aria-controls="assessment-mocks-carousel"
            disabled={!canScrollNext}
            onClick={() => scroll("next")}
            className="group absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
          >
            <AltArrowRightIcon
              size={18}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  )
}

function AssessmentMockCard({ assessment }: { assessment: AssessmentMock }) {
  const subjectLabel =
    assessment.subject === "Redação" ? "Produção textual" : assessment.subject

  return (
    <Link
      href="/minhas-avaliacoes"
      aria-label={`Criar ${assessment.title}`}
      className="group/card relative isolate h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start overflow-hidden rounded-[24px] p-5 shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-3 focus-visible:ring-orange-600/45 active:translate-y-0"
      style={{ backgroundColor: assessment.background }}
    >
      <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
        {subjectLabel} · {assessment.classroom}
      </span>
      <ContextualActivityIllustration
        subject={assessment.subject}
        schoolYear={assessment.schoolYear}
        templateId={assessment.templateId}
        className="pointer-events-none absolute top-[3.25rem] left-1/2 z-0 h-[10.25rem] w-[12.25rem] -translate-x-1/2 transition-transform duration-300 group-hover/card:-translate-y-1 group-hover/card:scale-[1.03] motion-reduce:transition-none"
      />
      <span className="absolute right-5 bottom-5 left-5 z-10 text-lg font-semibold tracking-tight text-foreground">
        {assessment.title}
      </span>
    </Link>
  )
}

function CreateAssessmentCard() {
  return (
    <Link
      href="/minhas-avaliacoes#criar-avaliacao"
      aria-label="Criar uma avaliação"
      className="group/card relative flex h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start flex-col items-center justify-center gap-4 overflow-hidden rounded-[24px] border border-dashed border-orange-300 bg-orange-50 p-5 text-center text-lg font-semibold text-orange-800 transition-[background-color,transform] duration-200 outline-none hover:-translate-y-1 hover:bg-orange-100 focus-visible:ring-3 focus-visible:ring-orange-600/45 active:translate-y-0"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-orange-600 text-3xl leading-none font-medium text-white transition-transform duration-200 group-hover/card:scale-110">
        +
      </span>
      Crie uma avaliação
    </Link>
  )
}

function PlanningMockCard({ planning }: { planning: PlanningMock }) {
  const Illustration = planning.Illustration

  return (
    <Link
      href="/meus-planejamentos"
      aria-label={`Abrir planejamento ${planning.title}`}
      className="group/card relative isolate h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start overflow-hidden rounded-[24px] p-5 shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-3 focus-visible:ring-orange-600/45 active:translate-y-0"
      style={{ backgroundColor: planning.background }}
    >
      <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
        {planning.subject} · {planning.classroom}
      </span>
      <Illustration className="pointer-events-none absolute top-[3.25rem] left-1/2 z-0 h-[10.25rem] w-[12.25rem] -translate-x-1/2 transition-transform duration-300 group-hover/card:-translate-y-1 group-hover/card:scale-[1.03] motion-reduce:transition-none" />
      <span className="absolute right-5 bottom-5 left-5 z-10">
        <span className="block text-lg font-semibold tracking-tight text-foreground">
          {planning.title}
        </span>
        <span className="mt-1 block text-sm text-foreground/65">
          {planning.updatedAt}
        </span>
      </span>
    </Link>
  )
}

function CreationTab({
  active,
  children,
  icon: Icon,
  id,
  onClick,
  onKeyDown,
  panelId,
}: {
  active: boolean
  children: ReactNode
  icon: ElementType
  id: string
  onClick: () => void
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
  panelId: string
}) {
  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={panelId}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex h-[calc(100%-1px)] cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium transition-[background-color,box-shadow] duration-200 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-orange-600/50",
        active
          ? "bg-orange-600 text-white shadow-sm hover:text-white"
          : "text-foreground/60"
      )}
    >
      <Icon size={15} strokeWidth={1.5} />
      {children}
    </button>
  )
}

function ActionIcon({ action }: { action: Action }) {
  const Icon = action.icon

  return (
    <button
      type="button"
      className="group flex w-24 shrink-0 snap-start flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        className="flex size-12 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:-translate-y-1 group-active:scale-95 motion-reduce:transition-none"
        style={{ backgroundColor: action.color }}
      >
        <Icon
          size={28}
          strokeWidth={1.5}
          color="#ffffff"
          className="transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-3 motion-reduce:transition-none"
        />
      </span>
      <span className="pt-2 text-xs leading-4 font-medium text-foreground">
        {action.title}
      </span>
    </button>
  )
}

function CarouselButton({
  children,
  controls,
  disabled,
  label,
  onClick,
  className,
}: {
  className?: string
  children: ReactNode
  controls: string
  disabled: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={controls}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group mt-3 flex size-8 shrink-0 cursor-pointer items-center justify-center self-start rounded-full border bg-white/80 text-foreground shadow-sm transition-[opacity,transform] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:cursor-default disabled:opacity-35 disabled:hover:scale-100",
        className
      )}
    >
      {children}
    </button>
  )
}
