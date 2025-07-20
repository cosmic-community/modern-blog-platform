import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
}

export default function CategoryBadge({ 
  category, 
  size = 'medium', 
  variant = 'default' 
}: CategoryBadgeProps) {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  }

  const variantClasses = {
    default: 'text-white',
    white: 'bg-white text-gray-900 border border-gray-200'
  }

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

  const categoryColorClass = variant === 'default' ? getCategoryClass(category.slug) : ''

  return (
    <Link 
      href={`/categories/${category.slug}`}
      className={`
        inline-flex items-center font-medium rounded-full transition-all hover:shadow-md
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${categoryColorClass}
      `.trim()}
    >
      {category.title}
    </Link>
  )
}