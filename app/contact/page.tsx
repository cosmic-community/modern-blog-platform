import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import BackButton from '@/components/BackButton'

export const metadata: Metadata = {
  title: 'Contact Us - Modern Blog Platform',
  description: 'Get in touch with us. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BackButton />
        
        <div className="bg-white rounded-lg shadow-sm border p-8 mt-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 text-lg">
              Have a question, suggestion, or just want to say hello? 
              We'd love to hear from you. Send us a message and we'll 
              get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Get in touch
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">tony@cosmicjs.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Response time</h3>
                  <p className="text-gray-600">We typically respond within 24 hours</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Support</h3>
                  <p className="text-gray-600">
                    For technical support or questions about our platform, 
                    please include as much detail as possible in your message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}