
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
}

export default function NewsCard({ 
  id, 
  title, 
  description, 
  imageUrl, 
  source, 
  publishedAt
}: NewsCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const shouldShowImage = imageUrl && !imageError;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        {shouldShowImage ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col h-full">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{source}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{formatDate(publishedAt)}</span>
          </div>
          
          <Link 
            href={`/article/${encodeURIComponent(id)}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
