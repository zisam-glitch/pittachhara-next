import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Client-side only initialization
const createContentfulClient = () => {
  if (typeof window === 'undefined') {
    // Server-side: Check for required environment variables
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful environment variables are not set. Some features may not work.');
      return null;
    }
  }

  return createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN || '',
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || process.env.CONTENTFUL_ENVIRONMENT || 'master',
  });
};

const client = createContentfulClient();

export interface TeamMember {
  id: string;
  fullName: string;
  designation: string;
  description: Document;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: Document;
  imageUrl: string;
  date: string;
  slug: string;
  category?: string;
  alt?: string;
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItem | null> {
  if (!client) {
    console.warn('Contentful client is not initialized. Check your environment variables.');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'updates',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];
    const fields = item.fields as any; // Type assertion since Contentful's types can be complex
    
    return {
      id: item.sys.id,
      title: fields.title || 'No Title',
      excerpt: fields.excerpt || fields.description?.content?.[0]?.content?.[0]?.value || '',
      content: fields.description,
      imageUrl: fields.image?.fields?.file?.url || '',
      date: fields.date || item.sys.createdAt,
      slug: fields.slug || '',
      category: fields.category || 'General',
      alt: fields.alt || fields.title || 'News image',
    };
  } catch (error) {
    console.error('Error fetching news item by slug:', error);
    return null;
  }
}

export async function getAllNewsItems(): Promise<NewsItem[]> {
  if (!client) {
    console.warn('Contentful client is not initialized. Check your environment variables.');
    return [];
  }

  try {
    const response = await client.getEntries({
      content_type: 'updates',
      order: ['-fields.date', '-sys.createdAt'] as any, // Type assertion to fix the type error
    });

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || 'No Title',
      excerpt: item.fields.excerpt || item.fields.description?.content?.[0]?.content?.[0]?.value || '',
      content: item.fields.description,
      imageUrl: item.fields.image?.fields?.file?.url || '',
      date: item.fields.date || item.sys.createdAt,
      slug: item.fields.slug || '',
      category: item.fields.category || 'General',
      alt: item.fields.alt || item.fields.title || 'News image',
    }));
  } catch (error) {
    console.error('Error fetching all news items:', error);
    return [];
  }
}

export async function getNewsItems(): Promise<NewsItem[]> {
  if (!client) {
    console.warn('Contentful client is not initialized. Check your environment variables.');
    return [];
  }
  return getAllNewsItems();
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!client) {
    console.warn('Contentful client is not initialized. Check your environment variables.');
    return [];
  }

  try {
    const response = await client.getEntries({
      content_type: 'team',
      order: ['sys.createdAt'] as const,
    });

    return response.items.map((item: any) => {
      const fields = item.fields;
      return {
        id: item.sys.id,
        fullName: fields.fullName || 'Team Member',
        designation: fields.designation || '',
        description: fields.description || { nodeType: 'document', data: {}, content: [] },
        imageUrl: fields.image?.fields?.file?.url || '',
      };
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getNewsItemById(id: string): Promise<NewsItem | null> {
  if (!client) {
    console.warn('Contentful client is not initialized. Check your environment variables.');
    return null;
  }

  try {
    const response = await client.getEntry(id);
    
    if (!response) {
      return null;
    }

    const fields = response.fields as any;
    
    return {
      id: response.sys.id,
      title: fields.title || 'No Title',
      excerpt: fields.excerpt || fields.description?.content?.[0]?.content?.[0]?.value || '',
      content: fields.description,
      imageUrl: fields.image?.fields?.file?.url || '',
      date: fields.date || response.sys.createdAt,
      slug: fields.slug || '',
      category: fields.category || 'General',
      alt: fields.alt || fields.title || 'News image',
    };
  } catch (error) {
    console.error('Error fetching news item by ID:', error);
    return null;
  }
}
    


