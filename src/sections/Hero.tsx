"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import MaxWidthWrapper from "../hooks/MaxWidthWrapper";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const modeGifRef = useRef<HTMLDivElement>(null);
  const gdgGifRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    const animations = [
      {
        target: modeGifRef.current,
        vars: { opacity: 0, duration: 1.5 }
      },
      {
        target: gdgGifRef.current,
        vars: { y: -30, opacity: 0, duration: 1 },
        position: "-=1"
      },
      {
        target: ".text-animate",
        vars: { y: 30, opacity: 0, duration: 0.8, stagger: 0.2 },
        position: "-=0.5"
      },
      {
        target: buttonRef.current,
        vars: { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.7)" },
        position: "-=0.3"
      }
    ];

    animations.forEach(({ target, vars, position }) => {
      tl.from(target, vars, position);
    });

    gsap.to(gdgGifRef.current, {
      y: "10",
      duration: 2,
      repeat: 0,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-white dark:bg-darkgray">
      <MaxWidthWrapper className="relative z-20 min-h-[100dvh] flex items-center">
        <div className="w-full flex flex-col justify-center items-center lg:items-start py-8 md:py-10 px-4 sm:px-6 lg:px-8">
          {/* GDG Logo - Mobile positioned above the text, desktop on top right */}
          <div
            ref={gdgGifRef}
            className="w-20 h-20 
             mb-2 lg:mb-0 
             lg:absolute lg:top-8 lg:right-8"
          >
            <Image
              src="/img/gdg.gif"
              alt="GDG Animation"
              width={80}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Text Content - Responsive text and spacing */}
          <div 
            ref={textRef} 
            className="max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl w-full 
                       text-center lg:text-left 
                       mt-0 lg:mt-0"
          >
            <h1 className="text-animate 
                          text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                          font-bold text-gray-900 dark:text-white 
                          mb-3 sm:mb-4 md:mb-5 lg:mb-6 
                          tracking-tight 
                          leading-tight">
              Google Developer{' '}
              <span className="block mt-1 sm:mt-2">Groups HIT</span>
            </h1>
            
            <p className="text-animate 
                         text-sm sm:text-base md:text-lg lg:text-xl 
                         text-gray-800 dark:text-gray-200 
                         mb-4 sm:mb-6 md:mb-7 lg:mb-8 
                         leading-relaxed 
                         mx-auto lg:mx-0 
                         max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none">
              Google Developer Student Groups are university-based community
              groups for students interested in Google developer technologies.
              By joining a GDG On Campus, students grow their knowledge in a
              peer-to-peer learning environment and build solutions for local
              businesses and their community.
            </p>

            {/* Button - Responsive sizing and spacing */}
            <div ref={buttonRef} className="w-full lg:w-auto">
              <Button className="w-full sm:w-auto 
                                bg-blue-500 hover:bg-blue-600 
                                text-white 
                                px-4 sm:px-6 md:px-7 lg:px-8 
                                py-3 sm:py-4 md:py-5 lg:py-6 
                                text-sm sm:text-base md:text-lg 
                                rounded-md 
                                transition-all duration-300 
                                transform hover:scale-105 
                                min-w-[160px] sm:min-w-[180px] md:min-w-[200px]">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Mode GIF - Mobile positioned below the button, desktop as background */}
      <div
        ref={modeGifRef}
        className="absolute inset-0 z-0 hidden lg:block"
      >
        <Image
          src="/img/light-mode.gif"
          alt="Light Mode Animation"
          fill
          className="object-cover dark:hidden"
          priority
          sizes="100vw"
          quality={90}
        />
        <Image
          src="/img/Black-mode .gif"
          alt="Dark Mode Animation"
          fill
          className="object-cover hidden dark:block"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
      
      {/* Mobile Mode GIF */}
      <div className="block lg:hidden py-0 w-full h-48 sm:h-48 absolute bottom-0 left-0 right-0">
        <Image
          src="/img/light-mode.gif"
          alt="Light Mode Animation"
          fill
          className="object-cover dark:hidden"
          priority
          sizes="100vw"
          quality={90}
        />
        <Image
          src="/img/Black-mode .gif"
          alt="Dark Mode Animation"
          fill
          className="object-cover hidden dark:block"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
    </section>
  );
};

export default Hero;