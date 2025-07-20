'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()

  // Map category slugs to CSS classes to avoid inline styles
  const getCategoryClass = (categorySlug: string) => {
    const categoryClassMap: Record<string, string> = {
      technology: 'category-badge-technology',
      lifestyle: 'category-badge-lifestyle',
      travel: 'category-badge-travel',
      business: 'category-badge-business',
      health: 'category-badge-health',
      food: 'category-badge-food'
    }
    
    return categoryClassMap[categorySlug] || 'category-badge-default'
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-gray-700">Filter by category:</span>
      
      <Link
        href="/"
        className={`
          px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${pathname === '/' 
            ? 'bg-primary-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
        `}
      >
        All Posts
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors text-white shadow-md
            ${pathname === `/categories/${category.slug}`
              ? getCategoryClass(category.slug)
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `.trim()}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}