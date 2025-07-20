'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()

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
            px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${pathname === `/categories/${category.slug}`
              ? 'text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
          style={
            pathname === `/categories/${category.slug}`
              ? { backgroundColor: category.metadata?.color || '#6b7280' }
              : {}
          }
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}