import { 
  getTopHeadlines, 
  getTopHeadlinesByCategory, 
  searchNews, 
  transformArticle 
} from '@/lib/api'

// Mock fetch globally
global.fetch = jest.fn()

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTopHeadlines', () => {
    it('should fetch top headlines successfully', async () => {
      const mockResponse = {
        status: 'ok',
        totalResults: 2,
        articles: [
          {
            source: { id: '1', name: 'Test Source' },
            author: 'Test Author',
            title: 'Test Article',
            description: 'Test description',
            url: 'https://example.com',
            urlToImage: 'https://example.com/image.jpg',
            publishedAt: '2024-01-15T10:30:00Z',
            content: 'Test content'
          }
        ]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await getTopHeadlines('us', 1)

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/top-headlines?apiKey=test-api-key&country=us&page=1&pageSize=20')
      )
    })

    it('should handle API errors', async () => {
      const mockError = {
        status: 'error',
        code: 'apiKeyDisabled',
        message: 'Your API key has been disabled'
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError
      })

      await expect(getTopHeadlines()).rejects.toThrow('Your API key has been disabled')
    })
  })

  describe('getTopHeadlinesByCategory', () => {
    it('should fetch category headlines successfully', async () => {
      const mockResponse = {
        status: 'ok',
        totalResults: 1,
        articles: [
          {
            source: { id: '1', name: 'Tech News' },
            author: 'Tech Author',
            title: 'Tech Article',
            description: 'Tech description',
            url: 'https://example.com/tech',
            urlToImage: 'https://example.com/tech-image.jpg',
            publishedAt: '2024-01-15T10:30:00Z',
            content: 'Tech content'
          }
        ]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await getTopHeadlinesByCategory('technology', 'us', 1)

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/top-headlines?apiKey=test-api-key&category=technology&country=us&page=1&pageSize=20')
      )
    })

    it('should handle category API errors', async () => {
      const mockError = {
        status: 'error',
        code: 'parameterInvalid',
        message: 'Invalid category parameter'
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError
      })

      await expect(getTopHeadlinesByCategory('invalid-category')).rejects.toThrow('Invalid category parameter')
    })
  })

  describe('searchNews', () => {
    it('should search news successfully', async () => {
      const mockResponse = {
        status: 'ok',
        totalResults: 1,
        articles: [
          {
            source: { id: '1', name: 'Search News' },
            author: 'Search Author',
            title: 'Search Result',
            description: 'Search description',
            url: 'https://example.com/search',
            urlToImage: 'https://example.com/search-image.jpg',
            publishedAt: '2024-01-15T10:30:00Z',
            content: 'Search content'
          }
        ]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await searchNews('test query', 1, 'publishedAt')

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/everything?apiKey=test-api-key&q=test+query&page=1&pageSize=20&sortBy=publishedAt')
      )
    })

    it('should handle search API errors', async () => {
      const mockError = {
        status: 'error',
        code: 'rateLimited',
        message: 'Rate limit exceeded'
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError
      })

      await expect(searchNews('test')).rejects.toThrow('Rate limit exceeded')
    })
  })

  describe('transformArticle', () => {
    it('should transform article correctly', () => {
      const mockArticle = {
        source: { id: '1', name: 'Test Source' },
        author: 'Test Author',
        title: 'Test Article',
        description: 'Test description',
        url: 'https://example.com',
        urlToImage: 'https://example.com/image.jpg',
        publishedAt: '2024-01-15T10:30:00Z',
        content: 'Test content'
      }

      const result = transformArticle(mockArticle)

      expect(result).toEqual({
        id: 'https://example.com',
        title: 'Test Article',
        description: 'Test description',
        imageUrl: 'https://example.com/image.jpg',
        source: 'Test Source',
        publishedAt: '2024-01-15T10:30:00Z',
        url: 'https://example.com',
        author: 'Test Author',
        content: 'Test content'
      })
    })

    it('should handle missing optional fields', () => {
      const mockArticle = {
        source: { id: null, name: 'Test Source' },
        author: null,
        title: 'Test Article',
        description: null,
        url: 'https://example.com',
        urlToImage: null,
        publishedAt: '2024-01-15T10:30:00Z',
        content: null
      }

      const result = transformArticle(mockArticle)

      expect(result).toEqual({
        id: 'https://example.com',
        title: 'Test Article',
        description: '',
        imageUrl: undefined,
        source: 'Test Source',
        publishedAt: '2024-01-15T10:30:00Z',
        url: 'https://example.com',
        author: null,
        content: null
      })
    })
  })
}) 