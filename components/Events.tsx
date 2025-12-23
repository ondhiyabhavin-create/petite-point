'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaEnvelope, FaPhone, FaDownload, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

interface EventPackage {
  id: number;
  name: string;
  capacity: number;
  price: number;
  description: string;
  features: string[];
  image: string;
}

const eventPackages: EventPackage[] = [
  {
    id: 1,
    name: 'Small Gathering',
    capacity: 20,
    price: 15000,
    description: 'Perfect for intimate celebrations',
    features: ['Buffet menu', 'Basic decoration', 'Sound system', 'Photography'],
    image: '/images/events/small-event.jpg',
  },
  {
    id: 2,
    name: 'Medium Event',
    capacity: 50,
    price: 35000,
    description: 'Ideal for family functions',
    features: ['Premium buffet', 'Stage decoration', 'DJ & sound', 'Professional photography', 'Flower arrangements'],
    image: '/images/events/medium-event.jpg',
  },
  {
    id: 3,
    name: 'Large Banquet',
    capacity: 100,
    price: 70000,
    description: 'Grand celebrations and corporate events',
    features: ['Luxury buffet', 'Full stage setup', 'Live music', 'Video coverage', 'Premium decoration', 'Event coordinator'],
    image: '/images/events/large-event.jpg',
  },
];

interface EventFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  packageId: number;
  message: string;
}

export default function Events() {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: 20,
    packageId: 0,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS credentials not configured');
      }

      const selectedPackage = eventPackages.find(p => p.id === formData.packageId);

      await emailjs.send(
        serviceId,
        templateId,
        {
          type: 'Event Inquiry',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          guests: formData.guests.toString(),
          package: selectedPackage?.name || 'Custom',
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guests: 20,
        packageId: 0,
        message: '',
      });
    } catch (error) {
      console.error('Event inquiry error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePrice = () => {
    const selectedPackage = eventPackages.find(p => p.id === formData.packageId);
    if (!selectedPackage) return 0;
    
    // Base price + additional guests beyond package capacity
    const additionalGuests = Math.max(0, formData.guests - selectedPackage.capacity);
    const additionalCost = additionalGuests * 500; // ₹500 per additional guest
    
    return selectedPackage.price + additionalCost;
  };

  return (
    <section id="events" className="py-20 bg-gray-50">
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
            Events & Banquets
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Host your special occasions with us. From intimate gatherings to grand celebrations
          </p>
        </motion.div>

        {/* Event Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {eventPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                formData.packageId === pkg.id ? 'ring-2 ring-primary-600' : ''
              }`}
            >
              <div className="relative h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <FaUsers />
                  <span>Up to {pkg.capacity} guests</span>
                </div>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, packageId: pkg.id, guests: pkg.capacity })}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    formData.packageId === pkg.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {formData.packageId === pkg.id ? 'Selected' : 'Select Package'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hall Capacity Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-lg shadow-lg mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">Hall Capacity</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Seating Arrangements</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Theater Style: Up to 150 guests</li>
                <li>• Banquet Style: Up to 100 guests</li>
                <li>• Cocktail Style: Up to 200 guests</li>
                <li>• Classroom Style: Up to 80 guests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Amenities</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Air-conditioned hall</li>
                <li>• Stage with sound system</li>
                <li>• Projector & screen</li>
                <li>• Parking facility</li>
                <li>• Separate kitchen area</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Event Inquiry Form */}
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Event Inquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                    placeholder="+91 12345 67890"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  max="200"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none resize-none"
                  placeholder="Tell us about your event requirements..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                  Thank you! We'll contact you shortly to discuss your event.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                  Error submitting form. Please call us directly at +91 76239 66440.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>

          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Price Calculator</h3>
            {formData.packageId > 0 ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Selected Package</p>
                  <p className="text-xl font-bold text-gray-900">
                    {eventPackages.find(p => p.id === formData.packageId)?.name}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Number of Guests</p>
                  <p className="text-xl font-bold text-gray-900">{formData.guests}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Base Package</span>
                    <span className="font-semibold">
                      ₹{eventPackages.find(p => p.id === formData.packageId)?.price.toLocaleString()}
                    </span>
                  </div>
                  {formData.guests > (eventPackages.find(p => p.id === formData.packageId)?.capacity || 0) && (
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-gray-600">Additional Guests</span>
                      <span className="font-semibold">
                        +₹{((formData.guests - (eventPackages.find(p => p.id === formData.packageId)?.capacity || 0)) * 500).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xl font-bold">Total Estimate</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{calculatePrice().toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * Final pricing may vary based on specific requirements
                </p>
              </div>
            ) : (
              <p className="text-gray-600">Select a package above to see pricing estimate</p>
            )}

            <div className="mt-8">
              <a
                href="/events-brochure.pdf"
                download
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <FaDownload /> Download Brochure
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

