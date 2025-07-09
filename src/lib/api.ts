// Types for NewsAPI responses
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsError {
  status: string;
  code: string;
  message: string;
}

// API configuration
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_BASE_URL || 'https://newsapi.org/v2';

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_NEWS_API_KEY is not defined');
}

// Helper function to build API URL
function buildApiUrl(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('apiKey', API_KEY!);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
}

// API functions
export async function getTopHeadlines(country: string = 'us', page: number = 1): Promise<NewsResponse> {
  const url = buildApiUrl('/top-headlines', {
    country,
    page: page.toString(),
    pageSize: '20'
  });
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const error: NewsError = await response.json();
    throw new Error(error.message || 'Failed to fetch top headlines');
  }
  
  return response.json();
}

export async function getTopHeadlinesByCategory(
  category: string, 
  country: string = 'us', 
  page: number = 1
): Promise<NewsResponse> {
  const url = buildApiUrl('/top-headlines', {
    category,
    country,
    page: page.toString(),
    pageSize: '20'
  });
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const error: NewsError = await response.json();
    throw new Error(error.message || 'Failed to fetch category headlines');
  }
  
  return response.json();
}

export async function searchNews(
  query: string, 
  page: number = 1,
  sortBy: 'relevancy' | 'popularity' | 'publishedAt' = 'publishedAt'
): Promise<NewsResponse> {
  const url = buildApiUrl('/everything', {
    q: query,
    page: page.toString(),
    pageSize: '20',
    sortBy
  });
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const error: NewsError = await response.json();
    throw new Error(error.message || 'Failed to search news');
  }
  
  return response.json();
}

// Helper function to transform API response to our app's format
export function transformArticle(article: NewsArticle) {
  return {
    id: article.url, // Using URL as ID since NewsAPI doesn't provide unique IDs
    title: article.title,
    description: article.description || '',
    imageUrl: article.urlToImage || undefined,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
    author: article.author,
    content: article.content
  };
} 