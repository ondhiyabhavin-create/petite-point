'use client';

import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

export default function LocomotiveScrollInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let scroll: LocomotiveScroll | null = null;
    const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;
    
    if (!scrollContainer) return;

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        smoothMobile: false,
        resetNativeScroll: true,
        getDirection: true,
        getScrollFromAnywhere: false,
        touchMultiplier: 2,
        firefoxMultiplier: 50,
      });

      // Update scroll on window resize
      const handleResize = () => {
        scroll?.update();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (scroll) {
          scroll.destroy();
        }
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return null;
}

