import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Projects } from '../sections/Projects'

vi.mock('../../ThemeProvider', () => ({
  useTheme: () => ({ resolvedTheme: 'light' })
}))

class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
window.IntersectionObserver = MockIntersectionObserver as any

describe('Projects Component', () => {
  it('renders projects section title', () => {
    render(<Projects />)
    expect(screen.getByText('Proyectos Destacados')).toBeInTheDocument()
  })

  it('renders project cards', () => {
    render(<Projects />)
    expect(screen.getByText('Brincapark')).toBeInTheDocument()
    expect(screen.getByText('Sentinel Core')).toBeInTheDocument()
  })
})
