export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: any; // Rich text content from Contentful
  imageUrl: string;
  date: string;
  slug: string;
  category?: string;
  alt?: string;
}
