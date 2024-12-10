import { gsap } from "gsap";
import { MutableRefObject } from "react";

export const animations = {
  // Refined card entrance animation with staggered, spring-like effect
  animateCardEntrance: (containerRef: MutableRefObject<HTMLDivElement | null>) => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.animate-card');
      gsap.fromTo(
        cards,
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.9,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.6)",
          transformOrigin: "center center"
        }
      );
    }
  },

  // Enhanced hover effect for cards
  setupCardHoverEffects: (containerRef: MutableRefObject<HTMLDivElement | null>) => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.animate-card');
      
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: "power1.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: 'none',
            duration: 0.3,
            ease: "power1.out"
          });
        });
      });
    }
  },

  // Organizer card entrance animation
  animateOrganizerCard: (cardRef: MutableRefObject<HTMLDivElement | null>) => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 50, 
          rotationX: -15,
          transformOrigin: "top center"
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.8, 
          ease: "power3.out"
        }
      );
    }
  },

  // Category navigation animation
  animateCategoryNavigation: (containerRef: MutableRefObject<HTMLDivElement | null>) => {
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button');
      
      gsap.fromTo(
        buttons,
        { 
          opacity: 0, 
          y: 20, 
          scale: 0.9 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
    }
  }
};