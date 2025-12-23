'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  color: string;
}

const featuredDishes: Dish[] = [
  {
    id: 1,
    name: 'Paneer Butter Masala',
    description: 'Rich, creamy tomato gravy',
    image: '/images/menu/paneer-butter-masala.jpg',
    color: '#ff6b35',
  },
  {
    id: 2,
    name: 'Dal Makhani',
    description: 'Creamy black lentils',
    image: '/images/menu/dal-makhani.jpg',
    color: '#f7931e',
  },
  {
    id: 3,
    name: 'Chole Bhature',
    description: 'Spicy chickpeas with fluffy bread',
    image: '/images/menu/chole-bhature.jpg',
    color: '#ffd700',
  },
];

// 3D Dish Model Component
function DishModel({ dish, index }: { dish: Dish; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[2, 2, 0.2]} />
        <MeshDistortMaterial
          color={dish.color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Steam Effect Component
function SteamEffect() {
  const particles = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    return new Float32Array(50 * 3).map(() => (Math.random() - 0.5) * 2);
  }, []);
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.5} />
    </points>
  );
}

export default function FoodShowcase3D() {
  const [selectedDish, setSelectedDish] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            3D Food Showcase
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience our signature dishes in stunning 3D
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[500px] rounded-lg overflow-hidden bg-black/50"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <directionalLight position={[0, 5, 5]} intensity={0.5} />
              
              <DishModel dish={featuredDishes[selectedDish]} index={selectedDish} />
              <SteamEffect />
              
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1}
                minDistance={3}
                maxDistance={8}
              />
              <Environment preset="sunset" />
            </Canvas>
          </motion.div>

          {/* Dish Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold mb-4">
              {featuredDishes[selectedDish].name}
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              {featuredDishes[selectedDish].description}
            </p>

            {/* Dish Selector */}
            <div className="grid grid-cols-3 gap-4">
              {featuredDishes.map((dish, index) => (
                <button
                  key={dish.id}
                  onClick={() => setSelectedDish(index)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDish === index
                      ? 'border-primary-500 bg-primary-500/20'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="relative h-24 w-full mb-2 rounded overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                  <p className="text-sm font-semibold">{dish.name}</p>
                </button>
              ))}
            </div>

            {/* Interactive Features */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="text-xl font-bold mb-4">Interactive Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>✨ 360° Rotate - Drag to rotate the dish</li>
                <li>🔍 Zoom - Scroll to zoom in/out</li>
                <li>💫 Steam Effects - Realistic steam animation</li>
                <li>🎨 Dynamic Lighting - Adjusts with rotation</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

