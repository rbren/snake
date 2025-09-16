import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './Home'

// Mock timers for game loop
vi.useFakeTimers()

describe('Home', () => {
  it('renders the Snake game', () => {
    render(<Home />)
    
    // Check that the Snake game title is rendered
    expect(screen.getByText('Snake Game')).toBeInTheDocument()
  })

  it('renders the game canvas', () => {
    render(<Home />)
    
    // Check that a canvas element is present by tag name
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('renders score display', () => {
    render(<Home />)
    
    // Check that score elements are present - be more specific
    expect(screen.getByText('Score:')).toBeInTheDocument()
    expect(screen.getByText('High Score:')).toBeInTheDocument()
  })

  it('renders game instructions', () => {
    render(<Home />)
    
    // Check for game instructions - be more specific to avoid duplicates
    expect(screen.getByText('Ready to Play?')).toBeInTheDocument()
    expect(screen.getByText('Press SPACE to pause')).toBeInTheDocument()
    expect(screen.getByText('Press ENTER or SPACE to start')).toBeInTheDocument()
  })

  it('renders control instructions', () => {
    render(<Home />)
    
    // Check for control instructions at the bottom
    expect(screen.getByText(/Use arrow keys to move • SPACE to pause • ENTER to restart/)).toBeInTheDocument()
  })
})