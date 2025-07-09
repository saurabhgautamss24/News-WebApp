# Testing Documentation

## Overview

This News Website implements a comprehensive testing suite using Jest and React Testing Library to ensure code quality, reliability, and maintainability.

## Test Structure

```
src/__tests__/
├── lib/
│   └── api.test.ts          # API service tests
├── hooks/
│   └── useNews.test.ts      # Custom hooks tests
├── components/
│   ├── NewsCard.test.tsx    # Component tests
│   ├── CategoryFilter.test.tsx
│   ├── Pagination.test.tsx
│   ├── LoadingSpinner.test.tsx
│   └── ErrorMessage.test.tsx
└── utils/
    └── test-utils.tsx       # Test utilities and mocks
```

## Test Categories

### 1. API Service Tests (`src/__tests__/lib/api.test.ts`)
**Status: ✅ 8/8 tests passing**

Tests the core API integration layer:
- ✅ `getTopHeadlines` - Success and error scenarios
- ✅ `getTopHeadlinesByCategory` - Category-specific fetching
- ✅ `searchNews` - Search functionality
- ✅ `transformArticle` - Data transformation and edge cases

**Coverage: 96.96%**

### 2. Custom Hooks Tests (`src/__tests__/hooks/useNews.test.ts`)
**Status: ✅ 6/8 tests passing**

Tests the data fetching hooks:
- ✅ `useTopHeadlines` - Loading, success, and error states
- ✅ `useCategoryHeadlines` - Category filtering logic
- ✅ `useSearchNews` - Search functionality

**Coverage: 78.57%**

### 3. Component Tests
**Status: 🔧 Partially implemented**

Tests React components for:
- ✅ `NewsCard` - Article display and interactions
- ⚠️ `CategoryFilter` - Category selection (needs fixes)
- ⚠️ `Pagination` - Page navigation (needs fixes)
- ⚠️ `LoadingSpinner` - Loading states (needs fixes)
- ⚠️ `ErrorMessage` - Error handling (needs fixes)

## Test Configuration

### Jest Configuration (`jest.config.js`)
```javascript
{
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
```

### Test Setup (`jest.setup.js`)
- Mocked Next.js router and navigation
- Mocked SWR for data fetching
- Environment variables for testing
- Global test utilities

## Available Test Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

## Test Utilities

### Custom Render Function (`src/__tests__/utils/test-utils.tsx`)
Provides a custom render function with SWR provider for consistent testing:

```typescript
import { render, screen } from '@/__tests__/utils/test-utils'

// Use custom render with SWR provider
render(<MyComponent />)
```

### Mock Data
Predefined mock data for consistent testing:
```typescript
export const mockArticles = [
  {
    id: 'https://example.com/article1',
    title: 'Test Article 1',
    description: 'Test description',
    imageUrl: 'https://example.com/image1.jpg',
    source: 'Test Source',
    publishedAt: '2024-01-15T10:30:00Z',
    // ... other properties
  }
]
```

## Testing Best Practices

### 1. API Testing
- Mock `fetch` globally for HTTP requests
- Test both success and error scenarios
- Validate URL construction and parameters
- Test data transformation functions

### 2. Hook Testing
- Use `renderHook` from React Testing Library
- Mock SWR for data fetching states
- Test loading, success, and error states
- Validate conditional fetching logic

### 3. Component Testing
- Mock Next.js components (`next/image`, `next/link`)
- Test user interactions with `fireEvent`
- Validate accessibility attributes
- Test edge cases and error states

### 4. Mocking Strategy
```typescript
// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock external dependencies
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}))
```

## Coverage Goals

Current coverage targets (70% for all metrics):
- **Statements**: 28.94% (needs improvement)
- **Branches**: 38.73% (needs improvement)
- **Functions**: 24.44% (needs improvement)
- **Lines**: 29.56% (needs improvement)

## Areas for Improvement

### 1. Component Test Fixes
- Fix remaining component tests by updating test utilities
- Resolve Jest DOM matcher issues
- Improve component interaction testing

### 2. Integration Tests
- Add end-to-end tests for complete user flows
- Test page navigation and routing
- Test complete data fetching workflows

### 3. Performance Tests
- Test large data sets and pagination
- Test loading states and error boundaries
- Test memory usage and performance

### 4. Accessibility Tests
- Add comprehensive a11y testing
- Test keyboard navigation
- Test screen reader compatibility

## Running Tests

### Basic Test Run
```bash
npm test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### CI/CD Testing
```bash
npm run test:ci
```

## Test Examples

### API Test Example
```typescript
it('should fetch top headlines successfully', async () => {
  const mockResponse = {
    status: 'ok',
    totalResults: 2,
    articles: [/* mock article */]
  }

  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse
  })

  const result = await getTopHeadlines('us', 1)
  expect(result).toEqual(mockResponse)
})
```

### Component Test Example
```typescript
it('should render article information correctly', () => {
  render(<NewsCard {...mockArticle} />)

  expect(screen.getByText('Test Article Title')).toBeInTheDocument()
  expect(screen.getByText('Test Source')).toBeInTheDocument()
  expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
})
```

### Hook Test Example
```typescript
it('should return loading state initially', () => {
  mockUseSWR.mockReturnValue({
    data: undefined,
    error: undefined,
    isLoading: true,
    mutate: jest.fn()
  })

  const { result } = renderHook(() => useTopHeadlines(1))
  expect(result.current.isLoading).toBe(true)
})
```

## Continuous Integration

The testing suite is designed to work with CI/CD pipelines:
- Fast execution for quick feedback
- Comprehensive coverage reporting
- Clear pass/fail indicators
- Mocked external dependencies

## Future Enhancements

1. **Visual Regression Testing**
   - Add visual testing for UI consistency
   - Test responsive design across devices

2. **Performance Testing**
   - Add performance benchmarks
   - Test memory usage patterns

3. **Security Testing**
   - Add security vulnerability tests
   - Test input validation and sanitization

4. **Accessibility Testing**
   - Comprehensive a11y testing
   - Screen reader compatibility tests

This testing implementation provides a solid foundation for maintaining code quality and ensuring the application works correctly as it scales. 