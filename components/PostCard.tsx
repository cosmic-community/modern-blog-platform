import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <div className="aspect-video overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={300}
              height={170}
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Category Badge */}
        {post.metadata?.category && (
          <div className="mb-3">
            <CategoryBadge category={post.metadata.category} />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {post.metadata?.author && (
              <Link 
                href={`/authors/${post.metadata.author.slug}`}
                className="flex items-center space-x-2 hover:text-primary-600 transition-colors"
              >
                {post.metadata.author.metadata?.profile_photo && (
                  <img
                    src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=32&h=32&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-6 h-6 rounded-full object-cover"
                    width={24}
                    height={24}
                  />
                )}
                <span>{post.metadata.author.title}</span>
              </Link>
            )}
            {publishedDate && (
              <>
                {post.metadata?.author && <span>•</span>}
                <time dateTime={post.metadata?.published_date}>
                  {publishedDate}
                </time>
              </>
            )}
          </div>

          {post.metadata?.featured_post && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              ⭐ Featured
            </span>
          )}
        </div>
      </div>
    </article>
  )
}