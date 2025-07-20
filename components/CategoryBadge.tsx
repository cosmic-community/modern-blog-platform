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

  const backgroundColor = category.metadata?.color || '#6b7280'
  
  const badgeStyle = variant === 'default' 
    ? { backgroundColor } 
    : {}

  return (
    <Link 
      href={`/categories/${category.slug}`}
      className={`
        inline-flex items-center font-medium rounded-full transition-all hover:shadow-md
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
      style={badgeStyle}
    >
      {category.title}
    </Link>
  )
}