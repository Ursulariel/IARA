"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { DocumentAddIcon } from "@solar-icons/react/bold/document-add"
import { AltArrowDownIcon } from "@solar-icons/react/outline/alt-arrow-down"
import { AltArrowLeftIcon } from "@solar-icons/react/outline/alt-arrow-left"
import { AltArrowRightIcon } from "@solar-icons/react/outline/alt-arrow-right"
import { MagnifierIcon } from "@solar-icons/react/outline/magnifier"
import { IconX } from "@tabler/icons-react"
import { cn } from "cn"
import { toast } from "sonner"

import {
  ContextualActivityIllustration,
  type ActivityTemplateId,
} from "@/components/contextual-activity-illustrations"
import { getActivityCardBackground } from "@/components/activity-illustration-worlds"
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
import bnccCatalog from "@/data/bncc-topics.json"
import { useHorizontalCarousel } from "@/hooks/use-horizontal-carousel"

type Subject = "Língua Portuguesa"

type BnccTopic = {
  code: string
  component: "Língua Portuguesa" | "Matemática"
  years: number[]
  title: string
  description: string
  context: string
  writing: boolean
}

type SubjectCard = {
  label: string
  value: Subject
}

const subjects: SubjectCard[] = [
  {
    label: "Língua Portuguesa",
    value: "Língua Portuguesa",
  },
]

const schoolYears = [
  { value: "1", label: "1º ano do Ensino Fundamental" },
  { value: "2", label: "2º ano do Ensino Fundamental" },
]

const allTopics = bnccCatalog.topics as BnccTopic[]

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
}

function getTopicsForFilters(
  subject: Subject | null,
  schoolYear: string | null
) {
  if (!subject || !schoolYear) return []

  const year = Number(schoolYear)

  return allTopics.filter((topic) => {
    return topic.years.includes(year) && topic.component === subject
  })
}

function getSubjectLabel(subject: Subject) {
  return subjects.find((item) => item.value === subject)?.label ?? subject
}

function filterTopics(topics: BnccTopic[], query: string) {
  const normalizedQuery = normalizeSearch(query.trim())

  if (!normalizedQuery) return topics

  return topics.filter((topic) =>
    normalizeSearch(
      `${topic.title} ${topic.description} ${topic.code} ${topic.context}`
    ).includes(normalizedQuery)
  )
}

export function ModelExplorer() {
  const [subject, setSubject] = useState<Subject | null>(null)
  const [schoolYear, setSchoolYear] = useState<string | null>(null)
  const [selectedTopicCode, setSelectedTopicCode] = useState<string | null>(
    null
  )
  const [query, setQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] =
    useState<ActivityTemplate | null>(null)
  const [isStepVisible, setIsStepVisible] = useState(true)
  const stepTransitionTimerRef = useRef<number | null>(null)

  const transitionToSubject = useCallback((value: Subject | null) => {
    if (stepTransitionTimerRef.current !== null) {
      window.clearTimeout(stepTransitionTimerRef.current)
    }

    setIsStepVisible(false)
    stepTransitionTimerRef.current = window.setTimeout(() => {
      setSubject(value)
      setSelectedTopicCode(null)
      setSelectedTemplate(null)

      if (value === null) {
        setSchoolYear(null)
      }

      window.requestAnimationFrame(() => setIsStepVisible(true))
      stepTransitionTimerRef.current = null
    }, 180)
  }, [])

  useEffect(
    () => () => {
      if (stepTransitionTimerRef.current !== null) {
        window.clearTimeout(stepTransitionTimerRef.current)
      }
    },
    []
  )

  const selectSubject = useCallback(
    (value: Subject) => {
      setQuery("")
      transitionToSubject(value)
    },
    [transitionToSubject]
  )

  const topics = useMemo(
    () => getTopicsForFilters(subject, schoolYear),
    [schoolYear, subject]
  )

  const applyActivitySetup = useCallback((setup: ActivitySetup) => {
    setSubject(setup.subject)
    setSchoolYear(setup.schoolYear)
    setSelectedTopicCode(setup.topicCode)
    setSelectedTemplate(null)
  }, [])

  const returnToSubjects = useCallback(
    () => transitionToSubject(null),
    [transitionToSubject]
  )

  return (
    <div className="mx-auto mt-6 max-w-5xl">
      <div className="relative isolate mx-auto w-full max-w-2xl">
        <MagnifierIcon
          size={20}
          strokeWidth={1.5}
          className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-blue-600"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Buscar modelos"
          placeholder="Busque materiais, habilidades ou modelos"
          className="h-12 rounded-2xl border-blue-200/80 bg-white/90 pr-4 pl-12 shadow-sm backdrop-blur focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
        />
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Select
          value={subject}
          onValueChange={(value) => {
            if (!value) return

            selectSubject(value as Subject)
          }}
          items={subjects}
        >
          <SelectTrigger
            className={cn(
              "min-w-48 cursor-pointer rounded-full border-blue-600 bg-white/85 px-4 text-blue-600 shadow-none transition-colors hover:border-blue-700 hover:bg-blue-50 focus-visible:border-blue-600 focus-visible:ring-blue-600/35 data-placeholder:text-blue-600",
              subject &&
                "bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700 data-placeholder:text-white [&_svg]:text-white"
            )}
          >
            <SelectValue placeholder="Disciplina" />
          </SelectTrigger>
          <SelectContent align="center" className="ring-blue-600/20">
            <SelectGroup>
              {subjects.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="cursor-pointer focus:bg-blue-50 focus:text-blue-800 data-selected:bg-blue-600 data-selected:text-white data-selected:focus:bg-blue-600 data-selected:focus:text-white"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={schoolYear}
          onValueChange={(value) => {
            if (!value) return

            setSchoolYear(value as string)
            setSelectedTopicCode(null)
          }}
          items={schoolYears}
        >
          <SelectTrigger
            className={cn(
              "min-w-52 cursor-pointer rounded-full border-blue-600 bg-white/85 px-4 text-blue-600 shadow-none transition-colors hover:border-blue-700 hover:bg-blue-50 focus-visible:border-blue-600 focus-visible:ring-blue-600/35 data-placeholder:text-blue-600",
              schoolYear &&
                "bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700 data-placeholder:text-white [&_svg]:text-white"
            )}
          >
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent align="center" className="ring-blue-600/20">
            <SelectGroup>
              {schoolYears.map((year) => (
                <SelectItem
                  key={year.value}
                  value={year.value}
                  className="cursor-pointer focus:bg-blue-50 focus:text-blue-800 data-selected:bg-blue-600 data-selected:text-white data-selected:focus:bg-blue-600 data-selected:focus:text-white"
                >
                  {year.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <TopicPicker
          topics={topics}
          selectedCode={selectedTopicCode}
          disabled={!subject || !schoolYear}
          onSelect={setSelectedTopicCode}
        />
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {subject && schoolYear
          ? `${topics.length} habilidades da BNCC disponíveis para os filtros selecionados.`
          : "Selecione disciplina e ano para explorar as habilidades da BNCC."}
      </p>

      <div
        aria-live="polite"
        className={cn(
          "transition-[opacity,transform,filter] duration-200 ease-out motion-reduce:transition-none",
          isStepVisible
            ? "translate-y-0 scale-100 opacity-100 blur-none"
            : "pointer-events-none translate-y-1 scale-[0.985] opacity-0 blur-[2px]"
        )}
      >
        {subject ? (
          <ActivityTemplateCarousel
            subject={subject}
            schoolYear={schoolYear}
            query={query}
            onSelect={setSelectedTemplate}
            onBack={returnToSubjects}
          />
        ) : (
          <SubjectCarousel query={query} onSelect={selectSubject} />
        )}
      </div>

      {selectedTemplate && subject && (
        <ActivitySetupDialog
          template={selectedTemplate}
          initialSubject={subject}
          initialSchoolYear={schoolYear}
          initialTopicCode={selectedTopicCode}
          onClose={() => setSelectedTemplate(null)}
          onCreate={applyActivitySetup}
        />
      )}
    </div>
  )
}

function SubjectCarousel({
  query,
  onSelect,
}: {
  query: string
  onSelect: (subject: Subject) => void
}) {
  const filteredSubjectCards = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim())

    if (!normalizedQuery) return subjects

    return subjects.filter((card) =>
      normalizeSearch(`${card.label} ${card.value}`).includes(normalizedQuery)
    )
  }, [query])
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(filteredSubjectCards.length)

  return (
    <section className="mt-10" aria-labelledby="pesquisa-por-materia">
      <h3
        id="pesquisa-por-materia"
        className="pb-4 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]"
      >
        Pesquise por matéria
      </h3>

      <div className="relative isolate">
        <button
          type="button"
          aria-label="Ver matérias anteriores"
          aria-controls="subject-carousel"
          disabled={!canScrollPrevious}
          onClick={() => scroll("previous")}
          className="group absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
        >
          <AltArrowLeftIcon
            size={20}
            strokeWidth={1.5}
            className="transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        <div
          ref={trackRef}
          id="subject-carousel"
          className="relative z-0 no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-5 overflow-x-auto scroll-smooth px-1 py-1 motion-reduce:scroll-auto sm:gap-7"
        >
          {filteredSubjectCards.length > 0 ? (
            filteredSubjectCards.map(
              ({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSelect(value)}
                  className="group/card relative h-[102px] w-[min(22.375rem,calc(100vw-3rem))] shrink-0 snap-start overflow-hidden rounded-[20px] bg-neutral-100 px-5 text-left outline-none focus-visible:ring-3 focus-visible:ring-orange-600/45"
                >
                  <span className="relative z-10 flex h-full w-full items-center justify-center text-center text-base font-semibold text-foreground">
                    {label}
                  </span>
                </button>
              )
            )
          ) : (
            <p className="w-full rounded-2xl border border-dashed bg-white/60 px-4 py-8 text-center text-sm text-muted-foreground">
              Nenhuma matéria encontrada para essa busca.
            </p>
          )}
        </div>

        <button
          type="button"
          aria-label="Ver próximas matérias"
          aria-controls="subject-carousel"
          disabled={!canScrollNext}
          onClick={() => scroll("next")}
          className="group absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
        >
          <AltArrowRightIcon
            size={20}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </section>
  )
}

type ActivityTemplate = {
  id: ActivityTemplateId
  kind: string
  background: string
}

type ActivitySetup = {
  subject: Subject
  schoolYear: string
  topicCode: string
}

const activityTemplates: ActivityTemplate[] = [
  {
    id: "categorization",
    kind: "Jogo",
    background: "#DDFBE6",
  },
  {
    id: "summary",
    kind: "Folha de atividades para impressão",
    background: "#DDDFFE",
  },
  {
    id: "mixed-review",
    kind: "Folha de atividades para impressão",
    background: "#D5D8FF",
  },
  {
    id: "matching",
    kind: "Quadro branco",
    background: "#DCEEFF",
  },
  {
    id: "fill-blank",
    kind: "Jogo",
    background: "#DDF5F8",
  },
  {
    id: "multiple-choice",
    kind: "Jogo",
    background: "#DCFBE6",
  },
  {
    id: "word-search",
    kind: "Folha para impressão",
    background: "#FCE5C5",
  },
  {
    id: "story-map",
    kind: "Quadro branco",
    background: "#F7DDF2",
  },
]

type ActivityCopy = {
  title: string
  description: string
}

const activityCopyBySubject: Record<
  Subject,
  Record<ActivityTemplateId, ActivityCopy>
> = {
  "Língua Portuguesa": {
    categorization: {
      title: "Palavras em grupos",
      description: "Organize palavras, imagens e sentidos por categorias.",
    },
    summary: {
      title: "Ideias do texto",
      description: "Registre as ideias principais de uma leitura.",
    },
    "mixed-review": {
      title: "Missão de leitura",
      description: "Revise leitura, escrita e convenções da língua.",
    },
    matching: {
      title: "Palavra e sentido",
      description: "Relacione palavras, pistas e significados.",
    },
    "fill-blank": {
      title: "Complete a frase",
      description: "Escolha palavras que completam o texto com sentido.",
    },
    "multiple-choice": {
      title: "Desafio de interpretação",
      description: "Verifique a compreensão de textos e enunciados.",
    },
    "word-search": {
      title: "Caça-palavras temático",
      description: "Encontre vocabulário relacionado ao tema estudado.",
    },
    "story-map": {
      title: "Mapa da história",
      description: "Organize personagens, cenário e acontecimentos.",
    },
  },
}

function getActivityCopy(
  template: ActivityTemplate,
  subject: Subject,
  schoolYear: string | null
) {
  const copy = activityCopyBySubject[subject][template.id]

  if (!schoolYear) return copy

  const year = Number(schoolYear)
  const stageDescription =
    year <= 3
      ? "Proposta lúdica, com apoio visual para a etapa inicial."
      : year <= 6
        ? "Proposta contextualizada para ampliar estratégias e autonomia."
        : "Proposta investigativa para aprofundar análise e argumentação."

  return {
    ...copy,
    description: `${copy.description} ${stageDescription}`,
  }
}

function ActivityTemplateCarousel({
  subject,
  schoolYear,
  query,
  onSelect,
  onBack,
}: {
  subject: Subject
  schoolYear: string | null
  query: string
  onSelect: (template: ActivityTemplate) => void
  onBack: () => void
}) {
  const filteredTemplates = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim())

    if (!normalizedQuery) return activityTemplates

    return activityTemplates.filter((template) => {
      const copy = getActivityCopy(template, subject, schoolYear)

      return normalizeSearch(
        `${template.kind} ${copy.title} ${copy.description}`
      ).includes(normalizedQuery)
    })
  }, [query, schoolYear, subject])
  const { trackRef, canScrollPrevious, canScrollNext, scroll } =
    useHorizontalCarousel(filteredTemplates.length)

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "auto" })
  }, [query, schoolYear, subject, trackRef])

  return (
    <section className="mt-10" aria-labelledby="materiais-sugeridos">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <h3
          id="materiais-sugeridos"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]"
        >
          Crie materiais para {getSubjectLabel(subject)}
        </h3>
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-white/85 px-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:translate-y-0"
        >
          <AltArrowLeftIcon
            size={16}
            strokeWidth={1.5}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Voltar às matérias
        </button>
      </div>

      <div className="relative isolate">
        <button
          type="button"
          aria-label="Ver atividades anteriores"
          aria-controls="activity-template-carousel"
          disabled={!canScrollPrevious}
          onClick={() => scroll("previous")}
          className="group absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
        >
          <AltArrowLeftIcon
            size={20}
            strokeWidth={1.5}
            className="transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        <div
          ref={trackRef}
          id="activity-template-carousel"
          className="relative z-0 no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-5 overflow-x-auto scroll-smooth px-1 py-1 motion-reduce:scroll-auto sm:gap-6"
        >
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => {
              const copy = getActivityCopy(template, subject, schoolYear)

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => onSelect(template)}
                  className="group/template relative isolate h-36 w-[min(17.75rem,calc(100vw-4rem))] shrink-0 cursor-pointer snap-start overflow-hidden rounded-[24px] bg-neutral-100 p-5 text-left focus-visible:ring-3 focus-visible:ring-orange-600/45"
                >
                  <span className="absolute top-5 left-5 z-10 inline-flex rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
                    {template.kind}
                  </span>
                  <span className="absolute right-5 bottom-5 left-5 z-10 text-lg font-semibold tracking-tight text-foreground">
                    {copy.title}
                  </span>
                </button>
              )
            })
          ) : (
            <p className="w-full rounded-2xl border border-dashed bg-white/60 px-4 py-12 text-center text-sm text-muted-foreground">
              Nenhum modelo encontrado para essa busca.
            </p>
          )}
        </div>

        <button
          type="button"
          aria-label="Ver próximas atividades"
          aria-controls="activity-template-carousel"
          disabled={!canScrollNext}
          onClick={() => scroll("next")}
          className="group absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
        >
          <AltArrowRightIcon
            size={20}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </section>
  )
}

function ActivitySetupDialog({
  template,
  initialSubject,
  initialSchoolYear,
  initialTopicCode,
  onClose,
  onCreate,
}: {
  template: ActivityTemplate
  initialSubject: Subject
  initialSchoolYear: string | null
  initialTopicCode: string | null
  onClose: () => void
  onCreate: (setup: ActivitySetup) => void
}) {
  const [draftSubject, setDraftSubject] = useState<Subject>(initialSubject)
  const [draftSchoolYear, setDraftSchoolYear] = useState<string | null>(
    initialSchoolYear
  )
  const [draftTopicCode, setDraftTopicCode] = useState<string | null>(
    initialTopicCode
  )
  const [topicQuery, setTopicQuery] = useState("")
  const topics = useMemo(
    () => getTopicsForFilters(draftSubject, draftSchoolYear),
    [draftSchoolYear, draftSubject]
  )
  const filteredTopics = useMemo(
    () => filterTopics(topics, topicQuery),
    [topicQuery, topics]
  )

  const copy = getActivityCopy(template, draftSubject, draftSchoolYear)
  const selectedTopic = topics.find((topic) => topic.code === draftTopicCode)
  const canCreate = Boolean(draftSchoolYear && selectedTopic)

  return (
    <Dialog
      open
      modal
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        aria-describedby="activity-template-description"
        className="relative max-w-6xl overflow-visible"
      >
        <div className="grid h-[min(43rem,calc(100dvh-2rem))] grid-rows-[minmax(10rem,0.38fr)_minmax(0,1fr)] overflow-hidden rounded-[28px] bg-background shadow-2xl sm:grid-rows-[minmax(13rem,0.42fr)_minmax(0,1fr)] lg:h-[min(43rem,calc(100dvh-4rem))] lg:grid-cols-[minmax(0,1.35fr)_minmax(23rem,0.85fr)] lg:grid-rows-1">
          <div
            className="relative flex min-h-0 items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-12"
            style={{
              backgroundColor: getActivityCardBackground(
                draftSubject,
                draftSchoolYear,
                template.background
              ),
            }}
          >
            <DialogClose
              aria-label="Fechar configuração da atividade"
              className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95"
            >
              <IconX size={20} stroke={1.8} />
            </DialogClose>
            <div className="flex w-full max-w-md flex-col items-center text-center">
              <span className="self-start rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
                {template.kind}
              </span>
              <ContextualActivityIllustration
                subject={draftSubject}
                schoolYear={draftSchoolYear}
                templateId={template.id}
                className="mt-2 h-24 w-full max-w-40 drop-shadow-sm sm:mt-3 sm:h-40 sm:max-w-xs lg:mt-5 lg:h-72 lg:max-w-sm"
              />
              <p className="mt-1 max-w-sm text-center text-xs leading-5 text-slate-700 sm:mt-2 sm:text-sm sm:leading-6">
                Personalize a atividade com a disciplina, o ano escolar e uma
                habilidade da BNCC.
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-col bg-background">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7">
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription
                id="activity-template-description"
                className="mt-2"
              >
                {copy.description}
              </DialogDescription>

              <div className="mt-7 grid gap-5">
                <div className="grid gap-2">
                  <label
                    id="activity-template-subject-label"
                    className="text-sm font-semibold text-foreground"
                  >
                    Disciplina
                  </label>
                  <Select
                    value={draftSubject}
                    onValueChange={(value) => {
                      if (!value) return

                      setDraftSubject(value as Subject)
                      setDraftTopicCode(null)
                      setTopicQuery("")
                    }}
                    items={subjects}
                  >
                    <SelectTrigger
                      aria-labelledby="activity-template-subject-label"
                      className="w-full cursor-pointer rounded-xl bg-white px-3 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                    >
                      <SelectValue placeholder="Disciplina" />
                    </SelectTrigger>
                    <SelectContent align="start" positionerClassName="z-[70]">
                      <SelectGroup>
                        {subjects.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            className="cursor-pointer"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label
                    id="activity-template-year-label"
                    className="text-sm font-semibold text-foreground"
                  >
                    Ano
                  </label>
                  <Select
                    value={draftSchoolYear}
                    onValueChange={(value) => {
                      if (!value) return

                      setDraftSchoolYear(value as string)
                      setDraftTopicCode(null)
                      setTopicQuery("")
                    }}
                    items={schoolYears}
                  >
                    <SelectTrigger
                      aria-labelledby="activity-template-year-label"
                      className="w-full cursor-pointer rounded-xl bg-white px-3 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                    >
                      <SelectValue placeholder="Selecione um ano" />
                    </SelectTrigger>
                    <SelectContent align="start" positionerClassName="z-[70]">
                      <SelectGroup>
                        {schoolYears.map((year) => (
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

                <div className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    Tópico da BNCC
                  </span>
                  {draftSchoolYear ? (
                    <div className="overflow-hidden rounded-xl border bg-white">
                      <div className="border-b p-3">
                        <div className="relative">
                          <MagnifierIcon
                            size={20}
                            strokeWidth={1.5}
                            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                          />
                          <Input
                            value={topicQuery}
                            onChange={(event) =>
                              setTopicQuery(event.target.value)
                            }
                            aria-label="Pesquisar tópicos ou códigos da BNCC"
                            placeholder="Pesquise tópicos ou códigos..."
                            className="h-10 rounded-lg bg-background pr-3 pl-10 text-sm shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                          />
                        </div>
                      </div>
                      <div
                        role="radiogroup"
                        aria-label="Tópicos da BNCC"
                        className="max-h-60 overflow-y-auto overscroll-contain p-1.5"
                      >
                        {filteredTopics.length > 0 ? (
                          filteredTopics.map((topic) => {
                            const isSelected = topic.code === draftTopicCode

                            return (
                              <button
                                key={topic.code}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => setDraftTopicCode(topic.code)}
                                className={cn(
                                  "flex w-full cursor-pointer items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-blue-50/70 focus-visible:ring-2 focus-visible:ring-blue-500/45 focus-visible:outline-none",
                                  isSelected && "bg-blue-50"
                                )}
                              >
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
                                  <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted-foreground">
                                    {topic.description}
                                  </span>
                                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                                    ({topic.code})
                                  </span>
                                </span>
                              </button>
                            )
                          })
                        ) : (
                          <p className="px-3 py-7 text-center text-sm text-muted-foreground">
                            Nenhum tópico encontrado para essa busca.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-xl border border-dashed bg-muted/25 px-4 py-5 text-sm leading-6 text-muted-foreground">
                      Selecione o ano para ver as habilidades disponíveis da
                      BNCC.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t bg-white p-4 sm:p-5">
              <Button
                type="button"
                onClick={() => {
                  if (!draftSchoolYear || !selectedTopic) return

                  onCreate({
                    subject: draftSubject,
                    schoolYear: draftSchoolYear,
                    topicCode: selectedTopic.code,
                  })
                  toast.success("Atividade pronta para criação", {
                    description: `${copy.title} configurada para ${getSubjectLabel(draftSubject)}, ${schoolYears.find((year) => year.value === draftSchoolYear)?.label ?? "ano selecionado"}.`,
                  })
                }}
                disabled={!canCreate}
                className="h-11 w-full rounded-xl bg-orange-600 text-base font-semibold text-white hover:bg-orange-700 focus-visible:border-orange-600 focus-visible:ring-orange-600/35"
              >
                <DocumentAddIcon size={20} />
                Criar atividade com a IA
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TopicPicker({
  topics,
  selectedCode,
  disabled,
  onSelect,
}: {
  topics: BnccTopic[]
  selectedCode: string | null
  disabled: boolean
  onSelect: (code: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [topicQuery, setTopicQuery] = useState("")
  const [position, setPosition] = useState<{
    top: number
    left: number
    width: number
    maxHeight: number
  } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const selectedTopic = topics.find((topic) => topic.code === selectedCode)
  const filteredTopics = useMemo(
    () => filterTopics(topics, topicQuery),
    [topicQuery, topics]
  )

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const viewport = window.visualViewport
    const viewportWidth = viewport?.width ?? window.innerWidth
    const viewportHeight = viewport?.height ?? window.innerHeight
    const edgeGap = 16
    const popupGap = 8
    const width = Math.min(512, viewportWidth - edgeGap * 2)
    const roomBelow = viewportHeight - rect.bottom - popupGap - edgeGap
    const roomAbove = rect.top - popupGap - edgeGap
    const roomForPopup = Math.max(roomBelow, roomAbove)
    const useViewportHeight = roomForPopup < 240
    const openBelow = roomBelow >= 320 || roomBelow >= roomAbove
    const maxHeight = Math.max(
      1,
      Math.min(
        500,
        useViewportHeight
          ? viewportHeight - edgeGap * 2
          : openBelow
            ? roomBelow
            : roomAbove
      )
    )
    const top = useViewportHeight
      ? edgeGap
      : openBelow
        ? rect.bottom + popupGap
        : Math.max(edgeGap, rect.top - popupGap - maxHeight)
    const left = Math.min(
      Math.max(edgeGap, rect.right - width),
      viewportWidth - width - edgeGap
    )

    setPosition({ top, left, width, maxHeight })
  }, [])

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node

      if (
        !triggerRef.current?.contains(target) &&
        !popupRef.current?.contains(target)
      ) {
        setOpen(false)
        setTopicQuery("")
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        setTopicQuery("")
        triggerRef.current?.focus()
      }
    }

    function handleViewportChange() {
      updatePosition()
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleViewportChange)
    window.addEventListener("scroll", handleViewportChange, true)
    window.visualViewport?.addEventListener("resize", handleViewportChange)
    window.visualViewport?.addEventListener("scroll", handleViewportChange)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleViewportChange)
      window.removeEventListener("scroll", handleViewportChange, true)
      window.visualViewport?.removeEventListener("resize", handleViewportChange)
      window.visualViewport?.removeEventListener("scroll", handleViewportChange)
    }
  }, [open, updatePosition])

  function handleTriggerClick() {
    if (open) {
      setOpen(false)
      setTopicQuery("")
      return
    }

    updatePosition()
    setOpen(true)
    requestAnimationFrame(() => searchInputRef.current?.focus())
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "bncc-topic-picker" : undefined}
        onClick={handleTriggerClick}
        disabled={disabled}
        className={cn(
          "group flex h-9 max-w-72 min-w-52 cursor-pointer items-center justify-between gap-2 rounded-full border border-blue-600 bg-white/85 px-4 text-sm text-blue-600 shadow-none transition-[background-color,border-color,color,box-shadow] outline-none hover:border-blue-700 hover:bg-blue-50 focus-visible:border-blue-600 focus-visible:ring-3 focus-visible:ring-blue-600/35 disabled:cursor-not-allowed disabled:opacity-50",
          selectedTopic &&
            "border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700 [&_svg]:text-white"
        )}
      >
        <span className="min-w-0 flex-1 truncate text-left">
          {selectedTopic?.title ?? "Tópico"}
        </span>
        <AltArrowDownIcon
          size={16}
          strokeWidth={1.5}
          className={cn(
            "shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open &&
        position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popupRef}
            id="bncc-topic-picker"
            role="dialog"
            aria-label="Selecionar tópico da BNCC"
            className="fixed z-50 flex origin-top animate-in flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-xl ring-1 ring-foreground/10 fade-in-0 outline-none zoom-in-95"
            style={position}
          >
            <div className="shrink-0 border-b p-4 pb-3">
              <div className="relative">
                <MagnifierIcon
                  size={20}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  ref={searchInputRef}
                  value={topicQuery}
                  onChange={(event) => setTopicQuery(event.target.value)}
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
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => {
                  const isSelected = topic.code === selectedCode

                  return (
                    <label
                      key={topic.code}
                      htmlFor={`bncc-topic-${topic.code}`}
                      className={cn(
                        "group/topic flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors outline-none hover:bg-blue-100 has-[:focus-visible]:bg-blue-100 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600/45",
                        isSelected && "bg-blue-50"
                      )}
                    >
                      <input
                        id={`bncc-topic-${topic.code}`}
                        type="radio"
                        name="bncc-topic"
                        value={topic.code}
                        checked={isSelected}
                        onChange={() => {
                          onSelect(topic.code)
                          setOpen(false)
                          setTopicQuery("")
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
