'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSearchNews } from '@/hooks/useNews'
import NewsCard from '@/components/NewsCard'
import Pagination from '@/components/Pagination'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'

// ⛔️ Next.js needs dynamic rendering for search
export const dynamic = 'force-dynamic'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [currentPage, setCurrentPage] = useState(1)

  const { articles, totalResults, isLoading, error, mutate } = useSearchNews(query, currentPage)
  const totalPages = Math.ceil(totalResults / 20)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleRetry = () => mutate()

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600 mb-4">
          {query ? `Showing results for "${query}"` : 'Search for news articles'}
        </p>
      </section>

      {query ? (
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error.message || 'Failed to search news articles'} onRetry={handleRetry} />
          ) : articles.length > 0 ? (
            <>
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <NewsCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      description={article.description}
                      imageUrl={article.imageUrl}
                      source={article.source}
                      publishedAt={article.publishedAt}
                    />
                  ))}
                </div>
              </section>
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </>
          ) : (
            <section className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600">No articles found for &ldquo;{query}&rdquo;. Try a different search term.</p>
            </section>
          )}
        </>
      ) : (
        <section className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Search Query</h3>
          <p className="text-gray-600">Enter a search term to find news articles.</p>
        </section>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  )
}
