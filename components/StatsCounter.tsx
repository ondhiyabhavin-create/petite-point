'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaUtensils, FaUsers, FaStar, FaSmile } from 'react-icons/fa';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { icon: <FaUtensils className="text-4xl" />, value: 5000, suffix: '+', label: 'Dishes Served' },
  { icon: <FaUsers className="text-4xl" />, value: 2500, suffix: '+', label: 'Happy Customers' },
  { icon: <FaStar className="text-4xl" />, value: 4.8, suffix: '/5', label: 'Average Rating' },
  { icon: <FaSmile className="text-4xl" />, value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

export default function StatsCounter() {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = stat.value;
            return newCounters;
          });
          clearInterval(timer);
        } else {
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = current;
            return newCounters;
          });
        }
      }, stepDuration);
    });
  }, [isInView]);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4 text-white/90">
                {stat.icon}
              </div>
              <div className="text-5xl font-bold mb-2">
                {stat.suffix === '/5' 
                  ? counters[index].toFixed(1)
                  : Math.floor(counters[index]).toLocaleString()
                }
                {stat.suffix && stat.suffix !== '/5' && stat.suffix}
              </div>
              <div className="text-xl text-white/90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

