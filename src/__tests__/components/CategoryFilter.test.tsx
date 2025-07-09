import React from 'react'
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import CategoryFilter from '@/components/CategoryFilter'

describe('CategoryFilter', () => {
  const mockCategories = ['all', 'business', 'technology', 'sports']
  const mockOnCategoryChange = jest.fn()

  beforeEach(() => {
    mockOnCategoryChange.mockClear()
  })

  it('should render all categories', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Business')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Sports')).toBeInTheDocument()
  })

  it('should highlight active category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="technology"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    const technologyButton = screen.getByText('Technology')
    expect(technologyButton).toHaveClass('bg-blue-600', 'text-white')
  })

  it('should call onCategoryChange when category is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    const businessButton = screen.getByText('Business')
    fireEvent.click(businessButton)

    expect(mockOnCategoryChange).toHaveBeenCalledWith('business')
  })

  it('should handle empty categories array', () => {
    render(
      <CategoryFilter
        categories={[]}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    // Should render without errors
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should format category names correctly', () => {
    const categoriesWithSpecialNames = ['all', 'business', 'entertainment', 'health']
    
    render(
      <CategoryFilter
        categories={categoriesWithSpecialNames}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Business')).toBeInTheDocument()
    expect(screen.getByText('Entertainment')).toBeInTheDocument()
    expect(screen.getByText('Health')).toBeInTheDocument()
  })

  it('should be keyboard accessible', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    const businessButton = screen.getByText('Business')
    fireEvent.keyDown(businessButton, { key: 'Enter' })

    expect(mockOnCategoryChange).toHaveBeenCalledWith('business')
  })

  it('should have proper ARIA attributes', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'News categories')
  })
}) 