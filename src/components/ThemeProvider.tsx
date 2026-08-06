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
  setTheme: (theme: Theme, pos?: { x: number; y: number }) => void
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

  const setTheme = useCallback((newTheme: Theme, pos?: {x: number, y: number}) => {
    const hasVT = typeof document !== 'undefined' && 'startViewTransition' in document

    if (!hasVT || !pos) {
      localStorage.setItem(storageKey, newTheme)
      setThemeState(newTheme)
      return
    }

    const resolved = getResolvedTheme(newTheme)

    const x = pos.x
    const y = pos.y
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    // Remove any existing injected style just in case
    const existing = document.getElementById("theme-transition-style")
    if (existing) existing.remove()

    // Inject exact CSS coordinates to absolutely guarantee it expands from the button
    const style = document.createElement("style")
    style.id = "theme-transition-style"
    style.innerHTML = `
      ::view-transition-group(root) {
        animation: none;
      }
      ::view-transition-new(root),
      ::view-transition-old(root) {
        animation: none;
        mix-blend-mode: normal;
        display: block;
      }
      /* Ensure new view is on top when switching to Light mode */
      ::view-transition-new(root) { z-index: 1000; }
      ::view-transition-old(root) { z-index: 1; }
      
      /* Ensure old view is on top when switching to Dark mode (it shrinks) */
      .dark::view-transition-old(root) { z-index: 1000; }
      .dark::view-transition-new(root) { z-index: 1; }

      @keyframes theme-clip-expand {
        from { clip-path: circle(0px at ${x}px ${y}px); }
        to { clip-path: circle(${endRadius}px at ${x}px ${y}px); }
      }
      @keyframes theme-clip-shrink {
        from { clip-path: circle(${endRadius}px at ${x}px ${y}px); }
        to { clip-path: circle(0px at ${x}px ${y}px); }
      }

      :root:not(.dark)::view-transition-new(root) {
        animation: theme-clip-expand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .dark::view-transition-old(root) {
        animation: theme-clip-shrink 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `
    document.head.appendChild(style)

    document.documentElement.classList.add("is-transitioning")

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(resolved)
        localStorage.setItem(storageKey, newTheme)
        setThemeState(newTheme)
      })
    })

    transition.finished.finally(() => {
      document.documentElement.classList.remove("is-transitioning")
      const injected = document.getElementById("theme-transition-style")
      if (injected) injected.remove()
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
