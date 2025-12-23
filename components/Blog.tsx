'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Festival Special Menu: Diwali Delights',
    excerpt: 'Celebrate Diwali with our specially curated vegetarian thali featuring traditional sweets and savory dishes.',
    author: 'Chef Rajesh',
    date: '2024-12-20',
    category: 'Festival Menu',
    image: '/images/blog/diwali-menu.jpg',
    slug: 'diwali-delights-2024',
  },
  {
    id: 2,
    title: '5 Tips for Perfect Homemade Naan',
    excerpt: 'Learn the secrets to making soft, fluffy naan at home with our step-by-step guide.',
    author: 'Chef Priya',
    date: '2024-12-15',
    category: 'Cooking Tips',
    image: '/images/blog/naan-tips.jpg',
    slug: 'perfect-naan-tips',
  },
  {
    id: 3,
    title: 'Winter Special: Hot & Spicy Dishes',
    excerpt: 'Warm up this winter with our selection of spicy vegetarian dishes that will keep you cozy.',
    author: 'Chef Amit',
    date: '2024-12-10',
    category: 'Special Offers',
    image: '/images/blog/winter-special.jpg',
    slug: 'winter-spicy-dishes',
  },
  {
    id: 4,
    title: 'New Year Celebration Package',
    excerpt: 'Ring in the New Year with our special celebration package. Book now and get 20% off!',
    author: 'Management',
    date: '2024-12-05',
    category: 'Special Offers',
    image: '/images/blog/new-year.jpg',
    slug: 'new-year-package',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-white">
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
            Latest Updates & News
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest offers, cooking tips, and festival menus
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <FaUser />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
                    Read More <FaArrowRight />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Posts <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

