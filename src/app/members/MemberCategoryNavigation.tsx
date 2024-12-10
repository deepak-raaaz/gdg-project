import React from "react";
import { Code, PenTool, Building2, Users, Laptop } from "lucide-react";

interface MemberCategoryNavigationProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const MemberCategoryNavigation: React.FC<MemberCategoryNavigationProps> = ({ 
  activeCategory, 
  setActiveCategory, 
  containerRef 
}) => {
  const getCategoryIcon = React.useCallback((category: string) => {
    switch (category) {
      case "Tech Members":
        return <Code className="w-5 h-5" />;
      case "Media Team":
        return <PenTool className="w-5 h-5" />;
      case "PR Team":
        return <Building2 className="w-5 h-5" />;
      case "Core Team":
        return <Users className="w-5 h-5" />;
      default:
        return <Laptop className="w-5 h-5" />;
    }
  }, []);

  const categories = [
    "Tech Members", 
    "Media Team", 
    "PR Team", 
    "Core Team"
  ];

  return (
    <div 
      ref={containerRef} 
      className="flex flex-wrap justify-center gap-4 mb-12 px-4"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`
            px-6 py-3 rounded-xl text-md font-semibold 
            transition-all duration-300 flex items-center gap-2
            ${activeCategory === category 
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
          `}
        >
          {getCategoryIcon(category)}
          {category}
        </button>
      ))}
    </div>
  );
};