const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL =
  process.env.NEXT_PUBLIC_NEWS_API_BASE_URL || "https://newsapi.org/v2";

if (!API_KEY) {
  throw new Error('API key is not defined');
}
export async function fetchTopHeadlines(country = 'us', page = 1) {
  const url = `${BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=20&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch top headlines');
  }

  return data;
}

export async function fetchCategoryHeadlines(category: string, page = 1) {
  const url = `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=20&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch category headlines');
  }

  return data;
}

export async function fetchSearchNews(query: string, page = 1, sortBy = 'publishedAt') {
  const url = `${BASE_URL}/everything?q=${query}&page=${page}&pageSize=20&sortBy=${sortBy}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to search news');
  }

  return data;
}

