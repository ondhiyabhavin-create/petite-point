'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaInstagram, FaUtensils, FaHome } from 'react-icons/fa';
import Image from 'next/image';

// Real gallery images from the uploaded files - including about images
const galleryImages = [
  // About images (interior/restaurant)
  { id: 1, src: '/images/about/about-1.jpg', category: 'interior' },
  { id: 2, src: '/images/about/about-2.jpg', category: 'interior' },
  // Gallery images
  { id: 3, src: '/images/gallery/unnamed(1).jpg', category: 'food' },
  { id: 4, src: '/images/gallery/unnamed(2).jpg', category: 'interior' },
  { id: 5, src: '/images/gallery/unnamed(10).jpg', category: 'food' },
  { id: 6, src: '/images/gallery/unnamed(11).jpg', category: 'interior' },
  { id: 7, src: '/images/gallery/unnamed(12).jpg', category: 'food' },
  { id: 8, src: '/images/gallery/unnamed(13).jpg', category: 'interior' },
  { id: 9, src: '/images/gallery/unnamed(14).jpg', category: 'food' },
  { id: 10, src: '/images/gallery/unnamed(15).jpg', category: 'interior' },
  { id: 11, src: '/images/gallery/unnamed(16).jpg', category: 'food' },
  { id: 12, src: '/images/gallery/unnamed(17).jpg', category: 'interior' },
  { id: 13, src: '/images/gallery/unnamed(18).jpg', category: 'food' },
  { id: 14, src: '/images/gallery/unnamed(19).jpg', category: 'interior' },
  { id: 15, src: '/images/gallery/unnamed(20).jpg', category: 'food' },
  { id: 16, src: '/images/gallery/unnamed(21).jpg', category: 'interior' },
  { id: 17, src: '/images/gallery/unnamed(22).jpg', category: 'food' },
  { id: 18, src: '/images/gallery/unnamed(23).jpg', category: 'interior' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredImages = useMemo(() => {
    return filter === 'all' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === filter);
  }, [filter]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((_, idx) => idx === selectedImage);
    if (direction === 'next') {
      setSelectedImage((currentIndex + 1) % filteredImages.length);
    } else {
      setSelectedImage((currentIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header with Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-primary-600 font-bold text-sm uppercase tracking-wider mb-4"
          >
            Visual Journey
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-gray-900 mb-4">
            Our Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our restaurant through stunning visuals
          </p>
        </motion.div>

        {/* Instagram Feed Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-8 rounded-3xl text-white shadow-2xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaInstagram className="text-3xl" />
                <h3 className="text-2xl font-bold">Follow Us on Instagram</h3>
              </div>
              <p className="text-white/90">See our latest dishes and events @petitepoint</p>
            </div>
            <motion.a
              href="https://www.instagram.com/petitepoint"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-pink-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
            >
              <FaInstagram /> Follow Us
            </motion.a>
          </div>
        </motion.div>

        {/* Filter Buttons with Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { id: 'all', label: 'All', icon: null },
            { id: 'food', label: 'Food', icon: FaUtensils },
            { id: 'interior', label: 'Interior', icon: FaHome },
          ].map((filterOption) => {
            const Icon = filterOption.icon;
            return (
              <motion.button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  filter === filterOption.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {Icon && <Icon />}
                {filterOption.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery Grid with Modern Masonry Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xl group ${
                  index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={`Gallery image ${image.id}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white font-semibold text-sm">
                      {image.category === 'food' ? '🍽️ Food' : '🏠 Interior'}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox with Modern Design */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-6xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-primary-400 transition-colors bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70"
                  aria-label="Close lightbox"
                >
                  <FaTimes />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-primary-400 transition-colors bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-primary-400 transition-colors bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70"
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
                <div className="relative w-full h-[90vh] rounded-2xl overflow-hidden">
                  <Image
                    src={filteredImages[selectedImage].src}
                    alt={`Gallery image ${filteredImages[selectedImage].id}`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                  <p className="text-sm opacity-75">
                    {selectedImage + 1} / {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
