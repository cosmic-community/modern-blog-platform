import { getPosts, getFeaturedPosts, getCategories } from '@/lib/cosmic'
import { Post } from '@/types'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories()
  ])

  const mainFeaturedPost = featuredPosts[0];
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Featured Post */}
        {mainFeaturedPost && (
          <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeaturedPost post={mainFeaturedPost} />
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryFilter categories={categories} />
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h2>
              <p className="text-gray-600">Discover our most recent articles and insights</p>
            </div>
            
            {recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600">Check back later for new content.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}