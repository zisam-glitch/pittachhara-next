'use client';

import { Layout } from '../components/layout';
import BackgroundMusic from '../components/BackgroundMusic';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <BackgroundMusic audioSrc="/audio/contact-background-music.mp3" />
      <div className="min-h-screen text-gray-800">
        {/* Hero Section with Video Background */}
        <section className="relative h-[500px] md:h-[500px] flex items-center font-larken justify-center text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dv5noi9zl/video/upload/v1764608174/VID_20251128203033_w5ohdj.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <motion.div
            className="container mx-auto px-6 relative z-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Get in <span className="text-[#f6b417]">Touch</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We'd love to hear from you. Reach out to us with any questions or inquiries.
            </p>
          </motion.div>
        </section>

        {/* Contact Form Section */}
        <section id='contact' className="py-20 bg-gradient-to-b from-gray-50 to-white font-geograph">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white  shadow-lg p-8 md:p-10">
                <div className="text-center mb-10">
                  <span className="inline-block text-[#f6b417] font-medium mb-3 text-lg">Contact Us</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-5">Send Us a <span className="text-[#f6b417]">Message</span></h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Have questions or want to know more? Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {submitStatus && (
                  <div className={`mb-8 p-4  ${submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300  focus:ring-2 focus:ring-[#f6b417] focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300  focus:ring-2 focus:ring-[#f6b417] focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300  focus:ring-2 focus:ring-[#f6b417] focus:border-transparent transition-all duration-200"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-8 py-3.5 bg-[#f6b417] text-white font-medium  hover:bg-[#e0a415] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f6b417] text-lg transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <motion.div
                className="mt-20 "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center  mb-12">
                  <span className="inline-block text-[#f6b417] font-medium mb-3 text-lg">Our Contact</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-5">Get in <span className="text-[#f6b417]">Touch</span></h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Here's how you can reach us. We're always happy to help!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    className="p-8 bg-white  shadow-md hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-[#fdf6e8]  flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#f6b417]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">Email Us</h3>
                    <p className="text-gray-600 text-center">contact@pittachhara.org</p>
                  </motion.div>

                  <motion.div
                    className="p-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-[#fdf6e8]  flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#f6b417]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">Call Us</h3>
                    <p className="text-gray-600 text-center">+88 01881 502 841</p>
                  </motion.div>

                  <motion.div
                    className="p-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-[#fdf6e8]  flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#f6b417]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">Visit Us</h3>
                    <p className="text-gray-600 text-center">Pittachhara Forest
                      <br />East Khedachara,
                      Matiranga
                      Khagrachhari</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
