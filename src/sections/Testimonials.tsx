"use client";

import React, { useEffect, useRef } from 'react';
import { testimonials } from '@/data/testimonials';
import { TestimonialColumn } from '@/components/TestimonialColumn';

export const TestimonialsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    const updateIsMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    updateIsMobile();

    const handleResize = () => {
      updateIsMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="
        min-h-screen 
        flex 
        items-center 
        justify-center 
        p-4 
        relative 
        bg-white
        dark:bg-darkgray
        transition-colors
        duration-700
      "
    >
      <div className="relative max-w-6xl w-full">
        <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-white via-white/95 to-transparent dark:from-darkgray dark:via-darkgray/95 dark:to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-darkgray dark:via-darkgray/95 dark:to-transparent z-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] overflow-hidden">
          {[0, 1, 2].map((columnIndex) => (
            <TestimonialColumn
              key={columnIndex}
              testimonials={testimonials}
              columnIndex={columnIndex}
              isMobile={isMobileRef.current}
            />
          ))}
        </div>
      </div>

      <div 
        className="
          absolute 
          inset-0 
          pointer-events-none 
          opacity-10
          bg-dot-black/[0.2]
          dark:bg-dot-white/[0.2]
          transition-opacity
          duration-700
        "
      />
    </div>
  );
};

export default TestimonialsSection;