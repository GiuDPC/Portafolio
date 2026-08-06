import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from '../Navbar'

// Mock de ThemeProvider
vi.mock('../../ThemeProvider', () => ({
  useTheme: () => ({ 
    resolvedTheme: 'light',
    setTheme: vi.fn()
  })
}))

// Mock de useActiveSection (intersection observer wrapper)
vi.mock('../../hooks/useActiveSection', () => ({
  useActiveSection: () => 'tech'
}))

// Mock matchMedia que usa Framer Motion/React
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Tecnologías')).toBeInTheDocument()
    expect(screen.getByText('Proyectos')).toBeInTheDocument()
    expect(screen.getByText('Educación')).toBeInTheDocument()
  })
})
