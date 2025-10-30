'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NewsItem } from '../types';

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
        className="swiper-news"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {newsItems.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <div className="bg-white  overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-4 right-4 px-3 py-1 text-sm  text-black bg-white ">
                  {item.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600  mb-4">{item.excerpt}</p>
                <div className="mt-auto flex justify-between items-center">
                  <button className="text-black font-medium transition-colors">
                    Read More →
                  </button>
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

export default NewsSlider;
