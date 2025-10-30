// app/components/Hero.tsx
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/forest-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>  
        <div 
          className="absolute inset-0 bg-green-900/10" 
          aria-hidden="true"
        />
      </div>
      
      {/* Content */}
      <motion.div 
        className="container mx-auto px-6 text-center max-w-5xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-larken"
          variants={itemVariants}
        >
          Protecting Nature, Nurturing Communities — The Pittachhara Conservation Way
        </motion.h1>
      </motion.div>
    </section>
  );
}