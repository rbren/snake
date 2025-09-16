import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock timers for game loop
vi.useFakeTimers()

describe('App', () => {
  it('renders the main layout components', () => {
    render(<App />)
    
    // Check for header logo specifically
    expect(screen.getByRole('link', { name: '🐍 Snake Game' })).toBeInTheDocument()
    
    // Check for Snake game content (default route)
    expect(screen.getByText('Snake Game')).toBeInTheDocument()
    
    // Check for footer
    expect(screen.getByText('© 2025 Snake. All rights reserved.')).toBeInTheDocument()
  })

  it('has proper navigation structure', () => {
    render(<App />)
    
    // Check navigation links in header specifically
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    // Check for Play link in header
    expect(screen.getByRole('link', { name: 'Play' })).toBeInTheDocument()
    
    // Use getAllByRole to handle multiple links with same name (header + footer)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    expect(aboutLinks.length).toBeGreaterThan(0)
    
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
    expect(contactLinks.length).toBeGreaterThan(0)
  })

  it('renders with theme provider', () => {
    const { container } = render(<App />)
    
    // Check that theme class is applied
    expect(container.querySelector('.app-theme-dark')).toBeInTheDocument()
  })
})