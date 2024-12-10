import React, { useState, useRef, useEffect } from "react";
import { Computer } from "lucide-react";
import ImageFrame from "@/components/ImageFrame";
import ExpandedCard from "@/components/ExpandedCard";
import { Member } from "@/data/members";
import { animations } from "@/utils/member-animations";

interface MemberCategoryProps {
  category: string;
  members: Member[];
  borderColor: string;
}

export const MemberCategory: React.FC<MemberCategoryProps> = ({ 
  category, 
  members, 
  borderColor 
}) => {
  const [expandedMember, setExpandedMember] = useState<Member | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animations.animateCardEntrance(containerRef);
      animations.setupCardHoverEffects(containerRef);
    }
  }, [members]);

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No members in this category.
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-center mb-8 dark:text-white text-gray-800 flex items-center justify-center gap-3">
        <Computer className="text-blue-500" />
        {category}
      </h3>
      <div 
        ref={containerRef} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6"
      >
        {members.map((member, index) => (
          <div
            key={index}
            className="animate-card member-card cursor-pointer group relative transform transition-all duration-300 hover:z-10"
            onClick={() => setExpandedMember(member)}
          >
            <div className="relative w-[250px] h-[250px] mx-auto">
              <ImageFrame
                role={member.role}
                name={member.name}
                borderColor={borderColor}
                imageSrc={member.imageSrc}
                className="justify-self-center"
              />
            </div>
          </div>
        ))}
      </div>
      
      {expandedMember && (
        <ExpandedCard 
          member={expandedMember} 
          isOpen={!!expandedMember} 
          onClose={() => setExpandedMember(null)} 
        />
      )}
    </div>
  );
};