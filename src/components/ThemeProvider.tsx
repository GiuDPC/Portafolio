import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { flushSync } from "react-dom"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: "dark" | "light"
  setTheme: (theme: Theme, event?: React.MouseEvent) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function getResolvedTheme(theme: Theme): "dark" | "light" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return theme
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  const resolvedTheme = getResolvedTheme(theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  const setTheme = useCallback((newTheme: Theme, event?: React.MouseEvent) => {
    const hasVT = typeof document !== 'undefined' && 'startViewTransition' in document

    if (!hasVT || !event) {
      localStorage.setItem(storageKey, newTheme)
      setThemeState(newTheme)
      return
    }

    // Resolve el tema final ANTES de la transición
    const resolved = getResolvedTheme(newTheme)

    document.documentElement.classList.add("is-transitioning")

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(resolved)

        localStorage.setItem(storageKey, newTheme)
        setThemeState(newTheme)
      })
    })

    transition.ready.then(() => {
      // Si es mobile, evitamos el clipPath (que es costoso) y dejamos que haga
      // el crossfade por defecto suave del View Transition API
      const isMobile = window.innerWidth <= 768
      if (isMobile) return

      const x = event.clientX
      const y = event.clientY
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )

      const isDark = resolved === "dark"
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]

      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)"
        }
      )
    })

    transition.finished.finally(() => {
      document.documentElement.classList.remove("is-transitioning")
    })
  }, [storageKey])

  const value = { theme, resolvedTheme, setTheme }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
