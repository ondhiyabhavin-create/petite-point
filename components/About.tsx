'use client';

import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaUtensils, FaLeaf } from 'react-icons/fa';
import Image from 'next/image';

const highlights = [
  { icon: FaLeaf, text: 'Pure Vegetarian' },
  { icon: FaUtensils, text: 'Multi-Cuisine' },
  { icon: FaMapMarkerAlt, text: 'Prime Location' },
];

const images = [
  '/images/about/about-1.jpg',
  '/images/about/about-2.jpg',
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            About Petite Point
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to Petite Point, where culinary excellence meets warm hospitality. 
              We are a pure vegetarian restaurant dedicated to serving authentic flavors 
              from North Indian, Chinese, and Punjabi cuisines.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our chefs craft each dish with passion, using the finest ingredients and 
              traditional recipes passed down through generations. Whether you're craving 
              spicy Punjabi curries, aromatic North Indian delicacies, or flavorful Chinese 
              dishes, we have something special for every palate.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Petite Point, we believe in creating memorable dining experiences. Our 
              cozy ambiance, attentive service, and exceptional food make us the perfect 
              destination for family dinners, celebrations, and casual meals.
            </p>
          </motion.div>

          {/* Image Gallery with Modern Layout */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl group"
              >
                <Image
                  src={img}
                  alt={`Restaurant interior ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <highlight.icon className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">{highlight.text}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Opening Hours & Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="flex items-start gap-4">
            <FaClock className="text-3xl text-primary-600 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Opening Hours</h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span className="font-semibold">11:00 AM - 11:00 PM</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-3xl text-primary-600 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-gray-700">
                Visit us at our prime location for an unforgettable dining experience.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-2 inline-block"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

