
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '@/components/ErrorMessage';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

describe('ErrorMessage', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    mockOnRetry.mockClear();
  });

  it('should render error message and Try Again button', () => {
    customRender(<ErrorMessage message="Failed to load articles" onRetry={mockOnRetry} />);

    expect(screen.getByText('Failed to load articles')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should call onRetry when Try Again is clicked', () => {
    customRender(<ErrorMessage message="Network error" onRetry={mockOnRetry} />);

    fireEvent.click(screen.getByText('Try Again'));

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should render default message when no message is passed', () => {
    customRender(<ErrorMessage onRetry={mockOnRetry} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should be keyboard accessible (Enter key triggers retry)', () => {
    customRender(<ErrorMessage message="Test error" onRetry={mockOnRetry} />);

    const retryButton = screen.getByText('Try Again');
    retryButton.focus();
    fireEvent.keyDown(retryButton, { key: 'Enter', code: 'Enter' });

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button if onRetry not passed', () => {
    customRender(<ErrorMessage message="Only error shown" />);

    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });
});
