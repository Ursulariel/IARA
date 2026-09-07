"use client"

import { useState } from "react"
import type { ElementType, KeyboardEvent, ReactNode } from "react"
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

import { ModelExplorer } from "@/components/model-explorer"
import { useHorizontalCarousel } from "@/hooks/use-horizontal-carousel"

type Action = {
  title: string
  icon: ElementType
  color: string
}

type View = "inicio" | "modelos"

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

export function CreationActions() {
  const [view, setView] = useState<View>("inicio")
  const {
    trackRef: actionsRef,
    canScrollPrevious,
    canScrollNext,
    scroll: scrollActions,
    maskImage: carouselMaskImage,
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
    <>
      <section
        className="relative overflow-hidden px-4 pt-6 pb-8 sm:pt-8 lg:px-6"
        aria-labelledby="acoes-de-criacao"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-amber-50 via-white to-transparent" />
        <div className="relative">
          <div className="pointer-events-none absolute -top-20 -left-20 size-48 rounded-full bg-amber-200/45 blur-3xl" />
          <div className="pointer-events-none absolute -top-4 -right-20 size-48 rounded-full bg-blue-200/45 blur-3xl" />
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
                      carouselMaskImage
                        ? {
                            maskImage: carouselMaskImage,
                            WebkitMaskImage: carouselMaskImage,
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
        <h2 className="px-4 pb-4 font-heading text-base font-medium lg:px-6">
          Histórico de interações
        </h2>
      )}
    </>
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
