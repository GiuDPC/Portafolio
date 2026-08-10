import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Hero } from '../sections/Hero'

vi.mock('../../ThemeProvider', () => ({
  useTheme: () => ({ resolvedTheme: 'light' })
}))

describe('Hero Component', () => {
  it('renders main heading and roles', () => {
    render(<Hero />)
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<Hero />)
    const githubLink = screen.getByRole('link', { name: /github/i })
    
    expect(githubLink).toBeInTheDocument()
  })
})
