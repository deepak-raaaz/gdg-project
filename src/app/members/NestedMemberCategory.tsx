import React from "react";
import { MemberCategory } from "./MemberCategory";
import { categoryColors, Member } from "@/data/members";

// Interface for a subcategory structure
interface SubCategory {
  category: string;
  members: Member[];
}

// Props interface with proper typing
interface NestedMemberCategoryProps {
  categoryName: string;
  categoryData: Member[] | SubCategory[];
}

export const NestedMemberCategory: React.FC<NestedMemberCategoryProps> = ({
  categoryName,
  categoryData
}) => {
  // Type guard to check if the data is nested
  const isNested = (data: Member[] | SubCategory[]): data is SubCategory[] => {
    return data.length > 0 && 'category' in data[0];
  };

  if (isNested(categoryData)) {
    return (
      <div className="space-y-8">
        {categoryData.map((subCategory) => (
          <MemberCategory
            key={subCategory.category}
            category={subCategory.category}
            members={subCategory.members}
            borderColor={categoryColors[subCategory.category as keyof typeof categoryColors] || "#000000"}
          />
        ))}
      </div>
    );
  }

  return (
    <MemberCategory
      category={categoryName}
      members={categoryData}
      borderColor={categoryColors[categoryName as keyof typeof categoryColors] || "#000000"}
    />
  );
};