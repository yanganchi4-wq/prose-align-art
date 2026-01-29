import React from "react";
import { cn } from "@/lib/utils";

interface FormCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        "relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 mb-5 z-10",
        className
      )}
    >
      <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FormCard;
