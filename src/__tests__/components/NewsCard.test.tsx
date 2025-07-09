
// import React from 'react'
// import { render, screen } from '@testing-library/react'
// import NewsCard from '@/components/NewsCard'

// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: ({ src, alt, ...rest }: any) => {
//     const { fill, unoptimized, sizes, ...imgProps } = rest
//     return <img src={src} alt={alt} {...imgProps} />
//   }
// }))


// jest.mock('next/link', () => ({
//   __esModule: true,
//   default: ({ href, children, ...props }: any) => {
//     return <a href={href} {...props}>{children}</a>
//   }
// }))

// describe('NewsCard', () => {
//   const mockArticle = {
//     id: 'https://example.com/article1',
//     title: 'Test Article Title',
//     description: 'This is a test article description that should be displayed in the card.',
//     imageUrl: 'https://example.com/image.jpg',
//     source: 'Test Source',
//     publishedAt: '2024-01-15T10:30:00Z'
//   }

//   it('should render article information correctly', () => {
//     render(<NewsCard {...mockArticle} />)
//     expect(screen.getByText('Test Article Title')).toBeInTheDocument()
//     expect(screen.getByText('This is a test article description that should be displayed in the card.')).toBeInTheDocument()
//     expect(screen.getByText('Test Source')).toBeInTheDocument()
//     expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
//     expect(screen.getByText('Read More')).toBeInTheDocument()
//   })

//   it('should render image when imageUrl is provided', () => {
//     render(<NewsCard {...mockArticle} />)
//     const image = screen.getByAltText('Test Article Title')
//     expect(image).toBeInTheDocument()
//     expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
//   })

//   it('should render placeholder when imageUrl is not provided', () => {
//     render(<NewsCard {...mockArticle} imageUrl={undefined} />)
//     expect(screen.queryByAltText('Test Article Title')).not.toBeInTheDocument()
//     expect(screen.getByRole('article')).toBeInTheDocument()
//   })

//   it('should render placeholder when imageUrl is empty string', () => {
//     render(<NewsCard {...mockArticle} imageUrl="" />)
//     expect(screen.queryByAltText('Test Article Title')).not.toBeInTheDocument()
//   })

//   it('should format date correctly', () => {
//     render(<NewsCard {...mockArticle} publishedAt="2024-12-25T15:45:00Z" />)
//     expect(screen.getByText('Dec 25, 2024')).toBeInTheDocument()
//   })

//   it('should have correct link to article detail page', () => {
//     render(<NewsCard {...mockArticle} />)
//     const readMoreLink = screen.getByText('Read More')
//     expect(readMoreLink).toHaveAttribute('href', '/article/https%3A%2F%2Fexample.com%2Farticle1')
//   })

//   it('should handle long titles gracefully', () => {
//     const longTitle = 'This is a very long article title that should be truncated and displayed properly in the card component without breaking the layout'
//     render(<NewsCard {...mockArticle} title={longTitle} />)
//     expect(screen.getByText(longTitle)).toBeInTheDocument()
//   })

//   it('should handle empty description', () => {
//     render(<NewsCard {...mockArticle} description="" />)
//     expect(screen.getByText('Read More')).toBeInTheDocument()
//     expect(screen.getByText('Test Source')).toBeInTheDocument()
//   })

//   it('should have proper accessibility attributes', () => {
//     render(<NewsCard {...mockArticle} />)
//     const article = screen.getByRole('article')
//     expect(article).toBeInTheDocument()
//     const image = screen.getByAltText('Test Article Title')
//     expect(image).toBeInTheDocument()
//   })
// })
import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '@/components/NewsCard';

type ImageMockProps = {
  src: string;
  alt: string;
  [key: string]: string | number | boolean | undefined;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: ImageMockProps) => {
    const imgProps = rest;
   
    return <img src={src} alt={alt} {...imgProps} />;
  },
}));

type LinkMockProps = {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: LinkMockProps) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

describe('NewsCard', () => {
  const mockArticle = {
    id: 'https://example.com/article1',
    title: 'Test Article Title',
    description:
      'This is a test article description that should be displayed in the card.',
    imageUrl: 'https://example.com/image.jpg',
    source: 'Test Source',
    publishedAt: '2024-01-15T10:30:00Z',
  };

  it('should render article information correctly', () => {
    render(<NewsCard {...mockArticle} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This is a test article description that should be displayed in the card.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('should render image when imageUrl is provided', () => {
    render(<NewsCard {...mockArticle} />);
    const image = screen.getByAltText('Test Article Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should render placeholder when imageUrl is not provided', () => {
    render(<NewsCard {...mockArticle} imageUrl={undefined} />);
    expect(screen.queryByAltText('Test Article Title')).not.toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('should render placeholder when imageUrl is empty string', () => {
    render(<NewsCard {...mockArticle} imageUrl="" />);
    expect(screen.queryByAltText('Test Article Title')).not.toBeInTheDocument();
  });

  it('should format date correctly', () => {
    render(<NewsCard {...mockArticle} publishedAt="2024-12-25T15:45:00Z" />);
    expect(screen.getByText('Dec 25, 2024')).toBeInTheDocument();
  });

  it('should have correct link to article detail page', () => {
    render(<NewsCard {...mockArticle} />);
    const readMoreLink = screen.getByText('Read More');
    expect(readMoreLink).toHaveAttribute(
      'href',
      '/article/https%3A%2F%2Fexample.com%2Farticle1'
    );
  });

  it('should handle long titles gracefully', () => {
    const longTitle =
      'This is a very long article title that should be truncated and displayed properly in the card component without breaking the layout';
    render(<NewsCard {...mockArticle} title={longTitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('should handle empty description', () => {
    render(<NewsCard {...mockArticle} description="" />);
    expect(screen.getByText('Read More')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<NewsCard {...mockArticle} />);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    const image = screen.getByAltText('Test Article Title');
    expect(image).toBeInTheDocument();
  });
});
