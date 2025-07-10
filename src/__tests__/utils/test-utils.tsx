import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
export const mockArticles = [
  {
    id: 'https://example.com/article1',
    title: 'Test Article 1',
    description: 'This is a test article description',
    imageUrl: 'https://example.com/image1.jpg',
    source: 'Test Source',
    publishedAt: '2024-01-15T10:30:00Z',
    url: 'https://example.com/article1',
    author: 'Test Author',
    content: 'Test content for article 1',
  },
  {
    id: 'https://example.com/article2',
    title: 'Test Article 2',
    description: 'Another test article description',
    imageUrl: 'https://example.com/image2.jpg',
    source: 'Another Source',
    publishedAt: '2024-01-15T09:15:00Z',
    url: 'https://example.com/article2',
    author: 'Another Author',
    content: 'Test content for article 2',
  },
];

export const mockNewsResponse = {
  status: 'ok',
  totalResults: 2,
  articles: mockArticles,
};

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
