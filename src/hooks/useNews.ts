import useSWR from 'swr';
import { getTopHeadlines, getTopHeadlinesByCategory, searchNews, transformArticle } from '@/lib/api';

export function useTopHeadlines(page: number = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    ['top-headlines', page],
    () => getTopHeadlines('us', page),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    articles: data?.articles.map(transformArticle) || [],
    totalResults: data?.totalResults || 0,
    isLoading,
    error,
    mutate
  };
}
export function useCategoryHeadlines(category: string, page: number = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    category && category !== 'all' ? ['category-headlines', category, page] : null,
    () => getTopHeadlinesByCategory(category, 'us', page),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, 
    }
  );

  return {
    articles: data?.articles.map(transformArticle) || [],
    totalResults: data?.totalResults || 0,
    isLoading,
    error,
    mutate
  };
}

export function useSearchNews(query: string, page: number = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    query ? ['search-news', query, page] : null,
    () => searchNews(query, page),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, 
    }
  );

  return {
    articles: data?.articles.map(transformArticle) || [],
    totalResults: data?.totalResults || 0,
    isLoading,
    error,
    mutate
  };
} 