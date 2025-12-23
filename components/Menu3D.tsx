'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Center, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import menuData from '@/data/menu.json';

interface MenuPage {
  category: string;
  dishes: typeof menuData.categories[0]['dishes'];
}

export default function Menu3D() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const menuPages: MenuPage[] = menuData.categories.map(cat => ({
    category: cat.name,
    dishes: cat.dishes.slice(0, 3), // Show 3 dishes per page
  }));

  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    setIsFlipping(true);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage((prev) => (prev + 1) % menuPages.length);
      } else {
        setCurrentPage((prev) => (prev - 1 + menuPages.length) % menuPages.length);
      }
      setIsFlipping(false);
    }, 300);
  };

  return (
    <section id="menu-3d" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            3D Menu Experience
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Flip through our menu in an immersive 3D experience
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 3D Menu Book */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[600px] relative perspective-1000"
            >
              <div className={`relative w-full h-full transition-transform duration-300 ${isFlipping ? 'rotate-y-180' : ''}`}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  
                  <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                    <group rotation={[0, currentPage * 0.1, 0]}>
                      {/* Menu Page */}
                      <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[3, 4, 0.1]} />
                        <meshStandardMaterial color="#f5f5dc" />
                      </mesh>
                      
                      {/* Menu Text */}
                      <Center>
                        <Text
                          fontSize={0.3}
                          color="#8b4513"
                          anchorX="center"
                          anchorY="middle"
                          position={[0, 1, 0.1]}
                        >
                          {menuPages[currentPage].category}
                        </Text>
                      </Center>
                    </group>
                  </Float>
                  
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    {menuPages[currentPage].category}
                  </h3>
                  
                  <div className="space-y-4">
                    {menuPages[currentPage].dishes.map((dish) => (
                      <motion.div
                        key={dish.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-start gap-4">
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
                            <h4 className="font-bold text-gray-900 mb-1">{dish.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-primary-600">
                                ₹{dish.price}
                              </span>
                              {dish.rating && (
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-400">⭐</span>
                                  <span className="text-sm text-gray-600">
                                    {dish.rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t">
                <button
                  onClick={() => flipPage('prev')}
                  disabled={isFlipping}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <span className="text-gray-600">
                  Page {currentPage + 1} of {menuPages.length}
                </span>
                <button
                  onClick={() => flipPage('next')}
                  disabled={isFlipping}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

