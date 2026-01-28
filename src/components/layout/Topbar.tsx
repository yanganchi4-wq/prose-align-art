import React from "react";

interface TopbarProps {
  breadcrumb: string;
  stepIndicator: string;
}

const Topbar: React.FC<TopbarProps> = ({ breadcrumb, stepIndicator }) => {
  return (
    <div className="flex items-center gap-2.5 text-foreground/90 font-bold">
      <span>{breadcrumb}</span>
      <span className="text-xs px-2.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground font-extrabold">
        {stepIndicator}
      </span>
    </div>
  );
};

export default Topbar;
