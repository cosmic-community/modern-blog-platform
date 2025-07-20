import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modern Blog Platform',
  description: 'A sophisticated blog platform built with Next.js and Cosmic CMS',
  keywords: ['blog', 'nextjs', 'cosmic', 'cms', 'typescript'],
  authors: [{ name: 'Blog Platform' }],
  creator: 'Modern Blog Platform',
  publisher: 'Modern Blog Platform',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://modern-blog-platform.vercel.app',
    siteName: 'Modern Blog Platform',
    title: 'Modern Blog Platform',
    description: 'A sophisticated blog platform built with Next.js and Cosmic CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog Platform',
    description: 'A sophisticated blog platform built with Next.js and Cosmic CMS',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}