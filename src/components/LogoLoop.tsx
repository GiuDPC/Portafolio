import { memo, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { cn } from "../lib/utils"

interface LogoItem {
  node?: ReactNode
  src?: string
  alt?: string
  title?: string
  href?: string
  ariaLabel?: string
}

interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number
  direction?: "left" | "right" | "up" | "down"
  width?: number | string
  logoHeight?: number
  gap?: number
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

function toCssLength(value: number | string | undefined) {
  return typeof value === "number" ? `${value}px` : value
}

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 44,
  gap = 32,
  hoverSpeed,
  fadeOut = true,
  fadeOutColor,
  scaleOnHover = true,
  ariaLabel = "Technology logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const [isHovered, setIsHovered] = useState(false)
  const [sequenceSize, setSequenceSize] = useState(0)

  const isVertical = direction === "up" || direction === "down"

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed)
    const directionMultiplier = isVertical
      ? direction === "up" ? 1 : -1
      : direction === "left" ? 1 : -1
    const speedMultiplier = speed < 0 ? -1 : 1
    return magnitude * directionMultiplier * speedMultiplier
  }, [direction, isVertical, speed])

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)"
      return
    }

    let lastTime = 0

    const measureSequence = () => {
      const firstChild = track.firstElementChild as HTMLElement | null
      if (!firstChild) return
      const rect = firstChild.getBoundingClientRect()
      setSequenceSize(isVertical ? rect.height : rect.width)
    }

    measureSequence()

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const deltaTime = Math.max(0, (timestamp - lastTime) / 1000)
      lastTime = timestamp

      const effectiveTarget = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity
      const easingFactor = 1 - Math.exp(-deltaTime / 0.25)
      velocityRef.current += (effectiveTarget - velocityRef.current) * easingFactor

      if (sequenceSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime
        nextOffset = ((nextOffset % sequenceSize) + sequenceSize) % sequenceSize
        offsetRef.current = nextOffset
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${ -offsetRef.current }px, 0, 0)`
      }

      rafRef.current = window.requestAnimationFrame(animate)
    }

    rafRef.current = window.requestAnimationFrame(animate)
    window.addEventListener("resize", measureSequence)

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      window.removeEventListener("resize", measureSequence)
    }
  }, [hoverSpeed, isHovered, isVertical, sequenceSize, targetVelocity])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const firstChild = track.firstElementChild as HTMLElement | null
    if (!firstChild) return
    const rect = firstChild.getBoundingClientRect()
    setSequenceSize(isVertical ? rect.height : rect.width)
  }, [logos, gap, logoHeight, isVertical])

  const cssVariables = useMemo(
    () => ({
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
    }) as CSSProperties,
    [fadeOut, fadeOutColor, gap, logoHeight]
  )

  const rootClasses = cn(
    "relative overflow-hidden bg-transparent",
    scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
    className,
  )

  const renderItem = (item: LogoItem, key: string | number) => {
    const content = item.node ? (
      <span className="inline-flex items-center justify-center text-[length:var(--logoloop-logoHeight)] leading-none text-foreground/90">
        {item.node}
      </span>
    ) : item.src ? (
      <img
        src={item.src}
        alt={item.alt ?? item.title ?? "Logo"}
        className="h-[var(--logoloop-logoHeight)] w-auto object-contain"
        loading="lazy"
        draggable={false}
      />
    ) : null

    const inner = item.href ? (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-3 transition-all duration-300 hover:opacity-90",
          scaleOnHover && "transition-transform duration-300 hover:scale-105"
        )}
        aria-label={item.ariaLabel ?? item.title}
      >
        {content}
      </a>
    ) : (
      <div className="inline-flex items-center justify-center rounded-xl px-4 py-3">{content}</div>
    )

    return (
      <li
        key={key}
        className={cn(
          "flex-none shrink-0",
          isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]"
        )}
        role="listitem"
      >
        {inner}
      </li>
    )
  }

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={{ width: toCssLength(width) ?? "100%", ...cssVariables, ...style }}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {fadeOut && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[90px] bg-gradient-to-r from-card/90 via-card/30 to-transparent dark:from-background/90" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[90px] bg-gradient-to-l from-card/90 via-card/30 to-transparent dark:from-background/90" />
        </>
      )}
      <div ref={trackRef} className={cn("flex will-change-transform", isVertical ? "flex-col" : "flex-row")}> 
        <ul className={cn("flex items-center", isVertical && "flex-col")} role="list">
          {logos.map((item, index) => renderItem(item, `first-${index}`))}
        </ul>
        <ul className={cn("flex items-center", isVertical && "flex-col")} role="list" aria-hidden="true">
          {logos.map((item, index) => renderItem(item, `second-${index}`))}
        </ul>
      </div>
    </div>
  )
})

export default LogoLoop
