import React from 'react'
import { render, screen } from '@/__tests__/utils/test-utils'
import LoadingSpinner from '@/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('should render loading spinner', () => {
    render(<LoadingSpinner />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading news articles')
  })

  it('should have loading animation', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('animate-spin')
  })
}) 