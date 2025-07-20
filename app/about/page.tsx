import { getAboutPage } from '@/lib/cosmic'
import { AboutPage } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Modern Blog',
  description: 'Learn more about Modern Blog, our mission, and what we cover.',
}

export default async function About() {
  const aboutPage: AboutPage | null = await getAboutPage()

  if (!aboutPage) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">About Page Not Found</h1>
            <p className="text-gray-600">The about page content is not available at this time.</p>
          </div>
        </div>
      </div>
    )
  }

  const pageTitle = aboutPage.metadata.page_title || aboutPage.title
  const heroImage = aboutPage.metadata.hero_image
  const introduction = aboutPage.metadata.introduction
  const mainContent = aboutPage.metadata.main_content
  const missionStatement = aboutPage.metadata.mission_statement
  const teamPhoto = aboutPage.metadata.team_photo
  const contactEmail = aboutPage.metadata.contact_email

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {heroImage && (
        <div className="relative h-96 bg-gray-900 overflow-hidden">
          <img
            src={`${heroImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt="About Us Hero"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{pageTitle}</h1>
              {introduction && (
                <p className="text-lg md:text-xl max-w-3xl mx-auto px-4">
                  {introduction}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!heroImage && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{pageTitle}</h1>
              {introduction && (
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  {introduction}
                </p>
              )}
            </div>
          )}

          {/* Main Content */}
          {mainContent && (
            <div className="mb-16">
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mainContent }}
              />
            </div>
          )}

          {/* Mission Statement */}
          {missionStatement && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 text-center italic leading-relaxed">
                "{missionStatement}"
              </p>
            </div>
          )}

          {/* Team Photo */}
          {teamPhoto && (
            <div className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Meet Our Team</h2>
                <div className="flex justify-center">
                  <img
                    src={`${teamPhoto.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt="Our Team"
                    className="rounded-xl shadow-md max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {contactEmail && (
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-700 mb-4">
                Have questions or want to collaborate? We'd love to hear from you.
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}