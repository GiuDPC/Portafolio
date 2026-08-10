import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Hero } from '../sections/Hero'
import { translations } from '../../locales/translations'

vi.mock('../../ThemeProvider', () => ({
  useTheme: () => ({ resolvedTheme: 'light' })
}))

vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es', setLanguage: vi.fn(), t: translations.es })
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
