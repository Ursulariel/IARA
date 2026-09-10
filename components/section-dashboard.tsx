"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { CalendarIcon } from "@solar-icons/react/outline/calendar"
import { MagnifierIcon } from "@solar-icons/react/outline/magnifier"
import { IconX } from "@tabler/icons-react"
import { BnccTopicPicker, type BnccTopic } from "@/components/bncc-topic-picker"
import {
  AnalyticsIllustration,
  ClassroomIllustration,
  type PaletteName,
  TextDocumentIllustration,
} from "@/components/document-card-illustrations"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import bnccCatalog from "@/data/bncc-topics.json"

const CreateClassroomDialog = dynamic(
  () =>
    import("@/components/creation-actions").then(
      (module) => module.CreateClassroomDialog
    ),
  { ssr: false }
)
const CreateAssessmentDialog = dynamic(
  () =>
    import("@/components/creation-actions").then(
      (module) => module.CreateAssessmentDialog
    ),
  { ssr: false }
)
const CreatePlanningDialog = dynamic(
  () =>
    import("@/components/creation-actions").then(
      (module) => module.CreatePlanningDialog
    ),
  { ssr: false }
)

type DashboardSection = "turmas" | "avaliacoes" | "planejamentos" | "analises"

type DashboardCard = {
  title: string
  detail: string
  badge: string
  palette: PaletteName
  type: "document" | "analysis" | "classroom"
  letter?: string
  createdDate?: string
  schoolYear?: string
  classroom?: string
  topic?: string
}

type FilterState = {
  createdDate: string
  schoolYear: string
  classroomQuery: string
  topic: string
}

const bnccTopics = (bnccCatalog.topics as BnccTopic[]).filter(
  (topic) =>
    topic.component === "Língua Portuguesa" &&
    topic.years.some((year) => year === 1 || year === 2)
)

const dashboardContent: Record<
  DashboardSection,
  {
    title: string
    description: string
    action: string
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
    metricLabel: "Panorama das turmas",
    metrics: [
      { value: "5", label: "turmas ativas" },
      { value: "118", label: "estudantes" },
      { value: "92%", label: "participação média" },
    ],
    cardsTitle: "Turmas em acompanhamento",
    cards: [
      {
        title: "1º ano A",
        detail: "24 estudantes",
        badge: "Turma",
        palette: "orange-light",
        type: "classroom",
        letter: "A",
      },
      {
        title: "2º ano A",
        detail: "23 estudantes",
        badge: "Turma",
        palette: "blue-deep",
        type: "classroom",
        letter: "A",
      },
      {
        title: "1º ano B",
        detail: "25 estudantes",
        badge: "Turma",
        palette: "orange-deep",
        type: "classroom",
        letter: "B",
      },
      {
        title: "2º ano B",
        detail: "22 estudantes",
        badge: "Turma",
        palette: "blue-light",
        type: "classroom",
        letter: "B",
      },
    ],
  },
  avaliacoes: {
    title: "Avaliações",
    description:
      "Crie instrumentos de avaliação e acompanhe evidências de aprendizagem por turma.",
    action: "Criar avaliação",
    metricLabel: "Panorama das avaliações",
    metrics: [
      { value: "5", label: "avaliações em andamento" },
      { value: "2", label: "aguardando aplicação" },
      { value: "78%", label: "aprendizagens consolidadas" },
    ],
    cardsTitle: "Avaliações recentes",
    cards: [
      {
        title: "Avaliação diagnóstica de leitura",
        detail: "1º ano A · pronta para aplicar",
        badge: "Avaliação",
        palette: "orange-light",
        type: "document",
      },
      {
        title: "Compreensão de textos curtos",
        detail: "2º ano A · em revisão",
        badge: "Avaliação",
        palette: "blue-deep",
        type: "document",
      },
      {
        title: "Leitura de palavras e sílabas",
        detail: "1º ano B · aplicada hoje",
        badge: "Avaliação",
        palette: "orange-deep",
        type: "document",
      },
      {
        title: "Convenções da escrita",
        detail: "2º ano B · pronta para aplicar",
        badge: "Avaliação",
        palette: "blue-light",
        type: "document",
      },
    ],
  },
  planejamentos: {
    title: "Planejamentos de aula",
    description:
      "Centralize os planos, mantenha a sequência didática visível e prepare a próxima aula com a IARA.",
    action: "Criar planejamento",
    metricLabel: "Panorama dos planejamentos",
    metrics: [
      { value: "5", label: "planos criados" },
      { value: "3", label: "para esta semana" },
      { value: "4", label: "atividades vinculadas" },
    ],
    cardsTitle: "Planejamentos recentes",
    cards: [
      {
        title: "Leitura compartilhada: fábulas",
        detail: "1º ano A · atualizado hoje",
        badge: "Planejamento",
        palette: "orange-light",
        type: "document",
      },
      {
        title: "Rimas e aliterações",
        detail: "2º ano A · atualizado há 4 dias",
        badge: "Planejamento",
        palette: "blue-deep",
        type: "document",
      },
      {
        title: "Sequência de leitura: parlendas",
        detail: "1º ano B · atualizado ontem",
        badge: "Planejamento",
        palette: "orange-deep",
        type: "document",
      },
      {
        title: "Roda de conversa literária",
        detail: "2º ano B · atualizado na semana passada",
        badge: "Planejamento",
        palette: "blue-light",
        type: "document",
      },
    ],
  },
  analises: {
    title: "Análises",
    description:
      "Transforme registros e resultados em uma leitura clara para orientar suas decisões pedagógicas.",
    action: "Criar análise",
    metricLabel: "Panorama das análises",
    metrics: [
      { value: "4", label: "análises disponíveis" },
      { value: "2", label: "pontos de atenção" },
      { value: "82%", label: "engajamento médio" },
    ],
    cardsTitle: "Análises recentes",
    cards: [
      {
        title: "Mapa de conceitos",
        detail: "1º ano A · atualizado hoje",
        badge: "Análise",
        palette: "orange-light",
        type: "analysis",
      },
      {
        title: "Evolução da leitura",
        detail: "2º ano A · atualizado ontem",
        badge: "Análise",
        palette: "blue-deep",
        type: "analysis",
      },
      {
        title: "Participação nas atividades",
        detail: "1º ano B · atualizado há 2 dias",
        badge: "Análise",
        palette: "orange-deep",
        type: "analysis",
      },
      {
        title: "Progresso da turma",
        detail: "2º ano B · atualizado na semana passada",
        badge: "Análise",
        palette: "blue-light",
        type: "analysis",
      },
    ],
  },
}

const MOCK_CARDS_EVENT = "iara:mock-cards-updated"
const emptyDashboardCards: DashboardCard[] = []
const mockCardsCache = new Map<DashboardSection, DashboardCard[]>()

function readMockCards(section: DashboardSection) {
  if (typeof window === "undefined") return emptyDashboardCards

  const cachedCards = mockCardsCache.get(section)
  if (cachedCards) return cachedCards

  try {
    const storedCards = window.localStorage.getItem(
      `iara:mock-cards:${section}`
    )
    const cards = storedCards ? JSON.parse(storedCards) : emptyDashboardCards
    const normalizedCards = Array.isArray(cards)
      ? (cards as DashboardCard[])
      : emptyDashboardCards
    mockCardsCache.set(section, normalizedCards)
    return normalizedCards
  } catch {
    return emptyDashboardCards
  }
}

function subscribeToMockCards(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined

  window.addEventListener(MOCK_CARDS_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener(MOCK_CARDS_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function saveMockCards(section: DashboardSection, cards: DashboardCard[]) {
  mockCardsCache.set(section, cards)
  try {
    window.localStorage.setItem(
      `iara:mock-cards:${section}`,
      JSON.stringify(cards)
    )
  } catch {
    // The in-memory mock stays available when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(MOCK_CARDS_EVENT))
}

export function SectionDashboard({ section }: { section: DashboardSection }) {
  const content = dashboardContent[section]
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createdCards = useSyncExternalStore(
    subscribeToMockCards,
    () => readMockCards(section),
    () => emptyDashboardCards
  )
  const [filters, setFilters] = useState<FilterState>({
    createdDate: "",
    schoolYear: "all",
    classroomQuery: "",
    topic: "",
  })

  const filterableCards = useMemo(() => {
    const cards = [...createdCards, ...content.cards]
    return cards.map((card, index) => {
      const metadata = getCardMetadata(section, card, index)
      return {
        ...card,
        createdDate: card.createdDate ?? metadata.createdDate,
        schoolYear: card.schoolYear ?? metadata.schoolYear,
        classroom: card.classroom ?? metadata.classroom,
        topic: card.topic ?? metadata.topic,
      }
    })
  }, [content.cards, createdCards, section])

  function addCreatedCard(card: DashboardCard) {
    const nextCards = [
      {
        ...card,
        createdDate: new Date().toISOString().slice(0, 10),
      },
      ...createdCards,
    ]
    saveMockCards(section, nextCards)
  }
  const visibleCards = filterableCards.filter((card) => {
    return (
      (!filters.createdDate || card.createdDate === filters.createdDate) &&
      (filters.schoolYear === "all" ||
        card.schoolYear === filters.schoolYear) &&
      (!filters.classroomQuery ||
        `${card.schoolYear} ${card.classroom}`
          .toLocaleLowerCase("pt-BR")
          .includes(filters.classroomQuery.toLocaleLowerCase("pt-BR"))) &&
      (!filters.topic || card.topic === filters.topic)
    )
  })

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
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              <span className="text-lg leading-none">+</span>
              {content.action}
            </button>
          </div>
        </section>

        <section aria-label={content.metricLabel}>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.metrics.map((metric, index) => (
              <article
                key={metric.label}
                className="rounded-2xl bg-gradient-to-br from-orange-600 to-orange-400 p-5"
              >
                <p className="font-heading text-3xl font-semibold tracking-tight text-white">
                  {index === 0
                    ? String(Number(metric.value) + createdCards.length)
                    : metric.value}
                </p>
                <p className="mt-1 text-sm text-white/85">{metric.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby={`${section}-recentes`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2
              id={`${section}-recentes`}
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {content.cardsTitle}
            </h2>
            <DashboardFilters
              section={section}
              cards={filterableCards}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visibleCards.map((card) => (
              <DashboardCard key={card.title} card={card} />
            ))}
          </div>
          {visibleCards.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhum item encontrado para os filtros selecionados.
            </p>
          )}
        </section>
      </div>
      {section === "turmas" && (
        <CreateClassroomDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onCreated={({ schoolYear, letter }) => {
            addCreatedCard({
              title: `${schoolYear}º ano ${letter}`,
              detail: "0 estudantes · criada agora",
              badge: "Turma",
              palette: schoolYear === "1" ? "orange-light" : "blue-light",
              type: "classroom",
              letter,
              schoolYear: `${schoolYear}º ano`,
              classroom: letter,
            })
          }}
        />
      )}
      {section === "avaliacoes" && (
        <CreateAssessmentDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onCreated={({ title, schoolYear, classroom, topicCode }) => {
            addCreatedCard({
              title,
              detail: `${schoolYear}º ano ${classroom} · pronta para aplicar`,
              badge: "Avaliação",
              palette: schoolYear === "1" ? "orange-light" : "blue-light",
              type: "document",
              schoolYear: `${schoolYear}º ano`,
              classroom,
              topic: topicCode,
            })
          }}
        />
      )}
      {section === "planejamentos" && (
        <CreatePlanningDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onCreated={({ title, schoolYear, classroom, topicCode }) => {
            addCreatedCard({
              title,
              detail: `${schoolYear}º ano ${classroom} · criado agora`,
              badge: "Planejamento",
              palette: schoolYear === "1" ? "orange-light" : "blue-light",
              type: "document",
              schoolYear: `${schoolYear}º ano`,
              classroom,
              topic: topicCode,
            })
          }}
        />
      )}
      {section === "analises" && (
        <CreateAnalysisDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onCreated={(title) => {
            addCreatedCard({
              title,
              detail: "Criada agora",
              badge: "Análise",
              palette: "blue-deep",
              type: "analysis",
            })
          }}
        />
      )}
    </main>
  )
}

function CreateAnalysisDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (title: string) => void
}) {
  const [title, setTitle] = useState("")

  return (
    <Dialog open={open} modal onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="create-analysis-description"
        className="relative max-w-5xl overflow-visible"
      >
        <div className="grid h-[min(39rem,calc(100dvh-2rem))] grid-rows-[minmax(11rem,0.4fr)_minmax(0,1fr)] overflow-hidden rounded-[28px] bg-background shadow-2xl sm:grid-rows-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:h-[min(34rem,calc(100dvh-4rem))] lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:grid-rows-1">
          <div className="relative flex min-h-0 items-center justify-center overflow-hidden bg-blue-100 p-6 sm:p-8 lg:p-12">
            <DialogClose
              aria-label="Fechar criação de análise"
              className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-95"
            >
              <IconX size={20} stroke={1.8} />
            </DialogClose>
            <div className="flex w-full max-w-md flex-col items-center text-center">
              <span className="self-start rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold text-white">
                Nova análise
              </span>
              <AnalyticsIllustration
                palette="blue-deep"
                className="mt-3 h-36 w-full max-w-[18rem] drop-shadow-sm sm:h-48 lg:h-60"
              />
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-700">
                Transforme os registros da turma em uma leitura clara para
                orientar os próximos passos.
              </p>
            </div>
          </div>
          <div className="flex min-h-0 flex-col bg-background">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7">
              <DialogTitle>Criar uma análise</DialogTitle>
              <DialogDescription
                id="create-analysis-description"
                className="mt-2"
              >
                Nomeie a análise para organizar os dados da turma e acompanhar a
                aprendizagem.
              </DialogDescription>
              <div className="mt-7 grid gap-2">
                <label
                  htmlFor="create-analysis-title"
                  className="text-sm font-semibold text-foreground"
                >
                  Título da análise
                </label>
                <Input
                  id="create-analysis-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ex.: Evolução da leitura"
                  className="h-11 rounded-xl bg-white px-3 text-base shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
                />
              </div>
            </div>
            <div className="border-t bg-white p-4 sm:p-5">
              <Button
                type="button"
                disabled={!title.trim()}
                onClick={() => {
                  onCreated(title.trim())
                  onOpenChange(false)
                }}
                className="h-11 w-full rounded-xl bg-orange-600 text-base font-semibold text-white hover:bg-orange-700 focus-visible:border-orange-600 focus-visible:ring-orange-600/35"
              >
                Criar análise
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type DashboardCardMetadata = {
  createdDate: string
  schoolYear: string
  classroom: string
  topic?: string
}

type FilterableDashboardCard = DashboardCard & DashboardCardMetadata

function DashboardFilters({
  section,
  cards,
  filters,
  onFiltersChange,
}: {
  section: DashboardSection
  cards: FilterableDashboardCard[]
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}) {
  const schoolYears = [...new Set(cards.map((card) => card.schoolYear))]
  const supportsTopic = section === "avaliacoes" || section === "planejamentos"
  const selectedYear =
    filters.schoolYear === "all" ? null : Number(filters.schoolYear[0])
  const topics = selectedYear
    ? bnccTopics.filter((topic) => topic.years.includes(selectedYear))
    : bnccTopics

  function setFilter(key: keyof FilterState, value: string | null) {
    if (value) onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="relative">
        <MagnifierIcon
          size={17}
          strokeWidth={1.5}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={filters.classroomQuery}
          onChange={(event) =>
            onFiltersChange({ ...filters, classroomQuery: event.target.value })
          }
          aria-label="Buscar por nome da turma"
          placeholder="Nome da turma"
          className="h-10 w-40 rounded-full bg-white pr-4 pl-9 text-sm shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
        />
      </div>
      <DashboardDatePicker
        value={filters.createdDate}
        onValueChange={(createdDate) =>
          onFiltersChange({ ...filters, createdDate })
        }
      />
      <DashboardFilterSelect
        label="Ano escolar"
        value={filters.schoolYear}
        options={[
          { value: "all", label: "Ano escolar" },
          ...schoolYears.map((year) => ({ value: year, label: year })),
        ]}
        onValueChange={(value) => setFilter("schoolYear", value)}
      />
      {supportsTopic && (
        <BnccTopicPicker
          id={`dashboard-${section}-topic-picker`}
          topics={topics}
          selectedCode={filters.topic}
          onSelect={(topic) => onFiltersChange({ ...filters, topic })}
          placeholder="Tópico da BNCC"
          triggerClassName="!h-10 !w-auto min-w-40 !rounded-full px-3 hover:border-orange-400 hover:bg-orange-50"
        />
      )}
    </div>
  )
}

function DashboardFilterSelect({
  label,
  value,
  options,
  onValueChange,
}: {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onValueChange: (value: string | null) => void
}) {
  return (
    <Select value={value} onValueChange={onValueChange} items={options}>
      <SelectTrigger
        aria-label={label}
        className="h-10 min-w-34 cursor-pointer rounded-full bg-white px-3 text-sm font-normal shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35 data-[size=default]:!h-10"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" positionerClassName="z-[70]">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function DashboardDatePicker({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = value ? new Date(`${value}T12:00:00`) : undefined
  const label = selected
    ? selected.toLocaleDateString("pt-BR", { dateStyle: "medium" })
    : "Data de criação"

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Data de criação"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-input bg-white px-3 text-left text-sm font-normal text-foreground transition-colors outline-none hover:bg-orange-50 focus-visible:ring-3 focus-visible:ring-orange-500/35"
      >
        <CalendarIcon
          size={17}
          strokeWidth={1.5}
          className="text-muted-foreground"
        />
        {label}
      </button>
      {open && (
        <div className="absolute top-[calc(100%+0.4rem)] left-0 z-[80] rounded-xl bg-white shadow-xl ring-1 ring-foreground/10">
          <Calendar
            selected={selected}
            onSelect={(date) => {
              const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
              onValueChange(isoDate)
              setOpen(false)
            }}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onValueChange("")
                setOpen(false)
              }}
              className="mx-3 mb-3 h-8 w-[calc(100%-1.5rem)] cursor-pointer rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Limpar data
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function getCardMetadata(
  section: DashboardSection,
  card: DashboardCard,
  index: number
): DashboardCardMetadata {
  const schoolMatch = `${card.title} ${card.detail}`.match(
    /([12])º ano ([A-Z])/
  )
  const topic = getBnccTopic(section, card.title)

  return {
    createdDate:
      ["2026-09-10", "2026-09-07", "2026-09-02", "2026-08-23"][index] ??
      "2026-08-10",
    schoolYear: schoolMatch ? `${schoolMatch[1]}º ano` : "",
    classroom: schoolMatch?.[2] ?? "",
    topic,
  }
}

function getBnccTopic(section: DashboardSection, title: string) {
  const topics: Partial<Record<DashboardSection, Record<string, string>>> = {
    avaliacoes: {
      "Avaliação diagnóstica de leitura": "EF01LP01",
      "Compreensão de textos curtos": "EF02LP12",
      "Leitura de palavras e sílabas": "EF01LP06",
      "Convenções da escrita": "EF02LP01",
    },
    planejamentos: {
      "Leitura compartilhada: fábulas": "EF01LP16",
      "Rimas e aliterações": "EF02LP06",
      "Sequência de leitura: parlendas": "EF01LP19",
      "Roda de conversa literária": "EF02LP26",
    },
  }

  return topics[section]?.[title]
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
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {card.title}
        </h3>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {card.detail}
        </p>
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
  const className =
    "pointer-events-none absolute top-12 left-1/2 h-40 w-52 -translate-x-1/2"

  if (card.type === "classroom") {
    return (
      <ClassroomIllustration
        letter={card.letter ?? "A"}
        palette={card.palette}
        className={className}
      />
    )
  }

  if (card.type === "analysis") {
    return (
      <AnalyticsIllustration palette={card.palette} className={className} />
    )
  }

  return (
    <TextDocumentIllustration palette={card.palette} className={className} />
  )
}
