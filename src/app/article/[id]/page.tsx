import Link from 'next/link';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
        >
          ← Back to News
        </Link>
      </div>
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 bg-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            <span>Source Name</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sample News Article Headline
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              This is a sample news article that demonstrates the layout and styling of the article detail page. 
              In a real implementation, this content would be fetched from the NewsAPI based on the article ID.
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
              aliquip ex ea commodo consequat.
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Points</h2>
            
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>This is a placeholder article for demonstration purposes</li>
              <li>The actual content will be fetched from NewsAPI</li>
              <li>The layout is responsive and well-structured</li>
              <li>Proper typography and spacing for readability</li>
            </ul>
            
            <p className="text-gray-600 leading-relaxed">
              The article detail page provides a clean, readable layout for news content. It includes proper 
              navigation back to the news list and maintains consistency with the overall design system.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Article ID: {id}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">Category: Technology</span>
              </div>
              
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                Read Original Article →
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
} 