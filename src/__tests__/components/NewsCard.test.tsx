
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsCard from '@/components/NewsCard';

type ImageMockProps = {
  src: string;
  alt: string;
  onError?: () => void;
  [key: string]: string | number | boolean | undefined | (() => void);
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, onError, ...rest }: ImageMockProps) => {
    // Add button to simulate onError
    return (
      <>
        <img src={src} alt={alt} {...rest} />
        <button onClick={onError}>TriggerError</button>
      </>
    );
  },
}));

type LinkMockProps = {
  href: string;
  children: React.ReactNode;
};

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: LinkMockProps) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('NewsCard', () => {
  const mockArticle = {
    id: 'https://example.com/article1',
    title: 'Test Article Title',
    description: 'This is a test article description that should be displayed in the card.',
    imageUrl: 'https://example.com/image.jpg',
    source: 'Test Source',
    publishedAt: '2024-01-15T10:30:00Z',
  };

  it('renders all article info', () => {
    render(<NewsCard {...mockArticle} />);
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.description)).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('renders image when imageUrl is provided', () => {
    render(<NewsCard {...mockArticle} />);
    const img = screen.getByAltText(mockArticle.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockArticle.imageUrl);
  });

  it('falls back to placeholder on image error', () => {
    render(<NewsCard {...mockArticle} />);
    const triggerError = screen.getByText('TriggerError');
    fireEvent.click(triggerError); // simulate image load error
    expect(screen.queryByAltText(mockArticle.title)).not.toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders placeholder when imageUrl is undefined', () => {
    render(<NewsCard {...mockArticle} imageUrl={undefined} />);
    expect(screen.queryByAltText(mockArticle.title)).not.toBeInTheDocument();
  });

  it('renders placeholder when imageUrl is empty', () => {
    render(<NewsCard {...mockArticle} imageUrl="" />);
    expect(screen.queryByAltText(mockArticle.title)).not.toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<NewsCard {...mockArticle} publishedAt="2024-12-25T15:45:00Z" />);
    expect(screen.getByText('Dec 25, 2024')).toBeInTheDocument();
  });

  it('uses encoded URL for Read More link', () => {
    render(<NewsCard {...mockArticle} />);
    const link = screen.getByText('Read More');
    expect(link).toHaveAttribute('href', '/article/https%3A%2F%2Fexample.com%2Farticle1');
  });

  it('renders long title without breaking', () => {
    const longTitle = 'This is a very long title meant to test how the NewsCard component truncates or handles overflow of the content in layout.';
    render(<NewsCard {...mockArticle} title={longTitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('handles empty description', () => {
    render(<NewsCard {...mockArticle} description="" />);
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('is accessible with article role and alt text', () => {
    render(<NewsCard {...mockArticle} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByAltText(mockArticle.title)).toBeInTheDocument();
  });
});

