// app/page.tsx
'use client';

import { Layout } from './components/layout';
import Hero from './components/Hero';
import { VideoPlayer } from './components/VideoPlayer';
import BackgroundMusic from './components/BackgroundMusic';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NewsItem } from './types';
import { useRef, useState, useEffect, ForwardedRef } from 'react';
import parse from 'html-react-parser';

// Import NewsSlider with SSR disabled
const NewsSlider = dynamic(() => import('./components/NewsSlider'), {
  ssr: false,
  loading: () => <div>Loading news...</div>,
});

const videos = [
  {
    id: '1',
    title: 'Pittachhara Forest Conservation',
    description: 'Pittachhara Trust is conserving one of the last semi-evergreen hill forests within the Indo-Burma Biodiversity Hotspot — a sanctuary for threatened species and a vital climate buffer for Bangladesh. The forest hosts nearly 150 bird species, rare mammals such as the Bengal Slow Loris and Leopard Cat, and over 40 reptiles and amphibians. <br/><br/> Through science-based rewilding, native tree restoration, and stream rehabilitation, we are rebuilding ecological connectivity and strengthening ecosystem resilience. Our community programs create sustainable livelihoods—handicrafts, mushroom cultivation, organic farming—reducing pressure on forests and fostering long-term stewardship. <br/><br/> We also operate a wildlife rescue, rehabilitation, and release facility, supporting national conservation efforts and protecting displaced wildlife. <br/><br/> By uniting ecological restoration, wildlife protection, and community empowerment, Pittachhara Trust offers a scalable nature-based solution to biodiversity loss and climate challenges—ensuring Pittachhara remains a living sanctuary for generations to come.',
    src: 'https://res.cloudinary.com/dv5noi9zl/video/upload/v1764608842/lv_0_20251117200128_1_tppbfo.mp4',
    thumb: '/avs/1.png'
  },
  {
    id: '5',
    title: 'Free Health Program',
    description: 'Established in 2017, the Pittachhara Medical Center is a free healthcare facility serving both indigenous and Bengali communities in the remote Khagrachari District. The center is staffed by a dedicated medical team, including two MBBS doctors (one gynecology specialist), a certified midwife, a village doctor, a family planning officer, and a clinic assistant. <br/> <br/> In addition to comprehensive medical care, the center offers a subsidized pharmacy, free malaria and eye tests, and free cataract surgeries, ensuring accessible and essential healthcare for underserved communities.',
    src: 'https://res.cloudinary.com/dv5noi9zl/video/upload/v1764609269/video_20251117_221520_edit_sxxqzc.mp4',
    thumb: '/avs/2.png'
  },
  {
    id: '7',
    title: 'Eco-friendly Menstraul Health Program',
    description: 'Pittachhara Medical Center has launched an innovative Menstrual Hygiene Management (MHM) initiative to promote women’s health, environmental sustainability, and economic empowerment in 11 remote hilly villages of Khagrachari District, Bangladesh. The program introduced reusable sanitary pads developed with modern eco-friendly techniques that reduce environmental pollution by up to 75% compared to conventional disposable pads. <br/><br/> To ensure long-term impact and local ownership, 14 adolescent girls from seven villages were trained to produce and distribute these reusable pads, creating new livelihood opportunities within their communities. A nine-month consultation and monitoring process helped ensure proper use, hygiene, and community acceptance—achieving an 80% success rate. This initiative not only improves menstrual health and dignity but also advances gender equality, waste reduction, and climate-resilient livelihoods across marginalized areas.',
    src: 'https://res.cloudinary.com/dv5noi9zl/video/upload/v1764609288/video_20251118_153754_edit_qnwzyo.mp4',
    thumb: '/avs/5.jpg'
  },
  {
    id: '8',
    title: 'Community Library and Nature Studies',
    description: 'Pittachhara Trust has established a vibrant community library with over 250 members, primarily children and adolescents. The library promotes digital literacy, science education, and biodiversity awareness through regular activities such as nature walks, drama and puppet shows, art camps, Primate Fairs, award ceremonies, and school biodiversity sessions, empowering members to become active stewards of nature. <br/> <br/> In collaboration with renowned universities, the Trust conducts biodiversity awareness programs in local schools. These initiatives build a strong foundation for sustainable conservation leadership in  Bangladesh.',
    src: 'https://res.cloudinary.com/dv5noi9zl/video/upload/v1764609258/lv_0_20251117220436_avgztm.mp4',
    thumb: '/avs/2.jpg'
  },
  {
    id: '2',
    title: 'Research, Monioring and Collaboration',
    description: 'The Pittachhara Trust conducts continuous surveys to monitor wildlife population trends — identifying patterns of growth or decline and the ecological factors influencing them. Its research spans biodiversity assessment, natural stream restoration, and the conservation of endangered species. <br/><br/> In advancing this mission, the Trust collaborates with the Bangladesh Forest Research Institute (BFRI), Plumploris e.V, Oriental Bird Club (OBC), and universities. <br/><br/> The Pittachhara Trust also facilitates research opportunities for both national and international scholars, offering field support for PhD studies, internships, and conservation research programs aimed at strengthening science-based conservation in the region.',
    src: '1.mp4',
    thumb: '/avs/2.jpeg'
  },
  {
    id: '3',
    title: 'Wildlife Rescue, Rehabilitation, and Release',
    description: 'Effective wildlife conservation relies on comprehensive rescue, medical care, and scientifically guided rehabilitation programs. At the Pittachhara Trust, each rescued animal undergoes a thorough health assessment, wound treatment, parasite screening, and behavioral evaluation prior to release into suitable natural habitats. <br/><br/> Post-release monitoring — through visual surveys, camera traps, and radio telemetry — helps assess survival, adaptation, and the long-term impact of rehabilitation efforts. <br/><br/>  collaboration with the Germany-based organization Plumploris e.V, the Pittachhara Trust integrates these rescue and rehabilitation initiatives within a broader ecosystem restoration framework. This approach connects immediate animal welfare with long-term conservation outcomes, contributing to the recovery of biodiversity across one of Bangladesh’s most threatened yet ecologically rich hill forest regions.',
    src: '1.mp4',
    thumb: '/avs/3.jpg'
  },
  {
    id: '4',
    title: 'Nursary',
    description: 'The Pittachhara Trust is restoring the region’s native landscapes through strategic planting and dedicated nursery cultivation. By reintroducing over 60 plant species, including 12 varieties of bamboo, the Trust is nurturing vibrant ecosystems, revitalizing habitats, and giving wildlife the foundation to thrive once again.',
    src: '1.mp4',
    thumb: '/avs/4.jpg'
  },
  
  {
    id: '6',
    title: 'Empowering Communites',
    description: 'Pittachhara Trust organized capacity-building training programs on handicrafts, sewing, mushroom cultivation, and free-range poultry farming to promote women’s empowerment and sustainable community livelihoods. The Trust also donated sewing machines and poultry to underprivileged individuals to help them start small-scale income-generating activities. <br/><br/>In addition, small capital support was provided to help beneficiaries invest in meat and fish shops and to supply organic free-range chicken to major cities. These initiatives also targeted former loggers, helping them transition to alternative and environmentally friendly livelihoods, reducing dependency on forest resources.',
    src: '6.mp4',
    thumb: '/avs/6.jpg'
  },
  
];

const ReadMore = ({ text, maxLength = 185 }: { text: string; maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return <p className='text-[16px]'>{parse(text)}</p>;
  }

  const truncatedText = isExpanded ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div>
      <p className='text-[16px]'>{parse(truncatedText)} <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[16px] hover:underline mt-1 text-sm font-bold underline"
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </button></p>
      
    </div>
  );
};

export default function Home() {
  const newsSliderRef = useRef<{ slidePrev: () => void; slideNext: () => void }>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNewsItems(data);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Layout>
      <BackgroundMusic />
      <Hero />
      <section id='avs' className="py-20 text-gray-800 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-geograph">The Pittachhara Conservation Way</h2>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-8 font-geograph'>
            {videos.map((video) => (
              <div key={video.id}>
                <VideoPlayer
                  video={video}
                  height='md:h-[350px] h-[200px]'
                  showDetails={false}
                  className='pb-2'
                />
                <p className='font-bold text-[17px]'>{video.title}</p>
                <ReadMore text={video.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white text-gray-800 font-geograph">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Latest Updates</h2>
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  const swiper = document.querySelector('.swiper-news') as any;
                  if (swiper && swiper.swiper) {
                    swiper.swiper.slidePrev();
                  }
                }}
                className="w-10 h-10 bg-[#f6b417] flex items-center justify-center hover:bg-[#f6b417]/80"
                aria-label="Previous slide"
                disabled={isLoading || newsItems.length === 0}
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  const swiper = document.querySelector('.swiper-news') as any;
                  if (swiper && swiper.swiper) {
                    swiper.swiper.slideNext();
                  }
                }}
                className="w-10 h-10 bg-[#f6b417] flex items-center justify-center hover:bg-[#f6b417]/80"
                aria-label="Next slide"
                disabled={isLoading || newsItems.length === 0}
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f6b417]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : newsItems.length > 0 ? (
            <NewsSlider ref={newsSliderRef} newsItems={newsItems} />
          ) : (
            <div className="text-center py-12">No news available at the moment.</div>
          )}
          
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

      {/* Support Section */}
      <section id='support' className="bg-white text-gray-800 py-16 font-geograph">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-geograph">Get Involved</h2>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
              Your support helps us protect wildlife, preserve natural habitats, and create a sustainable future for generations to come.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Donation Card */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <h3 className="text-2xl font-semibold text-[#0a2e1f] mb-4">Make a Donation</h3>
                  <p className="text-gray-600 mb-6">
                    We appreciate your willingness to support our mission. To make a donation, please contact us directly via email and our team will guide you through the process.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <a 
                    href="/contact#contact"
                    className="inline-block w-full bg-[#f6b417] hover:bg-[#e0a416] text-black font-semibold px-8 py-3 rounded transition-colors text-center"
                  >
                    Contact Us to Donate
                  </a>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    All donations are tax-deductible. Your contribution makes a difference!
                  </p>
                </div>
              </div>

              {/* Volunteer Card */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <h3 className="text-2xl font-semibold text-[#0a2e1f] mb-4">Become a Volunteer</h3>
                  <p className="text-gray-600 mb-6">
                    Join our team of dedicated volunteers and make a direct impact. Share your skills, time, and passion for conservation with us.
                  </p>
                 
                </div>
                
                <div className="mt-auto">
                  <a 
                    href="/contact#contact"
                    className="inline-block w-full bg-[#0a2e1f] hover:bg-[#082519] text-white font-semibold px-8 py-3 rounded transition-colors text-center"
                  >
                    Join Our Volunteer Team
                  </a>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    No experience necessary - just bring your enthusiasm and commitment!
                  </p>
                </div>
              </div>

              {/* Research/Internship/Thesis Card */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <h3 className="text-2xl font-semibold text-[#0a2e1f] mb-4">Research & Academics</h3>
                  <p className="text-gray-600 mb-6">
                    Explore research, internship, and thesis opportunities in biodiversity conservation, wildlife research, and sustainable development.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <a 
                    href="/contact#contact"
                    className="inline-block w-full bg-[#f6b417] hover:bg-[#e0a416] text-black font-semibold px-8 py-3 rounded transition-colors text-center"
                  >
                    Apply Now
                  </a>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Open to students and researchers from all over the world
                  </p>
                </div>
              </div>
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

      {/* Contact Form Section */}
    
    </Layout>
  );
}