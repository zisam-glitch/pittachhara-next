import { NextResponse } from 'next/server';
import { getNewsItems } from '@/lib/contentful';

export async function GET() {
  try {
    const newsItems = await getNewsItems();
    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; // This ensures the route is dynamic and not statically generated
