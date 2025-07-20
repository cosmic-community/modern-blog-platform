// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { Category } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} | Modern Blog Platform`,
    description: category.metadata?.description || `Browse all ${category.title} posts on Modern Blog Platform`,
    openGraph: {
      title: `${category.title} | Modern Blog Platform`,
      description: category.metadata?.description || `Browse all ${category.title} posts on Modern Blog Platform`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-300">
                <li>
                  <Link 
                    href="/" 
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">Categories</span>
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-4 mb-6">
              <CategoryBadge category={category} size="large" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.title} Posts
            </h1>
            
            {category.metadata?.description && (
              <p className="text-xl text-gray-300 max-w-3xl">
                {category.metadata.description}
              </p>
            )}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-gray-600">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'} in {category.title}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <CategoryBadge category={category} size="large" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No posts in {category.title} yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Check back later for new content in this category.
                </p>
                <Link 
                  href="/"
                  className="btn-primary inline-flex items-center"
                >
                  Browse All Posts
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}