"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type CarouselDirection = "previous" | "next"

type HorizontalCarouselOptions = {
  enabled?: boolean
  minimumScrollDistance?: number
  scrollRatio?: number
}

const SCROLL_EDGE_THRESHOLD = 2

export function useHorizontalCarousel(
  itemCount: number,
  {
    enabled = true,
    minimumScrollDistance = 0,
    scrollRatio = 0.72,
  }: HorizontalCarouselOptions = {}
) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollPrevious, setCanScrollPrevious] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollControls = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const maximumScroll = track.scrollWidth - track.clientWidth

    setCanScrollPrevious(track.scrollLeft > SCROLL_EDGE_THRESHOLD)
    setCanScrollNext(maximumScroll - track.scrollLeft > SCROLL_EDGE_THRESHOLD)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const track = trackRef.current
    if (!track) return

    updateScrollControls()
    track.addEventListener("scroll", updateScrollControls, { passive: true })

    const resizeObserver = new ResizeObserver(updateScrollControls)
    resizeObserver.observe(track)

    return () => {
      track.removeEventListener("scroll", updateScrollControls)
      resizeObserver.disconnect()
    }
  }, [enabled, itemCount, updateScrollControls])

  const scroll = useCallback(
    (direction: CarouselDirection) => {
      const track = trackRef.current
      if (!track) return

      const distance = Math.max(
        minimumScrollDistance,
        track.clientWidth * scrollRatio
      )

      track.scrollBy({
        left: direction === "next" ? distance : -distance,
        behavior: "smooth",
      })
    },
    [minimumScrollDistance, scrollRatio]
  )

  return {
    trackRef,
    canScrollPrevious,
    canScrollNext,
    scroll,
    maskImage: getCarouselMaskImage(canScrollPrevious, canScrollNext),
  }
}

function getCarouselMaskImage(
  canScrollPrevious: boolean,
  canScrollNext: boolean
) {
  if (canScrollPrevious && canScrollNext) {
    return "linear-gradient(to right, transparent 0%, black 3rem, black calc(100% - 3rem), transparent 100%)"
  }

  if (canScrollPrevious) {
    return "linear-gradient(to right, transparent 0%, black 3rem, black 100%)"
  }

  if (canScrollNext) {
    return "linear-gradient(to right, black 0%, black calc(100% - 3rem), transparent 100%)"
  }

  return undefined
}
