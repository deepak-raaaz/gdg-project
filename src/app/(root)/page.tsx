import About from "@/sections/About";
import Events from "@/sections/Events";
import Hero from "@/sections/Hero";
import Members from "@/sections/Members";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Members />
      <Events />
    </div>
  );
};

export default LandingPage;
