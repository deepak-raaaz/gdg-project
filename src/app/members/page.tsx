"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import MaxWidthWrapper from "@/hooks/MaxWidthWrapper";
import { MemberCategoryNavigation } from "@/app/members/MemberCategoryNavigation";
import { OrganizerCard } from "@/app/members/OrganizerCard";
import { NestedMemberCategory } from "@/app/members/NestedMemberCategory";
import { memberCategories } from "@/data/members";
import { animations } from "@/utils/member-animations";

// Get the organizer from Core Team
const organizer = memberCategories["Core Team"].find(member => member.isOrganizer);

// Reorganize categories without the organizer
const reorganizedCategories = {
  "Tech Members": [
    {
      category: "Web Developers",
      members: memberCategories["Tech Members"][0].members
    },
    {
      category: "App Developers",
      members: memberCategories["Tech Members"][1].members
    },
    {
      category: "ML/Ops",
      members: memberCategories["Tech Members"][2].members
    }
  ],
  "Media Team": [
    {
      category: "Graphics Designers",
      members: memberCategories["Media Team"][0].members
    },
    {
      category: "Video Editors",
      members: memberCategories["Media Team"][1].members
    },
    {
      category: "Content Writers",
      members: memberCategories["Media Team"][2].members
    },
    {
      category: "Photographers",
      members: memberCategories["Media Team"][3].members
    }
  ],
  "PR Team": memberCategories["PR Team"],
  "Core Team": memberCategories["Core Team"].filter(member => !member.isOrganizer)
};

const MembersPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(reorganizedCategories)[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animations.animateCategoryNavigation(containerRef);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-darkgray transition-colors duration-300">
      <Navbar />
      <MaxWidthWrapper>
        <div className="py-16">
          <h1 className="text-4xl sm:text-5xl text-center mb-8 font-bold dark:text-white text-gray-800">
            Our Amazing Team
          </h1>

          <div className="text-center max-w-4xl mx-auto mb-12 px-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Every member of the society has always been passionate and hard-working towards their goal, 
              creating a positive work environment. Their support and will to help each other out in every 
              way possible is what makes GDG On Campus- Haldia Institute of Technology
            </p>
          </div>

          {/* Organizer Card */}
          {organizer && <OrganizerCard member={organizer} />}

          {/* Category Navigation */}
          <MemberCategoryNavigation 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            containerRef={containerRef}
          />

          {/* Category Content */}
          <NestedMemberCategory 
            categoryName={activeCategory} 
            categoryData={reorganizedCategories[activeCategory as keyof typeof reorganizedCategories]} 
          />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default MembersPage;