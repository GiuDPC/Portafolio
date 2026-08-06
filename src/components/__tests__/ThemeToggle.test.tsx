import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeToggle } from '../ThemeToggle'
import * as ThemeProviderModule from '../ThemeProvider'

// Mock matchMedia
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

describe('ThemeToggle Component', () => {
  it('calls setTheme when clicked', () => {
    const mockSetTheme = vi.fn()
    vi.spyOn(ThemeProviderModule, 'useTheme').mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: mockSetTheme
    })

    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    
    fireEvent.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith('dark', expect.anything())
  })
})
