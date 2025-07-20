# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/fb37eeb0-64f4-11f0-a051-23c10f41277a-photo-1506126613408-eca07ce68773-1752966377949.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated blog platform built with Next.js 15 and powered by [Cosmic](https://www.cosmicjs.com) headless CMS. Features a clean, modern design with full content management for posts, authors, and categories.

## Features

- 📝 **Dynamic Blog Posts** - Markdown content rendering with featured images
- 👥 **Author Profiles** - Complete author pages with bios and social links  
- 🏷️ **Category System** - Organized content with color-coded categories
- ⭐ **Featured Posts** - Highlight important content on the homepage
- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile
- 🚀 **Performance Optimized** - Built with Next.js 15 App Router
- 🔍 **SEO Ready** - Optimized metadata and structure

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=687c24757ce43d105ef5ebd0&clone_repository=687c3176ace2d34c4e959819)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Content Management**: [Cosmic](https://www.cosmicjs.com) Headless CMS
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Language**: TypeScript
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the blog content model

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd modern-blog-platform
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Cosmic credentials:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Blog Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with authors and categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .depth(1)
```

### Fetching Authors and Categories
```typescript
// Get all authors
const { objects: authors } = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get all categories
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket using the following content types:

- **Posts**: Blog articles with markdown content, featured images, authors, and categories
- **Authors**: Writer profiles with bios, photos, and social media links
- **Categories**: Content organization with custom colors and descriptions

All content is dynamically fetched from your Cosmic bucket and rendered with proper error handling and TypeScript safety.

## Deployment Options

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Environment Variables**: Set your `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your deployment platform's environment settings.

<!-- README_END -->