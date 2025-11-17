'use client';

import { Layout } from '../components/layout';
import Image from 'next/image';
import { NewsItem } from '../types';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiClock, FiShare2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 6; // Number of items to show per page

const UpdatesPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch all news items
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch updates');
        }
        const data = await response.json();
        setNewsItems(data);
        // Initially show first page
        setDisplayedItems(data.slice(0, ITEMS_PER_PAGE));
        setHasMore(data.length > ITEMS_PER_PAGE);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Failed to load updates. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Handle loading more items
  const loadMore = () => {
    const nextPage = currentPage + 1;
    const nextItems = newsItems.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayedItems(nextItems);
    setCurrentPage(nextPage);
    setHasMore(nextItems.length < newsItems.length);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f6b417]"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[#f6b417] text-black rounded hover:bg-[#e0a800] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[500px] flex items-center font-larken justify-center text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full">
              <Image
                src="/news-hero.jpg"
                alt=""
                fill
                className="object-cover"
                quality={100}
                sizes="100vw"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Pittachhara <span className="text-[#f6b417]">Updates</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover the latest conservation efforts, wildlife stories, and community initiatives
          </p>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20 bg-white text-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#f6b417] font-medium mb-3 text-lg">Latest Updates</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Our <span className="text-[#f6b417]">News</span> & Stories</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Stay updated with the latest news, events, and stories from Pittachhara Conservation Trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col group"
              >
                <div className="relative h-56 w-full">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl.startsWith('http') ? item.imageUrl : `https:${item.imageUrl}`}
                      alt={item.alt || item.title || 'News image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        console.error('Error loading image:', item.imageUrl);
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/placeholder.jpg'; // Fallback image
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#f6b417] text-white text-xs font-medium px-3 py-1">
                      {item.category || 'Update'}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FiCalendar className="mr-1.5" />
                    <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="mx-2">•</span>
                    <FiClock className="mr-1.5" />
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-[#f6b417] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-5 line-clamp-2">{item.excerpt}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <Link 
                      href={`/updates/${item.slug}`} 
                      className="text-[#f6b417] font-medium hover:text-[#e0a416] inline-flex items-center group-hover:translate-x-1 transition-transform"
                    >
                      Read More
                      <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FiShare2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button - Only show if there are more items to load */}
          {hasMore && newsItems.length > 0 && (
            <div className="mt-16 text-center">
              <button 
                onClick={loadMore}
                className="relative group bg-gradient-to-r from-[#f6b417] to-[#e0a416] text-white font-medium py-3.5 px-8 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#f6b417]/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Load More Articles
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#e0a416] to-[#f6b417] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          )}

          {/* Show message when all items are loaded */}
        

          {/* Show message when no items are available */}
          {newsItems.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No updates found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
    
    </Layout>
  );
};

export default UpdatesPage;
