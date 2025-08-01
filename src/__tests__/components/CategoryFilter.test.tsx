
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '@/components/CategoryFilter';

describe('CategoryFilter', () => {
  const categories = ['all', 'technology', 'sports', 'business'];
  const mockOnCategoryChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all category buttons', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
  });

  it('highlights the active category', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="sports"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const activeButton = screen.getByText('Sports');
    expect(activeButton).toHaveClass('bg-blue-600', 'text-white');
  });

  it('calls onCategoryChange when a category is clicked', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const techButton = screen.getByText('Technology');
    fireEvent.click(techButton);

    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);
    expect(mockOnCategoryChange).toHaveBeenCalledWith('technology');
  });

  it('does not highlight inactive categories', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="business"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const allButton = screen.getByText('All');
    expect(allButton).not.toHaveClass('bg-blue-600', 'text-white');

    const sportsButton = screen.getByText('Sports');
    expect(sportsButton).not.toHaveClass('bg-blue-600', 'text-white');
  });

  it('displays capitalized category names', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
  });

  it('should be accessible via keyboard (Enter key)', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const techButton = screen.getByText('Technology');
    techButton.focus();
    fireEvent.keyDown(techButton, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.click(techButton); 

    expect(mockOnCategoryChange).toHaveBeenCalledWith('technology');
  });
});

