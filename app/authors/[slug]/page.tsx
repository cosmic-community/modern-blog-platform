// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { Author } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all authors
export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.title} | Modern Blog Platform`,
    description: author.metadata?.bio || `Read posts by ${author.title} on Modern Blog Platform`,
    openGraph: {
      title: `${author.title} | Modern Blog Platform`,
      description: author.metadata?.bio || `Read posts by ${author.title} on Modern Blog Platform`,
      images: author.metadata?.profile_photo ? [
        {
          url: `${author.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`,
          width: 400,
          height: 400,
          alt: author.title,
        }
      ] : [],
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Author Header */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <span className="text-gray-900 font-medium">Authors</span>
                </li>
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Author Avatar */}
              {author.metadata?.profile_photo && (
                <div className="flex-shrink-0">
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
                    width={160}
                    height={160}
                  />
                </div>
              )}

              {/* Author Info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {author.title}
                </h1>
                
                {author.metadata?.bio && (
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {author.metadata.bio}
                  </p>
                )}

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {author.metadata?.email && (
                    <a
                      href={`mailto:${author.metadata.email}`}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      title="Email"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
                  )}
                  {author.metadata?.twitter_handle && (
                    <a
                      href={`https://twitter.com/${author.metadata.twitter_handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      title="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {author.metadata?.linkedin_url && (
                    <a
                      href={author.metadata.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      title="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author's Posts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Posts by {author.title}
              </h2>
              {posts.length > 0 && (
                <p className="text-gray-600">
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
                </p>
              )}
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 mb-6">
                  {author.title} hasn't published any posts yet. Check back later!
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