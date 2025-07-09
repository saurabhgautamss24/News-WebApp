import { renderHook, waitFor } from '@testing-library/react'
import { useTopHeadlines, useCategoryHeadlines, useSearchNews } from '@/hooks/useNews'
import useSWR from 'swr'

// Mock SWR
jest.mock('swr')
const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>

// Mock API functions
jest.mock('@/lib/api', () => ({
  getTopHeadlines: jest.fn(),
  getTopHeadlinesByCategory: jest.fn(),
  searchNews: jest.fn(),
  transformArticle: jest.fn((article) => ({
    id: article.url,
    title: article.title,
    description: article.description || '',
    imageUrl: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
    author: article.author,
    content: article.content
  }))
}))

describe('useNews Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useTopHeadlines', () => {
    it('should return loading state initially', () => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: true,
        mutate: jest.fn()
      })

      const { result } = renderHook(() => useTopHeadlines(1))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.articles).toEqual([])
      expect(result.current.totalResults).toBe(0)
    })

    it('should return articles when data is loaded', () => {
      const mockData = {
        articles: [
          {
            source: { name: 'Test Source' },
            author: 'Test Author',
            title: 'Test Article',
            description: 'Test description',
            url: 'https://example.com',
            urlToImage: 'https://example.com/image.jpg',
            publishedAt: '2024-01-15T10:30:00Z',
            content: 'Test content'
          }
        ],
        totalResults: 1
      }

      mockUseSWR.mockReturnValue({
        data: mockData,
        error: undefined,
        isLoading: false,
        mutate: jest.fn()
      })

      const { result } = renderHook(() => useTopHeadlines(1))

      expect(result.current.isLoading).toBe(false)
      expect(result.current.articles).toHaveLength(1)
      expect(result.current.totalResults).toBe(1)
      expect(result.current.articles[0].title).toBe('Test Article')
    })

    it('should return error when API fails', () => {
      const mockError = new Error('API Error')

      mockUseSWR.mockReturnValue({
        data: undefined,
        error: mockError,
        isLoading: false,
        mutate: jest.fn()
      })

      const { result } = renderHook(() => useTopHeadlines(1))

      expect(result.current.error).toBe(mockError)
      expect(result.current.articles).toEqual([])
    })
  })

  describe('useCategoryHeadlines', () => {
    it('should not fetch when category is "all"', () => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: false,
        mutate: jest.fn()
      })

      renderHook(() => useCategoryHeadlines('all', 1))

      expect(mockUseSWR).toHaveBeenCalledWith(null, expect.any(Function))
    })

    it('should fetch category headlines for valid category', () => {
      const mockData = {
        articles: [
          {
            source: { name: 'Tech News' },
            author: 'Tech Author',
            title: 'Tech Article',
            description: 'Tech description',
            url: 'https://example.com/tech',
            urlToImage: 'https://example.com/tech-image.jpg',
            publishedAt: '2024-01-15T10:30:00Z',
            content: 'Tech content'
          }
        ],
        totalResults: 1
      }

      mockUseSWR.mockReturnValue({
        data: mockData,
        error: undefined,
        isLoading: false,
        mutate: jest.fn()
      })

      const { result } = renderHook(() => useCategoryHeadlines('technology', 1))

      expect(result.current.articles).toHaveLength(1)
      expect(result.current.articles[0].title).toBe('Tech Article')
    })
  })

  describe('useSearchNews', () => {
    it('should not fetch when query is empty', () => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: false,
        mutate: jest.fn()
      })

      renderHook(() => useSearchNews('', 1))

      expect(mockUseSWR).toHaveBeenCalledWith(null, expect.any(Function))
    })

    it('should fetch search results for valid query', () => {
      const mockData = {
        articles: [
          {
            source: { name: 'Search News' },
            author: 'Search Author',
            title: 'Search Result',
            description: 'Search description',
            url: 'https://example.com/search',
            urlToImage: 'https://example.com/search-image.jpg',
            publishedAt: '2024-01-15T10:30:00Z',
            content: 'Search content'
          }
        ],
        totalResults: 1
      }

      mockUseSWR.mockReturnValue({
        data: mockData,
        error: undefined,
        isLoading: false,
        mutate: jest.fn()
      })

      const { result } = renderHook(() => useSearchNews('test query', 1))

      expect(result.current.articles).toHaveLength(1)
      expect(result.current.articles[0].title).toBe('Search Result')
    })

    it('should handle search errors', () => {
      const mockError = new Error('Search failed')

      mockUseSWR.mockReturnValue({
        data: undefined,
        error: mockError,
        isLoading: false,
        mutate: jest.fn()
      })

      const { result } = renderHook(() => useSearchNews('test', 1))

      expect(result.current.error).toBe(mockError)
      expect(result.current.articles).toEqual([])
    })
  })
}) 