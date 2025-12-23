'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate elements on scroll
    const elements = document.querySelectorAll('[data-gsap-animate]');
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax effect for sections
    const parallaxSections = document.querySelectorAll('[data-gsap-parallax]');
    
    parallaxSections.forEach((section) => {
      gsap.to(section, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Pin elements
    const pinElements = document.querySelectorAll('[data-gsap-pin]');
    
    pinElements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
      });
    });

    // Text reveal animations
    const textElements = document.querySelectorAll('[data-gsap-text-reveal]');
    
    textElements.forEach((element) => {
      const text = element.textContent || '';
      element.innerHTML = '';
      
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        element.appendChild(span);
        
        gsap.to(span, {
          opacity: 1,
          duration: 0.05,
          delay: index * 0.02,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}

