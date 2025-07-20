// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Post interface
interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    content?: string;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    published_date?: string;
    featured_post?: boolean;
  };
}

// Author interface
interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    twitter_handle?: string;
    linkedin_url?: string;
  };
}

// Category interface
interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// About Page interface
interface AboutPage extends CosmicObject {
  type: 'about-pages';
  metadata: {
    page_title?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    introduction?: string;
    main_content?: string;
    mission_statement?: string;
    team_photo?: {
      url: string;
      imgix_url: string;
    };
    contact_email?: string;
  };
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

interface CosmicSingleResponse<T> {
  object: T;
}

// Type guards
function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

function isAboutPage(obj: CosmicObject): obj is AboutPage {
  return obj.type === 'about-pages';
}

// Export types
export type {
  CosmicObject,
  Post,
  Author,
  Category,
  AboutPage,
  CosmicResponse,
  CosmicSingleResponse
};

export {
  isPost,
  isAuthor,
  isCategory,
  isAboutPage
};