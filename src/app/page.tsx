'use client';
import { useState } from 'react';
import { useTopHeadlines, useCategoryHeadlines } from '@/hooks/useNews';
import NewsCard from '@/components/NewsCard';
import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

const categories = ['all', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use different hooks based on selected category
  const topHeadlines = useTopHeadlines(currentPage);
  const categoryHeadlines = useCategoryHeadlines(activeCategory, currentPage);
  
  // Select the appropriate data based on category
  const { articles, totalResults, isLoading, error, mutate } = 
    activeCategory === 'all' ? topHeadlines : categoryHeadlines;
  
  const totalPages = Math.ceil(totalResults / 20);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); 
    console.log('Category changed:', category);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Page changed:', page);
  };

  const handleRetry = () => {
    mutate();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error.message || 'Failed to load news articles'} 
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">
          {activeCategory === 'all' ? 'Top Headlines' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News`}
        </h1>
        <p className="text-gray-600 mb-4">
          {activeCategory === 'all' 
            ? 'Stay updated with the latest trending news from around the world.'
            : `Latest ${activeCategory} news and updates from around the world.`
          }
        </p>
      </section>
      
      <section>
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {articles.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-600">
              {activeCategory === 'all' 
                ? 'No news articles are currently available.'
                : `No ${activeCategory} articles are currently available.`
              }
            </p>
          </div>
        )}
      </section>
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
