
import React from 'react'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, category: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onCategoryChange(category)
    }
  }

  return (
    <nav aria-label="News categories" className="flex gap-2 mb-4 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          onKeyDown={(e) => handleKeyDown(e, category)}
          className={`px-4 py-2 rounded-full border text-sm capitalize whitespace-nowrap
            ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </nav>
  )
}
