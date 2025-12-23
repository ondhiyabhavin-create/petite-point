'use client';

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold font-serif text-white mb-4">Petite Point</h3>
            <p className="text-gray-400 mb-4">
              A pure vegetarian restaurant serving authentic North Indian, Chinese, and Punjabi cuisine with love and passion.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors text-xl"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaPhone className="text-primary-400 mt-1" />
                <a href="tel:+917623966440" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +91 76239 66440
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-400 mt-1" />
                <a
                  href="https://wa.me/917623966440"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1" />
                <span className="text-gray-400">Prime Location</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Newsletter */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Opening Hours</h4>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-primary-400" />
                <span className="text-gray-400">Monday - Sunday</span>
              </div>
              <p className="text-gray-400 ml-6">11:00 AM - 11:00 PM</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">
                Subscribe to get updates on new dishes and special offers
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-600 text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Petite Point Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

