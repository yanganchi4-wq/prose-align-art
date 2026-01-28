import React from "react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  description,
  selected,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "bg-white border-2 border-foreground/10 rounded-xl p-5 cursor-pointer transition-all duration-200 text-center",
        "hover:border-accent hover:shadow-hover hover:-translate-y-0.5",
        selected && "border-accent bg-gradient-to-br from-accent/8 to-accent/15 shadow-hover"
      )}
      onClick={onClick}
    >
      <div className="text-sm font-semibold text-foreground">{name}</div>
      {description && (
        <div className="text-xs text-foreground/50 mt-1">{description}</div>
      )}
    </div>
  );
};

export default CategoryCard;
