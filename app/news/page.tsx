'use client';

import { Layout } from '../components/layout';
import Image from 'next/image';
import { NewsItem } from '../types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClock, FiShare2, FiBookmark } from 'react-icons/fi';

// Reusing the news items from the homepage for consistency
const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New Conservation Initiative Launched",
    excerpt: "Pittachhara announces a new conservation program to protect endangered species in the region.",
    date: "October 25, 2023",
    category: "Conservation",
    image: "/news/1.jpg",
    alt: "Conservation Initiative Launch"
  },
  {
    id: 2,
    title: "Community Engagement Program Success",
    excerpt: "Our latest community program has successfully engaged over 200 local residents in conservation efforts.",
    date: "October 20, 2023",
    category: "Community",
    image: "/news/2.jpg",
    alt: "Community Engagement"
  },
  {
    id: 3,
    title: "Rare Species Sighting in Pittachhara",
    excerpt: "Researchers have spotted several rare species in the protected forest area.",
    date: "October 15, 2023",
    category: "Wildlife",
    image: "/news/3.jpg",
    alt: "Rare Wildlife Sighting"
  },
  {
    id: 4,
    title: "Educational Workshop Schools",
    excerpt: "We conducted an environmental education workshop for students from nearby schools.",
    date: "October 10, 2023",
    category: "Education",
    image: "/news/4.jpg",
    alt: "Educational Workshop"
  },
  {
    id: 5,
    title: "Reforestation Project Update",
    excerpt: "Our reforestation efforts have resulted in planting over 5,000 native trees this season.",
    date: "October 5, 2023",
    category: "Reforestation",
    image: "/news/5.jpg",
    alt: "Reforestation Project"
  },
  {
    id: 6,
    title: "Volunteer Program Launched",
    excerpt: "Join our new volunteer program and contribute to wildlife conservation efforts.",
    date: "September 28, 2023",
    category: "Volunteer",
    image: "/news/6.jpg",
    alt: "Volunteer Program"
  }
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function NewsPage() {
  return (
    <Layout>
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[500px] md:h-[500px] flex items-center font-larken justify-center text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 0.77, 0.47, 0.97] }}
            >
              <Image
                src="/news-hero.jpg"
                alt=""
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="100vw"
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>

        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Pittachhara <span className="text-[#f6b417]">News</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover the latest conservation efforts, wildlife stories, and community initiatives
          </p>
       
        </motion.div>
        
        {/* Scrolling indicator */}
     
      </section>

      {/* News Grid with Masonry Layout */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white font-geograph">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#f6b417] font-medium mb-3 text-lg">Our Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Latest <span className="text-[#f6b417]">News &</span> Updates</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore the latest happenings, success stories, and conservation efforts from Pittachhara.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {['All', 'Conservation', 'Wildlife', 'Community', 'Research', 'Events'].map((category, index) => (
              <button 
                key={index}
                className={`px-5 py-2  text-sm font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-[#f6b417] text-black' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          {/* Masonry Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {newsItems.map((item, index) => (
              <motion.article 
                key={item.id} 
                className="group relative overflow-hidden  bg-white"
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 z-10">
                    <button className="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-all">
                      <FiBookmark className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                    <span className="inline-block bg-[#f6b417] text-black text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <FiCalendar className="mr-1.5" />
                    <span>{item.date}</span>
                    <span className="mx-2">•</span>
                    <FiClock className="mr-1.5" />
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-[#f6b417] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-5 line-clamp-2">{item.excerpt}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <Link 
                      href={`/news/${item.id}`} 
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
              </motion.article>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button className="relative group bg-gradient-to-r from-[#f6b417] to-[#e0a416] text-white font-medium py-3.5 px-8 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#f6b417]/30">
              <span className="relative z-10 flex items-center gap-2">
                Load More Articles
                <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#e0a416] to-[#f6b417] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section with Glass Morphism */}
      <section className="relative py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f6b417]/5 via-white to-[#f6b417]/5"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm font-geograph p-8 md:p-12  border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block text-[#f6b417] font-medium mb-3">Stay Connected</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our <span className="text-[#f6b417]">Newsletter</span></h2>
              <p className="text-gray-600 mb-8">
                Get the latest conservation news, event invitations, and wildlife stories delivered straight to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-5 py-3.5 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f6b417] focus:border-transparent transition-all"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <motion.button 
                  type="submit"
                  className="relative group bg-gradient-to-r from-[#f6b417] to-[#e0a416] text-white font-medium py-3.5 px-8  overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#f6b417]/40"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Subscribe</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#e0a416] to-[#f6b417] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-[#f6b417]/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#f6b417]/5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </Layout>
  );
}
