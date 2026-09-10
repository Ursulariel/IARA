"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CalendarIcon } from "@solar-icons/react/outline/calendar"
import { IconX } from "@tabler/icons-react"

import { Calendar, type DateRange } from "@/components/ui/calendar"

type DateRangePickerProps = {
  value: DateRange
  onValueChange: (value: DateRange) => void
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function getThisWeek() {
  const today = startOfDay(new Date())
  const day = today.getDay() || 7
  const from = new Date(today)
  from.setDate(today.getDate() - day + 1)
  const to = new Date(from)
  to.setDate(from.getDate() + 4)
  return { from, to }
}

function formatDate(date?: Date) {
  return date?.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

export function DateRangePicker({
  value,
  onValueChange,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const label = value.from
    ? `${formatDate(value.from)}${value.to ? ` — ${formatDate(value.to)}` : " — …"}`
    : "Selecione um período"

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const viewport = window.visualViewport
    const viewportWidth = viewport?.width ?? window.innerWidth
    const viewportHeight = viewport?.height ?? window.innerHeight
    const edgeGap = 16
    const width = Math.min(336, viewportWidth - edgeGap * 2)
    const roomBelow = viewportHeight - rect.bottom - edgeGap
    const openAbove = roomBelow < 420 && rect.top > roomBelow

    setPosition({
      top: openAbove ? Math.max(edgeGap, rect.top - 420) : rect.bottom + 8,
      left: Math.min(
        Math.max(edgeGap, rect.right - width),
        viewportWidth - width - edgeGap
      ),
      width,
    })
  }, [])

  useEffect(() => {
    if (!open) return

    function closeOnOutside(event: PointerEvent) {
      const target = event.target as Node
      if (
        !triggerRef.current?.contains(target) &&
        !popupRef.current?.contains(target)
      )
        setOpen(false)
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
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

  function openPicker() {
    updatePosition()
    setOpen(true)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "planning-date-range" : undefined}
        onClick={() => (open ? setOpen(false) : openPicker())}
        className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border border-input bg-white px-3 text-left text-sm text-foreground shadow-none transition-colors outline-none hover:border-orange-400 hover:bg-orange-50 focus-visible:border-orange-500 focus-visible:ring-3 focus-visible:ring-orange-500/35"
      >
        <CalendarIcon
          size={18}
          strokeWidth={1.5}
          className="shrink-0 text-muted-foreground"
        />
        <span className="truncate">{label}</span>
      </button>
      {open &&
        position &&
        createPortal(
          <div
            ref={popupRef}
            id="planning-date-range"
            role="dialog"
            aria-label="Selecionar período do planejamento"
            className="fixed z-[90] overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-xl ring-1 ring-foreground/10"
            style={position}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-heading text-base font-semibold text-foreground">
                Período do planejamento
              </h3>
              <button
                type="button"
                aria-label="Fechar seletor de período"
                onClick={() => setOpen(false)}
                className="flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                <IconX size={18} stroke={1.8} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 px-4 pt-3">
              {[
                {
                  label: "Hoje",
                  range: {
                    from: startOfDay(new Date()),
                    to: startOfDay(new Date()),
                  },
                },
                {
                  label: "Amanhã",
                  range: (() => {
                    const date = startOfDay(new Date())
                    date.setDate(date.getDate() + 1)
                    return { from: date, to: date }
                  })(),
                },
                { label: "Esta semana", range: getThisWeek() },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onValueChange(preset.range)}
                  className="h-8 cursor-pointer rounded-full border border-input px-3 text-xs font-medium text-foreground transition-colors hover:border-orange-400 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <Calendar
              selectedRange={value}
              onSelectRange={onValueChange}
              className="mx-auto"
            />
            {value.from && (
              <button
                type="button"
                onClick={() => onValueChange({})}
                className="mx-3 mb-3 h-8 w-[calc(100%-1.5rem)] cursor-pointer rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Limpar período
              </button>
            )}
          </div>,
          document.body
        )}
    </>
  )
}
