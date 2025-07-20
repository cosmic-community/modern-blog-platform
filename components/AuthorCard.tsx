import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author;
  variant?: 'default' | 'compact';
}

export default function AuthorCard({ author, variant = 'default' }: AuthorCardProps) {
  if (variant === 'compact') {
    return (
      <Link 
        href={`/authors/${author.slug}`}
        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{author.title}</h4>
          {author.metadata?.bio && (
            <p className="text-sm text-gray-600 line-clamp-1">
              {author.metadata.bio.split('.')[0]}.
            </p>
          )}
        </div>
      </Link>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        {/* Author Avatar */}
        {author.metadata?.profile_photo && (
          <Link href={`/authors/${author.slug}`} className="flex-shrink-0">
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-16 h-16 rounded-full object-cover hover:opacity-90 transition-opacity"
              width={64}
              height={64}
            />
          </Link>
        )}

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              <Link 
                href={`/authors/${author.slug}`}
                className="hover:text-primary-600 transition-colors"
              >
                {author.title}
              </Link>
            </h4>
            {author.metadata?.bio && (
              <p className="text-gray-600 leading-relaxed">
                {author.metadata.bio}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {author.metadata?.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="Email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            )}
            {author.metadata?.linkedin_url && (
              <a
                href={author.metadata.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}