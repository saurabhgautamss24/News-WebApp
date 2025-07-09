import React from 'react'
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import Pagination from '@/components/Pagination'

describe('Pagination', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('should render pagination controls', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should highlight current page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass('bg-blue-600', 'text-white')
  })

  it('should call onPageChange when page is clicked', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const page2Button = screen.getByText('2')
    fireEvent.click(page2Button)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('should disable Previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const previousButton = screen.getByText('Previous')
    expect(previousButton).toBeDisabled()
  })

  it('should disable Next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('should handle Previous button click', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const previousButton = screen.getByText('Previous')
    fireEvent.click(previousButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('should handle Next button click', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it('should handle large number of pages', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        onPageChange={mockOnPageChange}
      />
    )

    // Should show ellipsis and limit visible pages
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('should handle single page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })

  it('should be keyboard accessible', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const page3Button = screen.getByText('3')
    fireEvent.keyDown(page3Button, { key: 'Enter' })

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })
}) 