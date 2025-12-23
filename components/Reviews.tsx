'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaGoogle, FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  source: 'google' | 'zomato' | 'customer';
  photo?: string;
}

// Sample reviews - Replace with actual API data
const sampleReviews: Review[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    rating: 5,
    comment: 'Amazing food! The Paneer Butter Masala was outstanding. Great ambiance and excellent service. Highly recommended!',
    date: '2024-12-15',
    source: 'google',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Best vegetarian restaurant in town! The Dal Makhani is to die for. Staff is very friendly and attentive.',
    date: '2024-12-10',
    source: 'zomato',
  },
  {
    id: 3,
    name: 'Amit Patel',
    rating: 4,
    comment: 'Great place for family dinners. Food quality is excellent and prices are reasonable. Will visit again!',
    date: '2024-12-08',
    source: 'google',
  },
  {
    id: 4,
    name: 'Sneha Desai',
    rating: 5,
    comment: 'The Chole Bhature here is the best I\'ve ever had! Authentic flavors and generous portions.',
    date: '2024-12-05',
    source: 'customer',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    rating: 5,
    comment: 'Excellent service and delicious food. The Biryani is a must-try! Perfect for celebrations.',
    date: '2024-12-01',
    source: 'google',
  },
  {
    id: 6,
    name: 'Anjali Mehta',
    rating: 4,
    comment: 'Loved the Chinese section! Veg Manchurian was perfectly spiced. Clean environment and good value for money.',
    date: '2024-11-28',
    source: 'zomato',
  },
];

const ratingBreakdown = {
  excellent: 85,
  veryGood: 12,
  average: 2,
  poor: 1,
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [averageRating, setAverageRating] = useState(4.8);
  const [totalReviews, setTotalReviews] = useState(1247);

  // In production, fetch from Google Reviews API or Zomato API
  useEffect(() => {
    // Simulate API call
    // fetchGoogleReviews();
    // fetchZomatoReviews();
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google':
        return <FaGoogle className="text-blue-500" />;
      case 'zomato':
        return <span className="text-red-500 font-bold">Z</span>;
      default:
        return <FaQuoteLeft className="text-primary-600" />;
    }
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
        </motion.div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* Overall Rating */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">{averageRating}</div>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">{totalReviews} Reviews</p>
          </div>

          {/* Google Rating */}
          <div className="bg-white border-2 border-gray-200 p-8 rounded-lg text-center">
            <FaGoogle className="text-4xl text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars(5)}
            </div>
            <p className="text-gray-600">Google Reviews</p>
          </div>

          {/* Zomato Rating */}
          <div className="bg-white border-2 border-gray-200 p-8 rounded-lg text-center">
            <span className="text-4xl font-bold text-red-500 mx-auto mb-2 block">Z</span>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.7</div>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars(5)}
            </div>
            <p className="text-gray-600">Zomato Reviews</p>
          </div>
        </motion.div>

        {/* Rating Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-gray-50 p-6 rounded-lg"
        >
          <h3 className="text-xl font-bold mb-4">Rating Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Excellent', value: ratingBreakdown.excellent, stars: 5 },
              { label: 'Very Good', value: ratingBreakdown.veryGood, stars: 4 },
              { label: 'Average', value: ratingBreakdown.average, stars: 3 },
              { label: 'Poor', value: ratingBreakdown.poor, stars: 2 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-24">
                  <span className="text-sm font-semibold">{item.stars}</span>
                  <FaStar className="text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="bg-primary-600 h-full"
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-16 text-right">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white border-2 border-gray-200 p-6 rounded-lg h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getSourceIcon(review.source)}
                      <span className="font-semibold text-gray-900">{review.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
                  <p className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* External Review Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Read more reviews on:</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.google.com/maps/place/Petite+Point"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FaGoogle /> Google Reviews
            </a>
            <a
              href="https://www.zomato.com/petite-point"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <span className="font-bold">Z</span> Zomato Reviews
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

