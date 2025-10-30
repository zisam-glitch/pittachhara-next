// app/page.tsx
'use client';

import { Layout } from './components/layout';
import Hero from './components/Hero';
import { VideoPlayer } from './components/VideoPlayer';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NewsItem } from './types';
import { useRef } from 'react';

// Disable SSR for the NewsSlider component to avoid window is not defined errors
const NewsSlider = dynamic(() => import('./components/NewsSlider'), {
  ssr: false,
});

const videos = [
  {
    id: '1',
    title: 'The Beauty of Nature',
    description: 'Experience the breathtaking beauty of our natural world in stunning 4K resolution.',
    src: '/video1.mp4',
    thumb: '/thumb1.png'
  },
  {
    id: '2',
    title: 'Wildlife Wonders',
    description: 'Discover the incredible diversity of wildlife.',
    src: '/video2.mp4',
    thumb: '/thumb2.png'
  },
  {
    id: '3',
    title: 'Ocean Depths',
    description: 'Dive into the mysterious and beautiful world.',
    src: '/video.mp4',
    thumb: '/thumb1.png'
  },
];
// Sample news data
const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New Album Release: Summer Vibes 2023",
    excerpt: "Experience the hottest tracks of the summer with our latest album release.",
    date: "October 15, 2023",
    category: "Music",
    image: "/news/1.jpg",
    alt: "Summer Vibes 2023 Album Cover"
  },
  {
    id: 2,
    title: "Upcoming World Tour Announced",
    excerpt: "We're excited to announce our 2024 world tour across 30+ countries.",
    date: "October 10, 2023",
    category: "Tour",
    image: "/news/2.jpg",
    alt: "World Tour 2024"
  },
  {
    id: 3,
    title: "Behind the Scenes: Making of Our Latest Video",
    excerpt: "Go behind the scenes of our latest music video production.",
    date: "October 5, 2023",
    category: "Videos",
    image: "/news/3.jpeg",
    alt: "Behind the Scenes"
  },
  {
    id: 4,
    title: "Exclusive Interview with the Band",
    excerpt: "Read our exclusive interview with the band about their creative process.",
    date: "September 28, 2023",
    category: "Interviews",
    image: "/news/4.jpg",
    alt: "Band Interview"
  },
  {
    id: 5,
    title: "New Merchandise Collection",
    excerpt: "Check out our latest merchandise collection now available in our store.",
    date: "September 20, 2023",
    category: "Merchandise",
    image: "/news/5.jpeg",
    alt: "New Merchandise"
  }
];

export default function Home() {
  const newsSliderRef = useRef<any>(null);
  return (
    <Layout>
      <Hero />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-geograph">The Pittachhara Conservation Way</h2>
          <div className='grid grid-cols-[2fr_1fr] gap-6 font-geograph'>
            <div>
            <VideoPlayer
              video={videos[0]}
              height="h-[559px]"
              showDetails={false}
              className='pb-2'
            />
            <p className='font-bold text-[17px]'>{videos[0].title}</p>
            <p className='text-[17px]'>{videos[0].description}</p>
            </div>
            <div className='flex flex-col gap-6'>
              <div>
              <VideoPlayer
                video={videos[1]}
                height="h-[238px]"
                showDetails={false}
                className='pb-2'
              />
              <p className='font-bold text-[17px]'>{videos[1].title}</p>
              <p className='text-[17px]'>{videos[1].description}</p>
              </div>
              <div>
              <VideoPlayer
                video={videos[2]}
                height="h-[238px]"
                showDetails={false}
                className='pb-2'
              />
              <p className='font-bold text-[17px]'>{videos[2].title}</p>
              <p className='text-[17px]'>{videos[2].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* News Section */}
      <section className="py-20 bg-white font-geograph">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Latest News</h2>
            <div className="flex space-x-4">
              <button 
                onClick={() => newsSliderRef.current?.slidePrev()}
                className="w-10 h-10  bg-[#f6b417] flex items-center justify-center hover:bg-[#f6b417]/80"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => newsSliderRef.current?.slideNext()}
                className="w-10 h-10 bg-[#f6b417] flex items-center justify-center hover:bg-[#f6b417]/80"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <NewsSlider ref={newsSliderRef} newsItems={newsItems} />
          
          {/* Custom styles for the swiper */}
          <style jsx global>{`
            .swiper-news {
              padding: 20px 0 60px;
            }
            .swiper-slide {
              height: auto;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .swiper-slide:hover {
              transform: translateY(-0px);
            }
            .swiper-button-prev,
            .swiper-button-next {
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.9);
              transition: all 0.3s ease;
              color: #f6b417 !important;
            }
            .swiper-button-prev:after,
            .swiper-button-next:after {
              font-size: 20px !important;
              font-weight: bold;
            }
            .swiper-button-prev:hover,
            .swiper-button-next:hover {
              transform: scale(1);
            }
            .swiper-pagination-bullet {
              width: 12px;
              height: 12px;
              background: rgba(246, 179, 23, 0.6);
              opacity: 0.5;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              width: 30px;
              border-radius: 4px;
              background: #f6b417;
              opacity: 1;
            }
            @media (max-width: 768px) {
              .swiper-button-prev,
              .swiper-button-next {
                display: none;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Donation Section */}
      <section className="bg-white text-gray-800 py-16 font-geograph">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-geograph">Support Our Cause</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Your generous donation helps us protect wildlife, preserve natural habitats, and create a sustainable future for generations to come.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { amount: 500, text: 'Feeds an animal for a week' },
                { amount: 1000, text: 'Supports habitat restoration' },
                { amount: 2500, text: 'Funds conservation research' }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-[#0a2e1f] mb-2">৳{item.amount}</div>
                  <p className="text-gray-600">{item.text}</p>
                  <button className="mt-4 w-full bg-[#f6b417] hover:bg-[#e0a416] text-black py-2 px-6  transition-colors">
                    Donate Now
                  </button>
                </div>
              ))}
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 mb-6">Or enter a custom amount:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="number"
                  placeholder="Amount (৳)"
                  className="flex-grow px-6 py-3 ring-1 ring-[#f6b417] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f6b417]"
                />
                <button className="bg-[#f6b417] hover:bg-[#e0a416] text-black font-semibold px-8 py-3  transition-colors">
                  Donate Now
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                <span className="text-gray-500">All donations are tax-deductible. Your contribution makes a difference!</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 text-gray-800 py-16 font-geograph">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6b417] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6b417] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6b417] focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6b417] focus:border-transparent"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#f6b417] hover:bg-[#f6b417]/80 text-black  px-8 py-3 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}