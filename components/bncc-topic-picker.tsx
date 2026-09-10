"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AltArrowDownIcon } from "@solar-icons/react/outline/alt-arrow-down"
import { MagnifierIcon } from "@solar-icons/react/outline/magnifier"
import { IconX } from "@tabler/icons-react"
import { cn } from "cn"

import { Input } from "@/components/ui/input"

export type BnccTopic = {
  code: string
  component: string
  years: number[]
  title: string
  description: string
  context?: string
}

export function BnccTopicPicker({
  id,
  topics,
  selectedCode,
  onSelect,
  triggerClassName,
  placeholder = "Selecione um tópico",
}: {
  id: string
  topics: BnccTopic[]
  selectedCode: string
  onSelect: (code: string) => void
  triggerClassName?: string
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [position, setPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
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
    const maxHeight = Math.max(1, Math.min(500, openBelow ? roomBelow : roomAbove))

    setPosition({
      top: openBelow ? rect.bottom + popupGap : Math.max(edgeGap, rect.top - popupGap - maxHeight),
      left: Math.min(Math.max(edgeGap, rect.right - width), viewportWidth - width - edgeGap),
      width,
      height: maxHeight,
    })
  }, [])

  useEffect(() => {
    if (!open) return

    function closeOnOutside(event: PointerEvent) {
      const target = event.target as Node
      if (!triggerRef.current?.contains(target) && !popupRef.current?.contains(target)) {
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
        className={cn(
          "flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-input bg-white px-3 text-sm text-foreground shadow-none outline-none transition-[background-color,border-color,box-shadow] hover:border-blue-500 hover:bg-blue-50 focus-visible:border-orange-500 focus-visible:ring-3 focus-visible:ring-orange-500/35",
          triggerClassName
        )}
      >
        <span className="min-w-0 flex-1 truncate text-left">
          {selectedTopic?.title ?? placeholder}
        </span>
        <AltArrowDownIcon size={16} strokeWidth={1.5} className={cn("shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && position && createPortal(
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
              <h3 className="font-heading text-lg font-semibold text-foreground">Tópicos da BNCC</h3>
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
              <MagnifierIcon size={20} strokeWidth={1.5} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Pesquisar tópicos da BNCC"
                placeholder="Pesquise tópicos ou códigos..."
                className="h-11 rounded-xl bg-background pr-3 pl-10 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/35"
              />
            </div>
            <p className="pt-2 text-xs text-muted-foreground">{filteredTopics.length} habilidade{filteredTopics.length === 1 ? "" : "s"} encontrada{filteredTopics.length === 1 ? "" : "s"}</p>
          </div>
          <div role="radiogroup" aria-label="Tópicos da BNCC" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
            {filteredTopics.length ? filteredTopics.map((topic) => {
              const isSelected = topic.code === selectedCode
              return (
                <label key={topic.code} className={cn("group/topic flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-blue-100 has-[:focus-visible]:bg-blue-100 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600/45", isSelected && "bg-blue-50")}>
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
                  <span aria-hidden="true" className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-muted-foreground/60", isSelected && "border-blue-600 bg-blue-600")}>
                    {isSelected && <span className="size-2 rounded-full bg-white" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground">{topic.title}</span>
                    <span className="mt-1 line-clamp-3 block text-sm leading-5 text-muted-foreground">{topic.description}</span>
                    <span className="mt-1.5 block text-xs font-medium text-muted-foreground">({topic.code}){topic.context ? ` · ${topic.context}` : ""}</span>
                  </span>
                </label>
              )
            }) : <p className="px-3 py-8 text-center text-sm text-muted-foreground">Nenhum tópico encontrado para essa busca.</p>}
          </div>
          <p className="shrink-0 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">Objetos de conhecimento, descrições e códigos da BNCC 2018.</p>
        </div>,
        document.body
      )}
    </>
  )
}
