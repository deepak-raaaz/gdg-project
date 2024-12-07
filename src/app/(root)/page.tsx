import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Members from "@/sections/Members";
import TestimonialsSection from "@/sections/Testimonials";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Members />
      <TestimonialsSection />
      {/* <Events /> */}
    </div>
  );
};

export default LandingPage;
