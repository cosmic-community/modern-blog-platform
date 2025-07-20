'use client'

import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <div>
        {post.metadata?.category && (
          <div className="mb-4">
            <CategoryBadge category={post.metadata.category} variant="white" />
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary-200 transition-colors"
          >
            {post.title}
          </Link>
        </h1>

        {post.metadata?.excerpt && (
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-6 text-primary-200 mb-8">
          {post.metadata?.author && (
            <div className="flex items-center space-x-3">
              {post.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
              )}
              <div>
                <Link 
                  href={`/authors/${post.metadata.author.slug}`}
                  className="font-medium hover:text-white transition-colors"
                >
                  {post.metadata.author.title}
                </Link>
              </div>
            </div>
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

        <Link 
          href={`/posts/${post.slug}`}
          className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
        >
          Read Full Article
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="order-first lg:order-last">
          <Link href={`/posts/${post.slug}`}>
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                width={400}
                height={225}
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}