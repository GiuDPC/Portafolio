import { useState, useEffect } from "react"

/**
 * Tracks which section ID is currently visible in the viewport
 * using IntersectionObserver for performant scroll detection.
 */
export function useActiveSection(sectionIds: string[], options?: { rootMargin?: string; threshold?: number }) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting from top
        const visibleEntries = entries.filter(e => e.isIntersecting)
        if (visibleEntries.length > 0) {
          // Pick the one closest to the top
          const sorted = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          setActiveId(sorted[0].target.id)
        }
      },
      {
        rootMargin: options?.rootMargin ?? "-20% 0px -60% 0px",
        threshold: options?.threshold ?? 0,
      }
    )

    // Small delay to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [sectionIds, options?.rootMargin, options?.threshold])

  return activeId
}
