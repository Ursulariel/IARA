"use client"

import { useState } from "react"
import { AltArrowLeftIcon } from "@solar-icons/react/outline/alt-arrow-left"
import { AltArrowRightIcon } from "@solar-icons/react/outline/alt-arrow-right"
import { cn } from "cn"

export type DateRange = {
  from?: Date
  to?: Date
}

type CalendarProps = {
  selected?: Date
  onSelect?: (date: Date) => void
  selectedRange?: DateRange
  onSelectRange?: (range: DateRange) => void
  className?: string
}

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"]

function sameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export function Calendar({
  selected,
  onSelect,
  selectedRange,
  onSelectRange,
  className,
}: CalendarProps) {
  const [month, setMonth] = useState(
    () => selectedRange?.from ?? selected ?? new Date()
  )
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate()
  const today = new Date()
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    return new Date(month.getFullYear(), month.getMonth(), index + 1)
  })

  return (
    <div className={cn("w-[18rem] p-3", className)}>
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-foreground capitalize">
          {month.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Mês anterior"
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
            }
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            <AltArrowLeftIcon size={16} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Próximo mês"
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
            }
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            <AltArrowRightIcon size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((weekday, index) => (
          <span
            key={`${weekday}-${index}`}
            className="flex size-8 items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {weekday}
          </span>
        ))}
        {Array.from({ length: firstDay.getDay() }, (_, index) => (
          <span key={`empty-${index}`} className="size-8" />
        ))}
        {days.map((day) => {
          const isSelected = selected && sameDay(day, selected)
          const isRangeStart =
            selectedRange?.from && sameDay(day, selectedRange.from)
          const isRangeEnd = selectedRange?.to && sameDay(day, selectedRange.to)
          const isInRange =
            selectedRange?.from &&
            selectedRange?.to &&
            day > selectedRange.from &&
            day < selectedRange.to
          const isToday = sameDay(day, today)
          const isRangeSelection = Boolean(onSelectRange)
          const isRangeDay = Boolean(isRangeStart || isRangeEnd || isInRange)
          const rangeShape =
            isRangeStart && isRangeEnd
              ? "rounded-md"
              : isRangeStart
                ? "rounded-l-md rounded-r-none"
                : isRangeEnd
                  ? "rounded-r-md rounded-l-none"
                  : "rounded-none"

          return (
            <button
              key={day.toISOString()}
              type="button"
              aria-label={day.toLocaleDateString("pt-BR", {
                dateStyle: "full",
              })}
              aria-pressed={
                isRangeSelection
                  ? Boolean(isRangeStart || isRangeEnd)
                  : isSelected
              }
              onClick={() => {
                if (!onSelectRange) {
                  onSelect?.(day)
                  return
                }

                if (!selectedRange?.from || selectedRange.to) {
                  onSelectRange({ from: day })
                  return
                }

                onSelectRange(
                  day < selectedRange.from
                    ? { from: day, to: selectedRange.from }
                    : { from: selectedRange.from, to: day }
                )
              }}
              className={cn(
                "flex size-8 items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600",
                isRangeDay
                  ? cn(
                      "-mx-0.5 w-9 bg-orange-100 text-orange-900 hover:bg-orange-200",
                      rangeShape,
                      (isRangeStart || isRangeEnd) &&
                        "bg-orange-600 text-white hover:bg-orange-700"
                    )
                  : isSelected
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "hover:bg-orange-50",
                isToday &&
                  !isSelected &&
                  !isRangeStart &&
                  !isRangeEnd &&
                  "font-semibold text-orange-700"
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
