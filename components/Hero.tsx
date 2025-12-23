'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaPhone, FaWhatsapp, FaPlay } from 'react-icons/fa';

const backgroundImages = [
  '/images/hero/home.jpg',
  '/images/hero/home-1.jpg',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Preload all images for smooth transitions
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = backgroundImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoaded(true);
      }
    };

    preloadImages();

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel - Using CSS background for better control */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImage === index ? 'opacity-100 z-0' : 'opacity-0 z-[-1] pointer-events-none'
            }`}
            style={{ 
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
            }}
          >
            {/* Static Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content with Optimized Animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase inline-block">
            Pure Vegetarian Excellence
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif mb-6 leading-tight"
        >
          <span className="block bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
            Petite Point
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl mb-4 text-gray-200 font-light tracking-wide"
        >
          Where Tradition Meets Taste
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-12"
        >
          Pure Veg • Multi-Cuisine • Authentic Flavors
        </motion.p>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
        >
          <motion.a
            href="tel:+917623966440"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-lg md:text-xl hover:text-primary-300 transition-colors group"
          >
            <span className="bg-white/10 backdrop-blur-sm p-3 rounded-full group-hover:bg-white/20 transition-colors">
              <FaPhone />
            </span>
            <span className="font-semibold">+91 76239 66440</span>
          </motion.a>
          <span className="hidden md:inline text-white/30">•</span>
          <motion.a
            href="https://wa.me/917623966440"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-lg md:text-xl hover:text-green-300 transition-colors group"
          >
            <span className="bg-green-500/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-green-500/30 transition-colors">
              <FaWhatsapp />
            </span>
            <span className="font-semibold">WhatsApp Us</span>
          </motion.a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollToSection('#menu')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Menu
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('#contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-xl"
          >
            <span className="flex items-center gap-2">
              <FaPlay className="text-sm" />
              Book Table
            </span>
          </motion.button>
        </motion.div>

        {/* Image Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentImage === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-white group"
          aria-label="Scroll down"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-sm font-semibold tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-2xl"
          >
            <FaArrowDown />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
