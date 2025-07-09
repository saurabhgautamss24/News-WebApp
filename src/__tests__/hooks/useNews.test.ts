
import { renderHook } from '@testing-library/react'
import { useTopHeadlines, useCategoryHeadlines, useSearchNews } from '@/hooks/useNews'
import useSWR from 'swr'

jest.mock('swr')
const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>

jest.mock('@/lib/api', () => ({
  getTopHeadlines: jest.fn().mockResolvedValue({
    articles: [],
    totalResults: 0
  }),
  getTopHeadlinesByCategory: jest.fn().mockResolvedValue({
    articles: [],
    totalResults: 0
  }),
  searchNews: jest.fn().mockResolvedValue({
    articles: [],
    totalResults: 0
  }),
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
   
    mockUseSWR.mockImplementation(() => ({
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: jest.fn(),
      isValidating: true
    }))
  })

  describe('useTopHeadlines', () => {
    it('should return loading state initially', () => {
      const { result } = renderHook(() => useTopHeadlines(1))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.articles).toEqual([])
      expect(result.current.totalResults).toBe(0)
      expect(mockUseSWR).toHaveBeenCalled()
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

      mockUseSWR.mockReturnValueOnce({
        data: mockData,
        error: undefined,
        isLoading: false,
        mutate: jest.fn(),
        isValidating: false
      })

      const { result } = renderHook(() => useTopHeadlines(1))

      expect(result.current.isLoading).toBe(false)
      expect(result.current.articles).toHaveLength(1)
      expect(result.current.totalResults).toBe(1)
      expect(result.current.articles[0].title).toBe('Test Article')
    })

    it('should return error when API fails', () => {
      const mockError = new Error('API Error')

      mockUseSWR.mockReturnValueOnce({
        data: undefined,
        error: mockError,
        isLoading: false,
        mutate: jest.fn(),
        isValidating: false
      })

      const { result } = renderHook(() => useTopHeadlines(1))

      expect(result.current.error).toBe(mockError)
      expect(result.current.articles).toEqual([])
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('useCategoryHeadlines', () => {
    it('should not fetch when category is "all"', () => {
      renderHook(() => useCategoryHeadlines('all', 1))

      expect(mockUseSWR).toHaveBeenCalledWith(
        null,
        expect.any(Function),
        expect.objectContaining({
          dedupingInterval: expect.any(Number),
          revalidateOnFocus: expect.any(Boolean),
          revalidateOnReconnect: expect.any(Boolean)
        })
      )
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

      mockUseSWR.mockReturnValueOnce({
        data: mockData,
        error: undefined,
        isLoading: false,
        mutate: jest.fn(),
        isValidating: false
      })

      const { result } = renderHook(() => useCategoryHeadlines('technology', 1))

      expect(result.current.articles).toHaveLength(1)
      expect(result.current.articles[0].title).toBe('Tech Article')
      expect(result.current.isLoading).toBe(false)
    })

    it('should return loading state initially for valid category', () => {
      const { result } = renderHook(() => useCategoryHeadlines('technology', 1))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.articles).toEqual([])
    })
  })

  describe('useSearchNews', () => {
    it('should not fetch when query is empty', () => {
      renderHook(() => useSearchNews('', 1))

      expect(mockUseSWR).toHaveBeenCalledWith(
        null,
        expect.any(Function),
        expect.objectContaining({
          dedupingInterval: expect.any(Number),
          revalidateOnFocus: expect.any(Boolean),
          revalidateOnReconnect: expect.any(Boolean)
        })
      )
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

      mockUseSWR.mockReturnValueOnce({
        data: mockData,
        error: undefined,
        isLoading: false,
        mutate: jest.fn(),
        isValidating: false
      })

      const { result } = renderHook(() => useSearchNews('test query', 1))

      expect(result.current.articles).toHaveLength(1)
      expect(result.current.articles[0].title).toBe('Search Result')
      expect(result.current.isLoading).toBe(false)
    })

    it('should return loading state initially for valid query', () => {
      const { result } = renderHook(() => useSearchNews('test', 1))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.articles).toEqual([])
    })

    it('should handle search errors', () => {
      const mockError = new Error('Search failed')

      mockUseSWR.mockReturnValueOnce({
        data: undefined,
        error: mockError,
        isLoading: false,
        mutate: jest.fn(),
        isValidating: false
      })

      const { result } = renderHook(() => useSearchNews('test', 1))

      expect(result.current.error).toBe(mockError)
      expect(result.current.articles).toEqual([])
      expect(result.current.isLoading).toBe(false)
    })
  })
})