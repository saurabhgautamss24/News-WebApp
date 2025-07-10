
import React from 'react';
import { render, screen, fireEvent, RenderOptions } from '@testing-library/react';
import ErrorMessage from '@/components/ErrorMessage';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

describe('ErrorMessage Component', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    mockOnRetry.mockClear();
  });

  it('renders custom error message and retry button', () => {
    customRender(<ErrorMessage message="Failed to load articles" onRetry={mockOnRetry} />);

    expect(screen.getByText('Failed to load articles')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('calls onRetry when Try Again is clicked', () => {
    customRender(<ErrorMessage message="Network error" onRetry={mockOnRetry} />);

    fireEvent.click(screen.getByText('Try Again'));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('renders default error message when none is provided', () => {
    customRender(<ErrorMessage onRetry={mockOnRetry} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('handles keyboard Enter key for retry button', () => {
    customRender(<ErrorMessage message="Keyboard test" onRetry={mockOnRetry} />);
    
    const retryButton = screen.getByText('Try Again');
    retryButton.focus();
    fireEvent.keyDown(retryButton, { key: 'Enter', code: 'Enter' });

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render Try Again button if onRetry not provided', () => {
    customRender(<ErrorMessage message="Static error" />);
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });
});
