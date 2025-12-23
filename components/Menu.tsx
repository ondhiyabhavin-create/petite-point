'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaStar, FaFire, FaLeaf, FaClock, FaShoppingCart } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa';
import Image from 'next/image';
import menuData from '@/data/menu.json';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  reviews?: number;
  spiceLevel?: number;
  isPopular?: boolean;
  isChefsSpecial?: boolean;
  dietary?: string[];
  calories?: number;
  prepTime?: string;
}

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'price-low' | 'price-high'>('default');
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [showOnlyChefsSpecial, setShowOnlyChefsSpecial] = useState(false);

  const allDishes: Dish[] = menuData.categories.flatMap(cat => 
    cat.dishes.map(dish => ({ ...dish, category: cat.id }))
  );

  const filteredAndSortedDishes = useMemo(() => {
    let filtered = allDishes.filter(dish => {
      const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPopular = !showOnlyPopular || dish.isPopular;
      const matchesChefsSpecial = !showOnlyChefsSpecial || dish.isChefsSpecial;
      return matchesCategory && matchesSearch && matchesPopular && matchesChefsSpecial;
    });

    // Sort dishes
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, showOnlyPopular, showOnlyChefsSpecial]);

  const popularDishes = allDishes.filter(dish => dish.isPopular).slice(0, 3);
  const chefsSpecialDishes = allDishes.filter(dish => dish.isChefsSpecial);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-xs ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xs ${i < level ? 'text-red-500' : 'text-gray-300'}`}
          >
            🌶️
          </span>
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
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
            Culinary Delights
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-gray-900 mb-4">
            Our Menu
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our delicious vegetarian dishes from North Indian, Chinese, and Punjabi cuisines
          </p>
        </motion.div>

        {/* Chef's Special Banner */}
        {chefsSpecialDishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white p-8 rounded-2xl mb-8 shadow-2xl"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">👨‍🍳 Chef's Special Today</h3>
                <p className="text-primary-100">
                  {chefsSpecialDishes.map(d => d.name).join(', ')}
                </p>
              </div>
              <button
                onClick={() => setShowOnlyChefsSpecial(true)}
                className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Specials
              </button>
            </div>
          </motion.div>
        )}

        {/* Most Popular Section */}
        {popularDishes.length > 0 && selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaFire className="text-orange-500 text-2xl" />
              <h3 className="text-2xl font-bold text-gray-900">Most Popular</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {popularDishes.map((dish) => (
                <motion.div
                  key={dish.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{dish.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(dish.rating || 0)}
                      <span className="text-xs text-gray-600">({dish.reviews})</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
              />
            </div>
          </motion.div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {menuData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
            >
              <option value="default">Sort by</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Filter Toggles */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm flex items-center gap-2 ${
                  showOnlyPopular
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaFire /> Popular
              </button>
              <button
                onClick={() => setShowOnlyChefsSpecial(!showOnlyChefsSpecial)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm flex items-center gap-2 ${
                  showOnlyChefsSpecial
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaUtensils /> Chef's Special
              </button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery + sortBy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAndSortedDishes.length > 0 ? (
              filteredAndSortedDishes.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      {dish.isPopular && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                          <FaFire /> Popular
                        </span>
                      )}
                      {dish.isChefsSpecial && (
                        <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                          👨‍🍳 Chef's Special
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{dish.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{dish.description}</p>
                    
                    {/* Rating and Reviews */}
                    {dish.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(dish.rating)}
                        <span className="text-sm text-gray-600">
                          {dish.rating.toFixed(1)} ({dish.reviews} reviews)
                        </span>
                      </div>
                    )}

                    {/* Spice Level */}
                    {dish.spiceLevel !== undefined && (
                      <div className="mb-2">
                        {renderSpiceLevel(dish.spiceLevel)}
                      </div>
                    )}

                    {/* Dietary Info */}
                    {dish.dietary && dish.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dish.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1"
                          >
                            <FaLeaf /> {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Prep Time and Calories */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      {dish.prepTime && (
                        <span className="flex items-center gap-1">
                          <FaClock /> {dish.prepTime}
                        </span>
                      )}
                      {dish.calories && (
                        <span>{dish.calories} cal</span>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{dish.price}
                      </span>
                      <div className="flex gap-2">
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                          <FaShoppingCart /> Add
                        </button>
                        <a
                          href="https://www.swiggy.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                        >
                          Order
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No dishes found matching your filters.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Order Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mt-12"
        >
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            Order on Swiggy
          </a>
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            Order on Zomato
          </a>
        </motion.div>
      </div>
    </section>
  );
}
