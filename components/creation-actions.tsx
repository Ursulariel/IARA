"use client"

import { useState } from "react"
import type {
  ComponentType,
  ElementType,
  KeyboardEvent,
  ReactNode,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { ChatRoundIcon } from "@solar-icons/react/bold/chat-round"
import { PlaneIcon } from "@solar-icons/react/bold/plane"
import { AltArrowLeftIcon } from "@solar-icons/react/outline/alt-arrow-left"
import { AltArrowRightIcon } from "@solar-icons/react/outline/alt-arrow-right"
import { HomeIcon } from "@solar-icons/react/outline/home"
import { WidgetIcon } from "@solar-icons/react/outline/widget"
import { cn } from "cn"

import {
  AnimatedActionIcon,
  type AnimatedActionIconVariant,
} from "@/components/animated-action-icon"
import { ModelExplorer } from "@/components/model-explorer"
import {
  AnalyticsIllustration,
  ClassroomIllustration,
  type PaletteName,
  TableIllustration,
  TextDocumentIllustration,
} from "@/components/document-card-illustrations"
import { NavUser } from "@/components/nav-user"
import { useHorizontalCarousel } from "@/hooks/use-horizontal-carousel"

type Action = {
  title: string
  icon: AnimatedActionIconVariant
  color: string
}

type View = "inicio" | "modelos"

type CardIllustration = ComponentType<{
  className?: string
  palette: PaletteName
}>

type MaterialMock = {
  title: string
  kind: string
  palette: PaletteName
  Illustration: CardIllustration
}

type Classroom = {
  letter: string
  name: string
  palette: PaletteName
}

type PlanningMock = {
  title: string
  subject: string
  classroom: string
  updatedAt: string
  palette: PaletteName
  Illustration: CardIllustration
}

type AssessmentMock = {
  title: string
  subject: "Língua Portuguesa"
  classroom: string
  schoolYear: string
  palette: PaletteName
  Illustration: CardIllustration
}

const actions: Action[] = [
  {
    title: "Criar avaliação",
    icon: "writing",
    color: "#ea580c",
  },
  {
    title: "Planejamento de aula",
    icon: "calendar",
    color: "#ea580c",
  },
  {
    title: "Copiloto pedagógico",
    icon: "notebook",
    color: "#2563eb",
  },
  {
    title: "Avaliações e insights de aprendizagem",
    icon: "statistics",
    color: "#2563eb",
  },
  {
    title: "Jornada do estudante e personalização",
    icon: "student",
    color: "#2563eb",
  },
  {
    title: "Evidências e documentação",
    icon: "documents",
    color: "#2563eb",
  },
  {
    title: "Desenvolvimento profissional",
    icon: "diploma",
    color: "#2563eb",
  },
]

const account = {
  name: "shadcn",
  email: "m@example.com",
}

const materialMocks: MaterialMock[] = [
  {
    title: "Mapa de conceitos",
    kind: "Quadro branco",
    palette: "blue-light",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "Caça-palavras temático",
    kind: "Folha para impressão",
    palette: "orange-light",
    Illustration: TableIllustration,
  },
  {
    title: "Trilha de desafios",
    kind: "Jogo",
    palette: "blue-deep",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "Diário de leitura",
    kind: "Material de apoio",
    palette: "orange-deep",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Roteiro de debate",
    kind: "Plano de aula",
    palette: "blue-light",
    Illustration: TextDocumentIllustration,
  },
]

const classrooms: Classroom[] = [
  {
    letter: "A",
    name: "1º ano A",
    palette: "blue-light",
  },
  {
    letter: "B",
    name: "1º ano B",
    palette: "orange-light",
  },
  {
    letter: "C",
    name: "1º ano C",
    palette: "blue-deep",
  },
  {
    letter: "A",
    name: "2º ano A",
    palette: "orange-deep",
  },
  {
    letter: "B",
    name: "2º ano B",
    palette: "blue-light",
  },
]

const planningMocks: PlanningMock[] = [
  {
    title: "Leitura compartilhada: fábulas",
    subject: "Língua Portuguesa",
    classroom: "1º ano A",
    updatedAt: "Atualizado hoje",
    palette: "blue-light",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Sequência de leitura: parlendas",
    subject: "Língua Portuguesa",
    classroom: "1º ano B",
    updatedAt: "Atualizado ontem",
    palette: "blue-deep",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "Produção de bilhetes",
    subject: "Língua Portuguesa",
    classroom: "1º ano C",
    updatedAt: "Atualizado há 2 dias",
    palette: "orange-light",
    Illustration: TableIllustration,
  },
  {
    title: "Rimas e aliterações",
    subject: "Língua Portuguesa",
    classroom: "2º ano A",
    updatedAt: "Atualizado há 4 dias",
    palette: "blue-light",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "Roda de conversa literária",
    subject: "Língua Portuguesa",
    classroom: "2º ano B",
    updatedAt: "Atualizado na semana passada",
    palette: "orange-deep",
    Illustration: TextDocumentIllustration,
  },
]

const assessmentMocks: AssessmentMock[] = [
  {
    title: "Avaliação diagnóstica de leitura",
    subject: "Língua Portuguesa",
    classroom: "1º ano A",
    schoolYear: "1",
    palette: "orange-light",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Leitura de palavras e sílabas",
    subject: "Língua Portuguesa",
    classroom: "1º ano B",
    schoolYear: "1",
    palette: "orange-deep",
    Illustration: TableIllustration,
  },
  {
    title: "Produção de frases",
    subject: "Língua Portuguesa",
    classroom: "1º ano C",
    schoolYear: "1",
    palette: "blue-light",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Compreensão de textos curtos",
    subject: "Língua Portuguesa",
    classroom: "2º ano A",
    schoolYear: "2",
    palette: "blue-deep",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "Convenções da escrita",
    subject: "Língua Portuguesa",
    classroom: "2º ano B",
    schoolYear: "2",
    palette: "orange-light",
    Illustration: TableIllustration,
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
        className="relative overflow-hidden px-4 pt-3 pb-8 sm:pt-5 lg:px-6"
        aria-labelledby="acoes-de-criacao"
      >
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
        <div className="relative">
          <div className="pointer-events-none absolute -top-20 -left-20 size-56 rounded-full bg-amber-300/60 blur-3xl" />
          <div className="pointer-events-none absolute -top-4 -right-20 size-56 rounded-full bg-blue-300/55 blur-3xl" />
          <div className="relative">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <Link
                href="/inicio"
                aria-label="IARA"
                className="flex h-11 items-center outline-none focus-visible:ring-3 focus-visible:ring-orange-600/45 sm:h-12"
              >
                <Image
                  src="/iara-logo-full.svg"
                  alt="IARA"
                  width={380}
                  height={140}
                  className="h-8 w-auto object-contain sm:h-9"
                  priority
                />
              </Link>
              <NavUser user={account} />
            </div>
            <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-12">
              <h2
                id="acoes-de-criacao"
                className="animate-iara-gradient bg-clip-text font-heading text-3xl font-medium tracking-tight text-transparent sm:text-4xl"
              >
                {view === "inicio"
                  ? "O que vamos criar para sua turma hoje?"
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
                <div className="relative mx-auto mt-7 max-w-6xl sm:flex sm:items-center sm:justify-center sm:gap-3">
                  <CarouselButton
                    label="Ver ações anteriores"
                    onClick={() => scrollActions("previous")}
                    disabled={!canScrollPrevious}
                    controls="creation-actions-carousel"
                    className="absolute top-3 left-0 z-20 !mt-0 sm:!static sm:!mt-3 sm:self-start lg:hidden"
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
                    className="mx-auto no-scrollbar flex w-full max-w-2xl min-w-0 snap-x snap-mandatory scroll-px-10 gap-5 overflow-x-auto scroll-smooth px-10 py-1 sm:mx-0 sm:scroll-px-1 sm:gap-7 sm:px-1 lg:max-w-none lg:snap-none lg:scroll-px-0 lg:justify-between lg:gap-0 lg:overflow-visible lg:px-0"
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
                    className="absolute top-3 right-0 z-20 !mt-0 sm:!static sm:!mt-3 sm:self-start lg:hidden"
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
          <AssessmentMocks />
          <Classrooms />
          <PlanningMocks />
          <MaterialMocks />
        </>
      )}
    </div>
  )
}

function MaterialMocks() {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(materialMocks.length)

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
          <Link
            href="/minhas-analises"
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
          <div
            ref={trackRef}
            id="material-mocks-carousel"
            className="no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-5 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-6"
          >
            {materialMocks.map((material) => (
              <MaterialMockCard key={material.title} material={material} />
            ))}
          </div>
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
        </div>
      </div>
    </section>
  )
}

function MaterialMockCard({ material }: { material: MaterialMock }) {
  const Illustration = material.Illustration

  return (
    <article className="group/card relative isolate h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start overflow-hidden rounded-[24px] bg-neutral-100 p-5">
      <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
        {material.kind}
      </span>
      <Illustration
        palette={material.palette}
        className="pointer-events-none absolute top-12 left-1/2 h-[10.5rem] w-[13rem] -translate-x-1/2"
      />
      <span className="absolute right-5 bottom-5 left-5 z-10 text-lg font-semibold tracking-tight text-foreground">
        {material.title}
      </span>
    </article>
  )
}

function Classrooms() {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(classrooms.length + 1)

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
          <Link
            href="/minhas-turmas"
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
          <div
            ref={trackRef}
            id="classrooms-carousel"
            className="no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-4 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-5"
          >
            {classrooms.map((classroom) => (
              <ClassroomCard key={classroom.name} classroom={classroom} />
            ))}
            <CreateClassroomCard />
          </div>
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
        </div>
      </div>
    </section>
  )
}

function ClassroomCard({ classroom }: { classroom: Classroom }) {
  return (
    <Link
      href="/minhas-turmas"
      aria-label={`Abrir turma ${classroom.name}`}
      className="group/card relative h-[92px] w-[min(15rem,calc(100vw-3rem))] shrink-0 snap-start overflow-hidden rounded-[20px] bg-neutral-100 px-5 text-left outline-none focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="relative z-10 flex h-full w-[52%] items-center justify-center text-center text-base font-semibold text-foreground">
        {classroom.name}
      </span>
      <ClassroomIllustration
        letter={classroom.letter}
        palette={classroom.palette}
        className="pointer-events-none absolute -right-4 -bottom-4 h-[112px] w-[164px]"
      />
    </Link>
  )
}

function CreateClassroomCard() {
  return (
    <Link
      href="/minhas-turmas#criar-turma"
      aria-label="Criar uma turma"
      className="group/card relative flex h-[92px] w-[min(15rem,calc(100vw-3rem))] shrink-0 snap-start items-center justify-center gap-2 overflow-hidden rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-100 px-5 text-center text-base font-semibold text-foreground outline-none transition-[background-color,border-color] duration-200 ease-out hover:border-orange-400 hover:bg-orange-50 focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-orange-600 text-xl leading-none font-medium text-white transition-transform duration-200 ease-out group-hover/card:rotate-90 group-hover/card:scale-110 motion-reduce:transition-none motion-reduce:group-hover/card:rotate-0 motion-reduce:group-hover/card:scale-100">
        <span className="inline-block -translate-y-px">+</span>
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
  const Illustration = assessment.Illustration

  return (
    <Link
      href="/minhas-avaliacoes"
      aria-label={`Criar ${assessment.title}`}
      className="group/card relative isolate h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start overflow-hidden rounded-[24px] bg-neutral-100 p-5 focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
        {assessment.subject} · {assessment.classroom}
      </span>
      <Illustration
        palette={assessment.palette}
        className="pointer-events-none absolute top-12 left-1/2 h-[10.5rem] w-[13rem] -translate-x-1/2"
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
      className="group/card relative flex h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start flex-col items-center justify-center gap-4 overflow-hidden rounded-[24px] border-2 border-dashed border-neutral-300 bg-neutral-100 p-5 text-center text-lg font-semibold text-foreground outline-none transition-[background-color,border-color] duration-200 ease-out hover:border-orange-400 hover:bg-orange-50 focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-orange-600 text-3xl leading-none font-medium text-white transition-transform duration-200 ease-out group-hover/card:rotate-90 group-hover/card:scale-110 motion-reduce:transition-none motion-reduce:group-hover/card:rotate-0 motion-reduce:group-hover/card:scale-100">
        <span className="inline-block -translate-y-px">+</span>
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
      className="group/card relative isolate h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start overflow-hidden rounded-[24px] bg-neutral-100 p-5 focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
        {planning.subject} · {planning.classroom}
      </span>
      <Illustration
        palette={planning.palette}
        className="pointer-events-none absolute top-12 left-1/2 h-[10.5rem] w-[13rem] -translate-x-1/2"
      />
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
  return (
    <button
      type="button"
      className="group flex w-24 shrink-0 snap-start flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        className="flex size-12 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:-translate-y-1 group-active:scale-95 motion-reduce:transition-none"
        style={{ backgroundColor: action.color }}
      >
        <AnimatedActionIcon variant={action.icon} />
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
