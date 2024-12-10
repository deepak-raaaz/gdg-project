import React, { useRef, useEffect } from "react";
import ImageFrame from "@/components/ImageFrame";
import { Member } from "@/data/members";
import { animations } from "@/utils/member-animations";

export const OrganizerCard: React.FC<{ member: Member }> = ({ member }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animations.animateOrganizerCard(cardRef);
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 
                 rounded-2xl shadow-xl p-8 mb-12 mx-auto max-w-4xl border border-gray-200 
                 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-[300px] h-[300px] relative">
          <ImageFrame
            role={member.role}
            name={member.name}
            borderColor={member.borderColor}
            imageSrc={member.imageSrc}
            className="justify-self-center"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {member.name}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
            {member.role}
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {member.bio}
          </p>
          {member.social && (
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              {Object.entries(member.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 
                           dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 
                           transition-colors duration-300"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};