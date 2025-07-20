import { createBucketClient } from '@cosmicjs/sdk'

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG is required')
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY is required')
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// API functions
export async function getPosts(): Promise<import('../types').Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as import('../types').Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function getPost(slug: string): Promise<import('../types').Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as import('../types').Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
}

export async function getAuthors(): Promise<import('../types').Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.objects as import('../types').Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching authors:', error);
    throw new Error('Failed to fetch authors');
  }
}

export async function getAuthor(slug: string): Promise<import('../types').Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.object as import('../types').Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching author:', error);
    throw new Error('Failed to fetch author');
  }
}

export async function getCategories(): Promise<import('../types').Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.objects as import('../types').Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategory(slug: string): Promise<import('../types').Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.object as import('../types').Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching category:', error);
    throw new Error('Failed to fetch category');
  }
}

export async function getPostsByCategory(categoryId: string): Promise<import('../types').Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as import('../types').Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching posts by category:', error);
    throw new Error('Failed to fetch posts by category');
  }
}

export async function getPostsByAuthor(authorId: string): Promise<import('../types').Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as import('../types').Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching posts by author:', error);
    throw new Error('Failed to fetch posts by author');
  }
}

export async function getFeaturedPosts(): Promise<import('../types').Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.featured_post': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as import('../types').Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching featured posts:', error);
    throw new Error('Failed to fetch featured posts');
  }
}

export async function getAboutPage(): Promise<import('../types').AboutPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about-pages', slug: 'about' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.object as import('../types').AboutPage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching about page:', error);
    throw new Error('Failed to fetch about page');
  }
}