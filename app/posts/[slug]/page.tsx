// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostContent from '@/components/PostContent'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata?.excerpt || `Read ${post.title} on Modern Blog Platform`,
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || `Read ${post.title} on Modern Blog Platform`,
      images: post.metadata?.featured_image ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metadata?.excerpt || `Read ${post.title} on Modern Blog Platform`,
      images: post.metadata?.featured_image ? [
        `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      ] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-primary-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Posts</span>
              </li>
            </ol>
          </nav>

          {/* Post Header */}
          <header className="mb-12">
            <div className="mb-6">
              {post.metadata?.category && (
                <CategoryBadge category={post.metadata.category} />
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.metadata?.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.metadata.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {publishedDate && (
                <time dateTime={post.metadata?.published_date}>
                  {publishedDate}
                </time>
              )}
              {post.metadata?.author && (
                <>
                  <span>•</span>
                  <Link 
                    href={`/authors/${post.metadata.author.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    By {post.metadata.author.title}
                  </Link>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.metadata?.featured_image && (
            <div className="mb-12">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                width={1200}
                height={600}
              />
            </div>
          )}

          {/* Post Content */}
          {post.metadata?.content && (
            <PostContent content={post.metadata.content} />
          )}

          {/* Author Card */}
          {post.metadata?.author && (
            <div className="border-t border-gray-200 pt-12">
              <AuthorCard author={post.metadata.author} />
            </div>
          )}
        </article>
      </main>
      
      <Footer />
    </div>
  )
}