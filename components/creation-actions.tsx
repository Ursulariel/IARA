"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { ComponentType, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { createPortal } from "react-dom"
import { ChatRoundIcon } from "@solar-icons/react/linear/chat-round"
import { PlaneIcon } from "@solar-icons/react/linear/plane"
import { MagnifierIcon } from "@solar-icons/react/outline/magnifier"
import { AltArrowLeftIcon } from "@solar-icons/react/outline/alt-arrow-left"
import { AltArrowRightIcon } from "@solar-icons/react/outline/alt-arrow-right"
import { AltArrowDownIcon } from "@solar-icons/react/outline/alt-arrow-down"
import { IconPlus, IconX } from "@tabler/icons-react"
import { cn } from "cn"
import { toast } from "sonner"

import {
  AnimatedActionIcon,
  type AnimatedActionIconVariant,
} from "@/components/animated-action-icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AnalyticsIllustration,
  ClassroomIllustration,
  type PaletteName,
  TextDocumentIllustration,
} from "@/components/document-card-illustrations"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { NavUser } from "@/components/nav-user"
import { useHorizontalCarousel } from "@/hooks/use-horizontal-carousel"
import bnccCatalog from "@/data/bncc-topics.json"

type Action = {
  title: string
  icon: AnimatedActionIconVariant
  color: string
}

type CardIllustration = ComponentType<{
  className?: string
  palette: PaletteName
}>

type MaterialMock = {
  title: string
  kind: string
  createdAt: string
  updatedAt: string
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
  createdAt: string
  updatedAt: string
  palette: PaletteName
  Illustration: CardIllustration
}

type BnccTopic = {
  code: string
  component: string
  years: number[]
  title: string
  description: string
  context?: string
}

const schoolYearOptions = [
  { value: "1", label: "1º ano" },
  { value: "2", label: "2º ano" },
]

const bnccTopics = (bnccCatalog.topics as BnccTopic[]).filter(
  (topic) => topic.component === "Língua Portuguesa"
)

type AssessmentMock = {
  title: string
  subject: "Língua Portuguesa"
  classroom: string
  schoolYear: string
  createdAt: string
  updatedAt: string
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

function contentHref(title: string) {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  return `/conteudo/${slug}`
}

function HistoryClassroomIllustration({
  className,
  palette,
}: {
  className?: string
  palette: PaletteName
}) {
  return (
    <ClassroomIllustration letter="A" palette={palette} className={className} />
  )
}

const materialMocks: MaterialMock[] = [
  {
    title: "Mapa de conceitos",
    kind: "Análise",
    createdAt: "Criado em 3 set.",
    updatedAt: "Atualizado hoje",
    palette: "orange-light",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "1º ano A",
    kind: "Turma",
    createdAt: "Criado em 2 set.",
    updatedAt: "Atualizado ontem",
    palette: "orange-light",
    Illustration: HistoryClassroomIllustration,
  },
  {
    title: "Trilha de desafios",
    kind: "Análise",
    createdAt: "Criado em 29 ago.",
    updatedAt: "Atualizado há 2 dias",
    palette: "blue-deep",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "Diário de leitura",
    kind: "Avaliação",
    createdAt: "Criado em 27 ago.",
    updatedAt: "Atualizado há 4 dias",
    palette: "orange-deep",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Roteiro de debate",
    kind: "Avaliação",
    createdAt: "Criado em 22 ago.",
    updatedAt: "Atualizado na semana passada",
    palette: "blue-light",
    Illustration: TextDocumentIllustration,
  },
]

const classrooms: Classroom[] = [
  {
    letter: "A",
    name: "1º ano A",
    palette: "orange-light",
  },
  {
    letter: "B",
    name: "1º ano B",
    palette: "orange-light",
  },
  {
    letter: "C",
    name: "1º ano C",
    palette: "orange-light",
  },
  {
    letter: "A",
    name: "2º ano A",
    palette: "blue-deep",
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
    createdAt: "Criado em 4 set.",
    updatedAt: "Atualizado hoje",
    palette: "orange-light",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Sequência de leitura: parlendas",
    subject: "Língua Portuguesa",
    classroom: "1º ano B",
    createdAt: "Criado em 3 set.",
    updatedAt: "Atualizado ontem",
    palette: "orange-deep",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Produção de bilhetes",
    subject: "Língua Portuguesa",
    classroom: "1º ano C",
    createdAt: "Criado em 1 set.",
    updatedAt: "Atualizado há 2 dias",
    palette: "orange-light",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Rimas e aliterações",
    subject: "Língua Portuguesa",
    classroom: "2º ano A",
    createdAt: "Criado em 28 ago.",
    updatedAt: "Atualizado há 4 dias",
    palette: "blue-deep",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Roda de conversa literária",
    subject: "Língua Portuguesa",
    classroom: "2º ano B",
    createdAt: "Criado em 21 ago.",
    updatedAt: "Atualizado na semana passada",
    palette: "blue-light",
    Illustration: TextDocumentIllustration,
  },
]

const assessmentMocks: AssessmentMock[] = [
  {
    title: "Avaliação diagnóstica de leitura",
    subject: "Língua Portuguesa",
    classroom: "1º ano A",
    schoolYear: "1",
    createdAt: "Criado em 5 set.",
    updatedAt: "Atualizado hoje",
    palette: "orange-light",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Leitura de palavras e sílabas",
    subject: "Língua Portuguesa",
    classroom: "1º ano B",
    schoolYear: "1",
    createdAt: "Criado em 4 set.",
    updatedAt: "Atualizado ontem",
    palette: "orange-deep",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Produção de frases",
    subject: "Língua Portuguesa",
    classroom: "1º ano C",
    schoolYear: "1",
    createdAt: "Criado em 2 set.",
    updatedAt: "Atualizado há 2 dias",
    palette: "orange-light",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Compreensão de textos curtos",
    subject: "Língua Portuguesa",
    classroom: "2º ano A",
    schoolYear: "2",
    createdAt: "Criado em 29 ago.",
    updatedAt: "Atualizado há 4 dias",
    palette: "blue-deep",
    Illustration: TextDocumentIllustration,
  },
  {
    title: "Convenções da escrita",
    subject: "Língua Portuguesa",
    classroom: "2º ano B",
    schoolYear: "2",
    createdAt: "Criado em 23 ago.",
    updatedAt: "Atualizado na semana passada",
    palette: "blue-light",
    Illustration: TextDocumentIllustration,
  },
]

const mixedClassrooms = [
  classrooms[0],
  classrooms[3],
  classrooms[1],
  classrooms[4],
  classrooms[2],
]

const mixedPlanningMocks = [
  planningMocks[0],
  planningMocks[3],
  planningMocks[1],
  planningMocks[4],
  planningMocks[2],
]

const mixedAssessmentMocks = [
  assessmentMocks[0],
  assessmentMocks[3],
  assessmentMocks[1],
  assessmentMocks[4],
  assessmentMocks[2],
]

export function CreationActions() {
  const [isCreateClassroomOpen, setIsCreateClassroomOpen] = useState(false)
  const [isCreateAssessmentOpen, setIsCreateAssessmentOpen] = useState(false)
  const [isCreatePlanningOpen, setIsCreatePlanningOpen] = useState(false)
  const {
    trackRef: actionsRef,
    canScrollPrevious,
    canScrollNext,
    scroll: scrollActions,
    maskImage: actionCarouselMaskImage,
  } = useHorizontalCarousel(actions.length, {
    minimumScrollDistance: 160,
  })

  return (
    <div className="space-y-6">
      <section
        className="relative overflow-hidden px-6 pt-3 pb-8 sm:pt-5"
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
            <div className="flex items-center justify-between">
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
                O que vamos criar para sua turma hoje?
              </h2>
            </div>
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
            <div className="relative mx-auto mt-7 sm:flex sm:items-center sm:justify-center sm:gap-3">
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
        </div>
      </section>
      <AssessmentMocks onCreate={() => setIsCreateAssessmentOpen(true)} />
      <Classrooms onCreate={() => setIsCreateClassroomOpen(true)} />
      <PlanningMocks onCreate={() => setIsCreatePlanningOpen(true)} />
      <MaterialMocks />
      <CreateClassroomDialog
        open={isCreateClassroomOpen}
        onOpenChange={setIsCreateClassroomOpen}
      />
      <CreateAssessmentDialog
        open={isCreateAssessmentOpen}
        onOpenChange={setIsCreateAssessmentOpen}
      />
      <CreatePlanningDialog
        open={isCreatePlanningOpen}
        onOpenChange={setIsCreatePlanningOpen}
      />
    </div>
  )
}

function MaterialMocks() {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(materialMocks.length)

  return (
    <section className="px-6 pb-8" aria-labelledby="historico-de-interacoes">
      <div>
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
    <Link
      href={contentHref(material.title)}
      aria-label={`Abrir ${material.title}`}
      className="group/card w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start outline-none focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <div className="relative isolate h-[17.25rem] overflow-hidden rounded-[24px] bg-neutral-100 p-5">
        <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
          {material.kind}
        </span>
        <Illustration
          palette={material.palette}
          className="pointer-events-none absolute top-12 left-1/2 h-[10.5rem] w-[13rem] -translate-x-1/2"
        />
        <div className="absolute right-5 bottom-5 left-5 z-10 text-xs leading-5 text-foreground/60">
          <span className="block">{material.createdAt}</span>
          <span className="block">{material.updatedAt}</span>
        </div>
      </div>
      <h3 className="mt-2 text-sm font-medium tracking-tight text-foreground">
        {material.title}
      </h3>
    </Link>
  )
}

function Classrooms({ onCreate }: { onCreate: () => void }) {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(mixedClassrooms.length + 1)

  return (
    <section className="px-6 pb-8" aria-labelledby="turmas">
      <div>
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
            {mixedClassrooms.map((classroom) => (
              <ClassroomCard key={classroom.name} classroom={classroom} />
            ))}
            <CreateClassroomCard onCreate={onCreate} />
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
      href={contentHref(classroom.name)}
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

function CreateClassroomCard({ onCreate }: { onCreate: () => void }) {
  return (
    <button
      type="button"
      onClick={onCreate}
      aria-label="Criar uma turma"
      className="group/card relative flex h-[92px] w-[min(15rem,calc(100vw-3rem))] shrink-0 snap-start items-center justify-center gap-2 overflow-hidden rounded-[20px] border-2 border-dashed border-neutral-300 bg-neutral-100 px-5 text-center text-base font-semibold text-foreground transition-[background-color,border-color] duration-200 ease-out outline-none hover:border-orange-400 hover:bg-orange-50 focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="flex size-7 origin-center items-center justify-center rounded-full bg-orange-600 text-white transition-transform duration-200 ease-out group-hover/card:scale-110 group-hover/card:rotate-90 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 motion-reduce:group-hover/card:rotate-0">
        <IconPlus aria-hidden="true" size={18} stroke={2} />
      </span>
      Criar turma
    </button>
  )
}

export function CreateClassroomDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: (classroom: { schoolYear: string; letter: string }) => void
}) {
  const [schoolYear, setSchoolYear] = useState("1")
  const [letter, setLetter] = useState("A")
  const palette: PaletteName =
    schoolYear === "1" ? "orange-light" : "blue-light"
  const classroomName = `${schoolYear}º ano ${letter.toUpperCase() || "A"}`

  return (
    <Dialog open={open} modal onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="create-classroom-description"
        className="relative max-w-5xl overflow-visible"
      >
        <div className="grid h-[min(39rem,calc(100dvh-2rem))] grid-rows-[minmax(11rem,0.4fr)_minmax(0,1fr)] overflow-hidden rounded-[28px] bg-background shadow-2xl sm:grid-rows-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:h-[min(34rem,calc(100dvh-4rem))] lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:grid-rows-1">
          <div
            className="relative flex min-h-0 items-center justify-center overflow-hidden p-6 sm:p-8 lg:p-12"
            style={{
              backgroundColor: schoolYear === "1" ? "#ffedd5" : "#dbeafe",
            }}
          >
            <DialogClose
              aria-label="Fechar criação de turma"
              className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95"
            >
              <IconX size={20} stroke={1.8} />
            </DialogClose>
            <div className="flex w-full max-w-md flex-col items-center text-center">
              <span className="self-start rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
                Nova turma
              </span>
              <ClassroomIllustration
                letter={letter.toUpperCase() || "A"}
                palette={palette}
                className="mt-3 h-36 w-full max-w-[18rem] drop-shadow-sm sm:h-48 lg:h-60"
              />
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-700">
                Organize os materiais e acompanhe a aprendizagem da sua turma.
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-col bg-background">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7">
              <DialogTitle>Criar uma turma</DialogTitle>
              <DialogDescription
                id="create-classroom-description"
                className="mt-2"
              >
                Defina o ano escolar e a identificação da turma para começar.
              </DialogDescription>

              <div className="mt-7 grid gap-5">
                <div className="grid gap-2">
                  <label
                    id="create-classroom-year-label"
                    className="text-sm font-semibold text-foreground"
                  >
                    Ano escolar
                  </label>
                  <Select
                    value={schoolYear}
                    onValueChange={(value) => value && setSchoolYear(value)}
                    items={[
                      { value: "1", label: "1º ano do Ensino Fundamental" },
                      { value: "2", label: "2º ano do Ensino Fundamental" },
                    ]}
                  >
                    <SelectTrigger
                      aria-labelledby="create-classroom-year-label"
                      className="w-full cursor-pointer rounded-xl bg-white px-3 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35 data-[size=default]:!h-11"
                    >
                      <SelectValue placeholder="Selecione um ano" />
                    </SelectTrigger>
                    <SelectContent align="start" positionerClassName="z-[70]">
                      <SelectGroup>
                        <SelectItem value="1" className="cursor-pointer">
                          1º ano do Ensino Fundamental
                        </SelectItem>
                        <SelectItem value="2" className="cursor-pointer">
                          2º ano do Ensino Fundamental
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="create-classroom-letter"
                    className="text-sm font-semibold text-foreground"
                  >
                    Identificação da turma
                  </label>
                  <Input
                    id="create-classroom-letter"
                    value={letter}
                    onChange={(event) =>
                      setLetter(
                        event.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 1)
                      )
                    }
                    placeholder="Ex.: A"
                    maxLength={1}
                    className="h-11 rounded-xl bg-white px-3 text-base uppercase shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                  />
                  <p className="text-xs leading-5 text-muted-foreground">
                    Sua turma será identificada como {classroomName}.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t bg-white p-4 sm:p-5">
              <Button
                type="button"
                onClick={() => {
                  onCreated?.({
                    schoolYear,
                    letter: letter.toUpperCase() || "A",
                  })
                  toast.success("Turma criada", {
                    description: `${classroomName} está pronta para receber materiais e atividades.`,
                  })
                  onOpenChange(false)
                }}
                disabled={!letter}
                className="h-11 w-full rounded-xl bg-orange-600 text-base font-semibold text-white hover:bg-orange-700 focus-visible:border-orange-600 focus-visible:ring-orange-600/35"
              >
                Criar turma
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CurriculumFields({
  schoolYear,
  topicCode,
  onSchoolYearChange,
  onTopicChange,
  idPrefix,
  classroomField,
}: {
  schoolYear: string
  topicCode: string
  onSchoolYearChange: (year: string) => void
  onTopicChange: (code: string) => void
  idPrefix: string
  classroomField: ReactNode
}) {
  const topics = bnccTopics.filter((topic) =>
    topic.years.includes(Number(schoolYear))
  )

  return (
    <>
      <div className="grid gap-2">
        <span className="text-sm font-semibold text-foreground">
          Disciplina
        </span>
        <div className="flex h-11 items-center rounded-xl bg-muted/50 px-3 text-sm text-foreground">
          Língua Portuguesa
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label
            id={`${idPrefix}-year-label`}
            className="text-sm font-semibold text-foreground"
          >
            Ano escolar
          </label>
          <Select
            value={schoolYear}
            onValueChange={(value) => {
              if (!value) return
              onSchoolYearChange(value)
              onTopicChange("")
            }}
            items={schoolYearOptions}
          >
            <SelectTrigger
              aria-labelledby={`${idPrefix}-year-label`}
              className="w-full cursor-pointer rounded-xl bg-white px-3 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35 data-[size=default]:!h-11"
            >
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent align="start" positionerClassName="z-[70]">
              <SelectGroup>
                {schoolYearOptions.map((year) => (
                  <SelectItem
                    key={year.value}
                    value={year.value}
                    className="cursor-pointer"
                  >
                    {year.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {classroomField}
      </div>
      <div className="grid gap-2">
        <label
          id={`${idPrefix}-topic-label`}
          className="text-sm font-semibold text-foreground"
        >
          Tópico da BNCC
        </label>
        <BnccTopicPicker
          id={`${idPrefix}-topic-picker`}
          topics={topics}
          selectedCode={topicCode}
          onSelect={onTopicChange}
        />
      </div>
    </>
  )
}

function BnccTopicPicker({
  id,
  topics,
  selectedCode,
  onSelect,
}: {
  id: string
  topics: BnccTopic[]
  selectedCode: string
  onSelect: (code: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [position, setPosition] = useState<{
    top: number
    left: number
    width: number
    height: number
  } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const selectedTopic = topics.find((topic) => topic.code === selectedCode)
  const filteredTopics = useMemo(() => {
    const normalizedQuery = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR")

    if (!normalizedQuery) return topics

    return topics.filter((topic) =>
      `${topic.title} ${topic.description} ${topic.code} ${topic.context ?? ""}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedQuery)
    )
  }, [query, topics])

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const modalPanel = trigger.closest<HTMLElement>("[data-bncc-modal-panel]")

    if (modalPanel) {
      const panelRect = modalPanel.getBoundingClientRect()
      setPosition({
        top: panelRect.top + 16,
        left: panelRect.left,
        width: panelRect.width,
        height: Math.max(1, panelRect.height - 32),
      })
      return
    }

    const viewport = window.visualViewport
    const viewportWidth = viewport?.width ?? window.innerWidth
    const viewportHeight = viewport?.height ?? window.innerHeight
    const edgeGap = 16
    const popupGap = 8
    const width = Math.min(512, viewportWidth - edgeGap * 2)
    const roomBelow = viewportHeight - rect.bottom - popupGap - edgeGap
    const roomAbove = rect.top - popupGap - edgeGap
    const openBelow = roomBelow >= 320 || roomBelow >= roomAbove
    const maxHeight = Math.max(
      1,
      Math.min(500, openBelow ? roomBelow : roomAbove)
    )

    setPosition({
      top: openBelow
        ? rect.bottom + popupGap
        : Math.max(edgeGap, rect.top - popupGap - maxHeight),
      left: Math.min(
        Math.max(edgeGap, rect.right - width),
        viewportWidth - width - edgeGap
      ),
      width,
      height: maxHeight,
    })
  }, [])

  useEffect(() => {
    if (!open) return

    function closeOnOutside(event: PointerEvent) {
      const target = event.target as Node
      if (
        !triggerRef.current?.contains(target) &&
        !popupRef.current?.contains(target)
      ) {
        setOpen(false)
        setQuery("")
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setOpen(false)
      setQuery("")
      triggerRef.current?.focus()
    }

    document.addEventListener("pointerdown", closeOnOutside)
    document.addEventListener("keydown", closeOnEscape)
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside)
      document.removeEventListener("keydown", closeOnEscape)
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [open, updatePosition])

  function togglePicker() {
    if (open) {
      setOpen(false)
      setQuery("")
      return
    }
    updatePosition()
    setOpen(true)
    requestAnimationFrame(() => searchRef.current?.focus())
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={togglePicker}
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-input bg-white px-3 text-sm text-foreground shadow-none transition-[background-color,border-color,box-shadow] outline-none hover:border-orange-400 hover:bg-orange-50 focus-visible:border-orange-500 focus-visible:ring-3 focus-visible:ring-orange-500/35"
      >
        <span className="min-w-0 flex-1 truncate text-left">
          {selectedTopic?.title ?? "Selecione um tópico"}
        </span>
        <AltArrowDownIcon
          size={16}
          strokeWidth={1.5}
          className={cn("shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>

      {open &&
        position &&
        createPortal(
          <div
            ref={popupRef}
            id={id}
            role="dialog"
            aria-label="Selecionar tópico da BNCC"
            className="fixed z-[80] flex origin-top animate-in flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-xl ring-1 ring-foreground/10 fade-in-0 outline-none zoom-in-95"
            style={position}
          >
            <div className="shrink-0 border-b p-4 pb-3">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Tópicos da BNCC
                </h3>
                <button
                  type="button"
                  aria-label="Fechar tópicos da BNCC"
                  onClick={() => {
                    setOpen(false)
                    setQuery("")
                    triggerRef.current?.focus()
                  }}
                  className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  <IconX size={18} stroke={1.8} />
                </button>
              </div>
              <div className="relative">
                <MagnifierIcon
                  size={20}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  ref={searchRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Pesquisar tópicos da BNCC"
                  placeholder="Pesquise tópicos ou códigos..."
                  className="h-11 rounded-xl bg-background pr-3 pl-10 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                />
              </div>
              <p className="pt-2 text-xs text-muted-foreground">
                {filteredTopics.length} habilidade
                {filteredTopics.length === 1 ? "" : "s"} encontrada
                {filteredTopics.length === 1 ? "" : "s"}
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Tópicos da BNCC"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
            >
              {filteredTopics.length ? (
                filteredTopics.map((topic) => {
                  const isSelected = topic.code === selectedCode
                  return (
                    <label
                      key={topic.code}
                      className={cn(
                        "group/topic flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-blue-100 has-[:focus-visible]:bg-blue-100 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600/45",
                        isSelected && "bg-blue-50"
                      )}
                    >
                      <input
                        type="radio"
                        name={id}
                        value={topic.code}
                        checked={isSelected}
                        onChange={() => {
                          onSelect(topic.code)
                          setOpen(false)
                          setQuery("")
                          triggerRef.current?.focus()
                        }}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-muted-foreground/60",
                          isSelected && "border-blue-600 bg-blue-600"
                        )}
                      >
                        {isSelected && (
                          <span className="size-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground">
                          {topic.title}
                        </span>
                        <span className="mt-1 line-clamp-3 block text-sm leading-5 text-muted-foreground">
                          {topic.description}
                        </span>
                        <span className="mt-1.5 block text-xs font-medium text-muted-foreground">
                          ({topic.code})
                          {topic.context ? ` · ${topic.context}` : ""}
                        </span>
                      </span>
                    </label>
                  )
                })
              ) : (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Nenhum tópico encontrado para essa busca.
                </p>
              )}
            </div>
            <p className="shrink-0 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
              Objetos de conhecimento, descrições e códigos da BNCC 2018.
            </p>
          </div>,
          document.body
        )}
    </>
  )
}

export function CreateAssessmentDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: (assessment: {
    title: string
    schoolYear: string
    classroom: string
    topicCode: string
  }) => void
}) {
  const [schoolYear, setSchoolYear] = useState("1")
  const [classroom, setClassroom] = useState("A")
  const [title, setTitle] = useState("")
  const [topicCode, setTopicCode] = useState("")
  const palette: PaletteName =
    schoolYear === "1" ? "orange-light" : "blue-light"
  const classroomName = `${schoolYear}º ano ${classroom.toUpperCase() || "A"}`

  return (
    <Dialog open={open} modal onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="create-assessment-description"
        className="relative max-w-5xl overflow-visible"
      >
        <div className="grid h-[min(39rem,calc(100dvh-2rem))] grid-rows-[minmax(11rem,0.4fr)_minmax(0,1fr)] overflow-hidden rounded-[28px] bg-background shadow-2xl sm:grid-rows-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:h-[min(34rem,calc(100dvh-4rem))] lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:grid-rows-1">
          <div
            className="relative flex min-h-0 items-center justify-center overflow-hidden p-6 sm:p-8 lg:p-12"
            style={{
              backgroundColor: schoolYear === "1" ? "#ffedd5" : "#dbeafe",
            }}
          >
            <DialogClose
              aria-label="Fechar criação de avaliação"
              className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95"
            >
              <IconX size={20} stroke={1.8} />
            </DialogClose>
            <div className="flex w-full max-w-md flex-col items-center text-center">
              <span className="self-start rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
                Nova avaliação
              </span>
              <TextDocumentIllustration
                palette={palette}
                className="mt-3 h-36 w-full max-w-[18rem] drop-shadow-sm sm:h-48 lg:h-60"
              />
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-700">
                Crie uma avaliação alinhada à turma e acompanhe as evidências de
                aprendizagem.
              </p>
            </div>
          </div>

          <div
            data-bncc-modal-panel
            className="flex min-h-0 flex-col bg-background"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7">
              <DialogTitle>Criar uma avaliação</DialogTitle>
              <DialogDescription
                id="create-assessment-description"
                className="mt-2"
              >
                Defina a turma e o título para preparar sua nova avaliação.
              </DialogDescription>

              <div className="mt-7 grid gap-5">
                <CurriculumFields
                  idPrefix="create-assessment"
                  schoolYear={schoolYear}
                  topicCode={topicCode}
                  onSchoolYearChange={setSchoolYear}
                  onTopicChange={setTopicCode}
                  classroomField={
                    <div className="grid gap-2">
                      <label
                        htmlFor="create-assessment-classroom"
                        className="text-sm font-semibold text-foreground"
                      >
                        Turma
                      </label>
                      <Input
                        id="create-assessment-classroom"
                        value={classroom}
                        onChange={(event) =>
                          setClassroom(
                            event.target.value
                              .replace(/[^a-zA-Z]/g, "")
                              .slice(0, 1)
                          )
                        }
                        maxLength={1}
                        className="h-11 rounded-xl bg-white px-3 text-base uppercase shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                      />
                    </div>
                  }
                />
                <div className="grid gap-2">
                  <label
                    htmlFor="create-assessment-title"
                    className="text-sm font-semibold text-foreground"
                  >
                    Título da avaliação
                  </label>
                  <Input
                    id="create-assessment-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ex.: Avaliação de leitura"
                    className="h-11 rounded-xl bg-white px-3 text-base shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                  />
                  <p className="text-xs leading-5 text-muted-foreground">
                    A avaliação será preparada para {classroomName}.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t bg-white p-4 sm:p-5">
              <Button
                type="button"
                disabled={!title.trim() || !classroom || !topicCode}
                onClick={() => {
                  onCreated?.({
                    title: title.trim(),
                    schoolYear,
                    classroom: classroom.toUpperCase() || "A",
                    topicCode,
                  })
                  toast.success("Avaliação criada", {
                    description: `${title.trim()} foi preparada para ${classroomName}.`,
                  })
                  onOpenChange(false)
                }}
                className="h-11 w-full rounded-xl bg-orange-600 text-base font-semibold text-white hover:bg-orange-700 focus-visible:border-orange-600 focus-visible:ring-orange-600/35"
              >
                Criar avaliação
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CreatePlanningDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: (planning: {
    title: string
    schoolYear: string
    classroom: string
    topicCode: string
    period: { from?: Date; to?: Date }
  }) => void
}) {
  const [schoolYear, setSchoolYear] = useState("1")
  const [classroom, setClassroom] = useState("A")
  const [title, setTitle] = useState("")
  const [topicCode, setTopicCode] = useState("")
  const [planningPeriod, setPlanningPeriod] = useState<{
    from?: Date
    to?: Date
  }>({})
  const palette: PaletteName =
    schoolYear === "1" ? "orange-light" : "blue-light"
  const classroomName = `${schoolYear}º ano ${classroom.toUpperCase() || "A"}`

  return (
    <Dialog open={open} modal onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="create-planning-description"
        className="relative max-w-5xl overflow-visible"
      >
        <div className="grid h-[min(39rem,calc(100dvh-2rem))] grid-rows-[minmax(11rem,0.4fr)_minmax(0,1fr)] overflow-hidden rounded-[28px] bg-background shadow-2xl sm:grid-rows-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:h-[min(34rem,calc(100dvh-4rem))] lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:grid-rows-1">
          <div
            className="relative flex min-h-0 items-center justify-center overflow-hidden p-6 sm:p-8 lg:p-12"
            style={{
              backgroundColor: schoolYear === "1" ? "#ffedd5" : "#dbeafe",
            }}
          >
            <DialogClose
              aria-label="Fechar criação de planejamento"
              className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95"
            >
              <IconX size={20} stroke={1.8} />
            </DialogClose>
            <div className="flex w-full max-w-md flex-col items-center text-center">
              <span className="self-start rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
                Novo planejamento
              </span>
              <TextDocumentIllustration
                palette={palette}
                className="mt-3 h-36 w-full max-w-[18rem] drop-shadow-sm sm:h-48 lg:h-60"
              />
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-700">
                Organize uma aula com objetivos claros e uma habilidade da BNCC.
              </p>
            </div>
          </div>

          <div
            data-bncc-modal-panel
            className="flex min-h-0 flex-col bg-background"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7">
              <DialogTitle>Criar um planejamento</DialogTitle>
              <DialogDescription
                id="create-planning-description"
                className="mt-2"
              >
                Selecione a turma, o tópico e o objetivo para preparar a aula.
              </DialogDescription>

              <div className="mt-7 grid gap-5">
                <CurriculumFields
                  idPrefix="create-planning"
                  schoolYear={schoolYear}
                  topicCode={topicCode}
                  onSchoolYearChange={setSchoolYear}
                  onTopicChange={setTopicCode}
                  classroomField={
                    <div className="grid gap-2">
                      <label
                        htmlFor="create-planning-classroom"
                        className="text-sm font-semibold text-foreground"
                      >
                        Turma
                      </label>
                      <Input
                        id="create-planning-classroom"
                        value={classroom}
                        onChange={(event) =>
                          setClassroom(
                            event.target.value
                              .replace(/[^a-zA-Z]/g, "")
                              .slice(0, 1)
                          )
                        }
                        maxLength={1}
                        className="h-11 rounded-xl bg-white px-3 text-base uppercase shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                      />
                    </div>
                  }
                />
                <div className="grid gap-2">
                  <label
                    htmlFor="create-planning-title"
                    className="text-sm font-semibold text-foreground"
                  >
                    Título do planejamento
                  </label>
                  <Input
                    id="create-planning-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ex.: Sequência de leitura"
                    className="h-11 rounded-xl bg-white px-3 text-base shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                  />
                  <p className="text-xs leading-5 text-muted-foreground">
                    O planejamento será preparado para {classroomName}.
                  </p>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Período do planejamento
                  </label>
                  <DateRangePicker
                    value={planningPeriod}
                    onValueChange={setPlanningPeriod}
                  />
                </div>
              </div>
            </div>
            <div className="border-t bg-white p-4 sm:p-5">
              <Button
                type="button"
                disabled={!title.trim() || !classroom || !topicCode}
                onClick={() => {
                  onCreated?.({
                    title: title.trim(),
                    schoolYear,
                    classroom: classroom.toUpperCase() || "A",
                    topicCode,
                    period: planningPeriod,
                  })
                  toast.success("Planejamento criado", {
                    description: `${title.trim()} foi preparado para ${classroomName}.`,
                  })
                  onOpenChange(false)
                }}
                className="h-11 w-full rounded-xl bg-orange-600 text-base font-semibold text-white hover:bg-orange-700 focus-visible:border-orange-600 focus-visible:ring-orange-600/35"
              >
                Criar planejamento
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PlanningMocks({ onCreate }: { onCreate: () => void }) {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(mixedPlanningMocks.length + 1)

  return (
    <section className="px-6 pb-8" aria-labelledby="planejamentos">
      <div>
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
            {mixedPlanningMocks.map((planning) => (
              <PlanningMockCard key={planning.title} planning={planning} />
            ))}
            <CreatePlanningCard onCreate={onCreate} />
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

function CreatePlanningCard({ onCreate }: { onCreate: () => void }) {
  return (
    <button
      type="button"
      onClick={onCreate}
      aria-label="Criar um planejamento"
      className="group/card relative flex h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start flex-col items-center justify-center gap-4 overflow-hidden rounded-[24px] border-2 border-dashed border-neutral-300 bg-neutral-100 p-5 text-center text-lg font-semibold text-foreground transition-[background-color,border-color] duration-200 ease-out outline-none hover:border-orange-400 hover:bg-orange-50 focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="flex size-11 origin-center items-center justify-center rounded-full bg-orange-600 text-white transition-transform duration-200 ease-out group-hover/card:scale-110 group-hover/card:rotate-90 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 motion-reduce:group-hover/card:rotate-0">
        <IconPlus aria-hidden="true" size={24} stroke={2} />
      </span>
      <span>Crie um planejamento</span>
    </button>
  )
}

function AssessmentMocks({ onCreate }: { onCreate: () => void }) {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(mixedAssessmentMocks.length + 1)

  return (
    <section className="px-6 pb-8" aria-labelledby="crie-uma-avaliacao">
      <div>
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
            {mixedAssessmentMocks.map((assessment) => (
              <AssessmentMockCard
                key={assessment.title}
                assessment={assessment}
              />
            ))}
            <CreateAssessmentCard onCreate={onCreate} />
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
      href={contentHref(assessment.title)}
      aria-label={`Criar ${assessment.title}`}
      className="group/card w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start outline-none focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <div className="relative isolate h-[17.25rem] overflow-hidden rounded-[24px] bg-neutral-100 p-5">
        <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
          {assessment.subject} · {assessment.classroom}
        </span>
        <Illustration
          palette={assessment.palette}
          className="pointer-events-none absolute top-12 left-1/2 h-[10.5rem] w-[13rem] -translate-x-1/2"
        />
        <div className="absolute right-5 bottom-5 left-5 z-10 text-xs leading-5 text-foreground/60">
          <span className="block">{assessment.createdAt}</span>
          <span className="block">{assessment.updatedAt}</span>
        </div>
      </div>
      <span className="mt-2 block text-sm font-medium tracking-tight text-foreground">
        {assessment.title}
      </span>
    </Link>
  )
}

function CreateAssessmentCard({ onCreate }: { onCreate: () => void }) {
  return (
    <button
      type="button"
      onClick={onCreate}
      aria-label="Criar uma avaliação"
      className="group/card relative flex h-[17.25rem] w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start flex-col items-center justify-center gap-4 overflow-hidden rounded-[24px] border-2 border-dashed border-neutral-300 bg-neutral-100 p-5 text-center text-lg font-semibold text-foreground transition-[background-color,border-color] duration-200 ease-out outline-none hover:border-orange-400 hover:bg-orange-50 focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <span className="flex size-11 origin-center items-center justify-center rounded-full bg-orange-600 text-white transition-transform duration-200 ease-out group-hover/card:scale-110 group-hover/card:rotate-90 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 motion-reduce:group-hover/card:rotate-0">
        <IconPlus aria-hidden="true" size={24} stroke={2} />
      </span>
      Crie uma avaliação
    </button>
  )
}

function PlanningMockCard({ planning }: { planning: PlanningMock }) {
  const Illustration = planning.Illustration

  return (
    <Link
      href={contentHref(planning.title)}
      aria-label={`Abrir planejamento ${planning.title}`}
      className="group/card w-[min(17.75rem,calc(100vw-4rem))] shrink-0 snap-start outline-none focus-visible:ring-3 focus-visible:ring-orange-600/45"
    >
      <div className="relative isolate h-[17.25rem] overflow-hidden rounded-[24px] bg-neutral-100 p-5">
        <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
          {planning.subject} · {planning.classroom}
        </span>
        <Illustration
          palette={planning.palette}
          className="pointer-events-none absolute top-12 left-1/2 h-[10.5rem] w-[13rem] -translate-x-1/2"
        />
        <div className="absolute right-5 bottom-5 left-5 z-10 text-xs leading-5 text-foreground/60">
          <span className="block">{planning.createdAt}</span>
          <span className="block">{planning.updatedAt}</span>
        </div>
      </div>
      <span className="mt-2 block text-sm font-medium tracking-tight text-foreground">
        {planning.title}
      </span>
    </Link>
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
