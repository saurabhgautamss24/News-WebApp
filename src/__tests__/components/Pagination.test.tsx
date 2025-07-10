import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@/components/Pagination'

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders basic pagination when totalPages ≤ 5', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Next')).not.toBeDisabled()

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument()
    }
  })

  it('disables Next on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Next')).toBeDisabled()
  })

  it('renders ellipsis when currentPage is in middle of many pages', () => {
    render(<Pagination currentPage={10} totalPages={20} onPageChange={mockOnPageChange} />)

    expect(screen.getAllByText('...').length).toBe(2)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('renders ellipsis when currentPage is near start', () => {
    render(<Pagination currentPage={2} totalPages={10} onPageChange={mockOnPageChange} />)

    expect(screen.getAllByText('...').length).toBe(1)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders ellipsis when currentPage is near end', () => {
    render(<Pagination currentPage={9} totalPages={10} onPageChange={mockOnPageChange} />)

    expect(screen.getAllByText('...').length).toBe(1)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('calls onPageChange when clicking a page number', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />)

    fireEvent.click(screen.getByText('3'))
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange when clicking Previous and Next', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />)

    fireEvent.click(screen.getByText('Previous'))
    expect(mockOnPageChange).toHaveBeenCalledWith(2)

    fireEvent.click(screen.getByText('Next'))
    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it('disables Previous and Next on single page', () => {
    render(<Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Next')).toBeDisabled()
  })

  it('highlights the current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />)

    const currentPageBtn = screen.getByText('3')
    expect(currentPageBtn).toHaveClass('bg-blue-600', 'text-white')
  })

  it('does not call onPageChange when clicking ellipsis', () => {
    render(<Pagination currentPage={10} totalPages={20} onPageChange={mockOnPageChange} />)

    const ellipsis = screen.getAllByText('...')[0]
    fireEvent.click(ellipsis)

    expect(mockOnPageChange).not.toHaveBeenCalled()
  })

  it('handles keyboard Enter on page number', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />)

    const page3 = screen.getByText('3')
    fireEvent.keyDown(page3, { key: 'Enter', code: 'Enter', charCode: 13 })
    fireEvent.click(page3)

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })
})
