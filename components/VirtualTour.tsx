'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaMoon, FaSun, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface Hotspot {
  id: number;
  position: [number, number, number];
  label: string;
  description: string;
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    position: [-3, 1, -2],
    label: 'Main Dining Area',
    description: 'Spacious dining area with comfortable seating for families and groups',
  },
  {
    id: 2,
    position: [3, 1, -2],
    label: 'Private Booth',
    description: 'Intimate private booths perfect for romantic dinners',
  },
  {
    id: 3,
    position: [0, 0, -4],
    label: 'Chef\'s Counter',
    description: 'Watch our chefs prepare your meal with passion and precision',
  },
];

// Hotspot Marker Component
function HotspotMarker({ hotspot, onClick }: { hotspot: Hotspot; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
      meshRef.current.position.y = hotspot.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={hotspot.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.5 : 1}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#ff6b35' : '#dc2626'}
          emissive={hovered ? '#ff6b35' : '#dc2626'}
          emissiveIntensity={0.5}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {hotspot.label}
        </Text>
      )}
    </group>
  );
}

// Room Geometry
function RestaurantRoom() {
  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Tables */}
      {[-3, 0, 3].map((x) => (
        <group key={x} position={[x, 0, -3]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default function VirtualTour() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);

  return (
    <section id="virtual-tour" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            Virtual Restaurant Tour
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our restaurant in immersive 3D. Click hotspots to learn more about different areas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4">Controls</h3>
            <div className="space-y-4">
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors"
              >
                <span>Day/Night Mode</span>
                {isNightMode ? <FaMoon /> : <FaSun />}
              </button>
              <button
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors"
              >
                <span>Ambient Sounds</span>
                {isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>
            </div>
          </motion.div>

          {/* Hotspot Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-500" />
              Interactive Hotspots
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedHotspot?.id === hotspot.id
                      ? 'border-primary-500 bg-primary-500/20'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <h4 className="font-bold mb-1">{hotspot.label}</h4>
                  <p className="text-sm text-gray-400">{hotspot.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-[600px] rounded-lg overflow-hidden bg-black relative"
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={60} />
            <ambientLight intensity={isNightMode ? 0.3 : 0.8} />
            <pointLight position={[10, 10, 10]} intensity={isNightMode ? 0.5 : 1} />
            <directionalLight position={[0, 5, 5]} intensity={isNightMode ? 0.3 : 0.8} />
            
            <RestaurantRoom />
            
            {hotspots.map((hotspot) => (
              <HotspotMarker
                key={hotspot.id}
                hotspot={hotspot}
                onClick={() => setSelectedHotspot(hotspot)}
              />
            ))}
            
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              minDistance={5}
              maxDistance={15}
            />
            <Environment preset={isNightMode ? 'night' : 'sunset'} />
          </Canvas>

          {/* Instructions Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-4 rounded-lg text-sm">
            <p className="mb-2">🖱️ Left Click + Drag: Rotate</p>
            <p className="mb-2">🔍 Scroll: Zoom In/Out</p>
            <p>📍 Click Red Markers: View Details</p>
          </div>
        </motion.div>

        {/* Selected Hotspot Modal */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedHotspot(null)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-gray-800 p-8 rounded-lg max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-4">{selectedHotspot.label}</h3>
                <p className="text-gray-300 mb-6">{selectedHotspot.description}</p>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

