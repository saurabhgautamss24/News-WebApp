import React from 'react'
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import ErrorMessage from '@/components/ErrorMessage'

describe('ErrorMessage', () => {
  const mockOnRetry = jest.fn()

  beforeEach(() => {
    mockOnRetry.mockClear()
  })

  it('should render error message', () => {
    render(
      <ErrorMessage 
        message="Failed to load articles" 
        onRetry={mockOnRetry}
      />
    )

    expect(screen.getByText('Failed to load articles')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('should call onRetry when retry button is clicked', () => {
    render(
      <ErrorMessage 
        message="Network error" 
        onRetry={mockOnRetry}
      />
    )

    const retryButton = screen.getByText('Try Again')
    fireEvent.click(retryButton)

    expect(mockOnRetry).toHaveBeenCalledTimes(1)
  })

  it('should render default message when no message is provided', () => {
    render(
      <ErrorMessage 
        onRetry={mockOnRetry}
      />
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should have proper error styling', () => {
    render(
      <ErrorMessage 
        message="Test error" 
        onRetry={mockOnRetry}
      />
    )

    const errorContainer = screen.getByRole('alert')
    expect(errorContainer).toHaveClass('bg-red-50', 'border-red-200')
  })

  it('should be keyboard accessible', () => {
    render(
      <ErrorMessage 
        message="Test error" 
        onRetry={mockOnRetry}
      />
    )

    const retryButton = screen.getByText('Try Again')
    fireEvent.keyDown(retryButton, { key: 'Enter' })

    expect(mockOnRetry).toHaveBeenCalledTimes(1)
  })
}) 