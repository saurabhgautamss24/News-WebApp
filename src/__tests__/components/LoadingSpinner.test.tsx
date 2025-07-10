
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading text and spinner container', () => {
    render(<LoadingSpinner />);
    
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();


    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading news articles');
  });

  it('includes spinning animation', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByTestId('spinner');
    
    expect(spinner.firstChild).toHaveClass('animate-spin');
  });
});

