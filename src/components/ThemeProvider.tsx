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
        // ⚠️ CRÍTICO: actualizar la clase SINCRÓNICAMENTE dentro del callback.
        // El useEffect de arriba corre ASYNC después del commit, pero el View
        // Transition necesita el snapshot "new" con la clase ya actualizada
        // para que old y new sean diferentes y la máscara tenga efecto.
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(resolved)

        localStorage.setItem(storageKey, newTheme)
        setThemeState(newTheme)
      })
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
