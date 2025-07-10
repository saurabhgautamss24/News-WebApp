
import {
  fetchTopHeadlines,
  fetchCategoryHeadlines,
  fetchSearchNews,
} from '@/lib/api'

global.fetch = jest.fn()

// Set mock API key environment variable
process.env.NEXT_PUBLIC_NEWS_API_KEY = 'test-api-key'

describe('API Fetch Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchTopHeadlines', () => {
    it('should fetch top headlines successfully', async () => {
      const mockData = {
        status: 'ok',
        totalResults: 1,
        articles: [{ title: 'Headline 1' }],
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await fetchTopHeadlines('us', 1)

      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('top-headlines?country=us&page=1&pageSize=20&apiKey=test-api-key')
      )
    })

    it('should throw error on API failure', async () => {
      const mockError = {
        message: 'Invalid API key',
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      })

      await expect(fetchTopHeadlines()).rejects.toThrow('Invalid API key')
    })
  })

  describe('fetchCategoryHeadlines', () => {
    it('should fetch category headlines successfully', async () => {
      const mockData = {
        status: 'ok',
        totalResults: 2,
        articles: [{ title: 'Tech News' }],
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await fetchCategoryHeadlines('technology', 1)

      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('top-headlines?country=us&category=technology&page=1&pageSize=20&apiKey=test-api-key')
      )
    })

    it('should throw error on category fetch failure', async () => {
      const mockError = {
        message: 'Invalid category',
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      })

      await expect(fetchCategoryHeadlines('invalid')).rejects.toThrow('Invalid category')
    })
  })

  describe('fetchSearchNews', () => {
    it('should fetch search results successfully', async () => {
      const mockData = {
        status: 'ok',
        totalResults: 3,
        articles: [{ title: 'Searched News' }],
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await fetchSearchNews('bitcoin', 1)

      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('everything?q=bitcoin&page=1&pageSize=20&sortBy=publishedAt&apiKey=test-api-key')
      )
    })

    it('should throw error when search fails', async () => {
      const mockError = {
        message: 'Query missing',
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      })

      await expect(fetchSearchNews('')).rejects.toThrow('Query missing')
    })
  })
})
