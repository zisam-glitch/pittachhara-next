'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NewsItem } from '@/lib/contentful';

interface NewsSliderProps {
  newsItems: NewsItem[];
}

export interface NewsSliderHandles {
  slidePrev: () => void;
  slideNext: () => void;
}

const NewsSlider = forwardRef<NewsSliderHandles, NewsSliderProps>(({ newsItems }, ref) => {
  const swiperRef = useRef<SwiperType | null>(null);

  useImperativeHandle(ref, () => ({
    slidePrev: () => {
      if (swiperRef.current) {
        swiperRef.current.slidePrev();
      }
    },
    slideNext: () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    },
  }));

  return (
    <div className="relative">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="swiper-news"
      >
        {newsItems.slice(0, 6).map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <div className="bg-white overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="relative overflow-hidden h-48">
                {item.imageUrl ? (
                  <img 
                    src={`https:${item.imageUrl}`} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                {item.category && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-sm text-black bg-white">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                {item.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                )}
                <div className="mt-auto flex justify-between items-center">
                  <a 
                    href={`/updates/${item.slug || item.id}`}
                    className="text-black font-medium transition-colors hover:text-[#f6b417]"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Pagination */}
        <div className="swiper-pagination !relative !mt-8"></div>
      </Swiper>
    </div>
  );
});

NewsSlider.displayName = 'NewsSlider';

export default NewsSlider;
