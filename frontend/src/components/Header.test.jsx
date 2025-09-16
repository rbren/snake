import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Header from './Header'

const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
)

describe('Header', () => {
  it('renders the logo', () => {
    render(<HeaderWithRouter />)
    
    expect(screen.getByText('🐍 Snake Game')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<HeaderWithRouter />)
    
    expect(screen.getByText('Play')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has proper navigation structure', () => {
    render(<HeaderWithRouter />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const playLink = screen.getByRole('link', { name: 'Play' })
    expect(playLink).toHaveAttribute('href', '/')
    
    const aboutLink = screen.getByRole('link', { name: 'About' })
    expect(aboutLink).toHaveAttribute('href', '/about')
    
    const contactLink = screen.getByRole('link', { name: 'Contact' })
    expect(contactLink).toHaveAttribute('href', '/contact')
  })
})