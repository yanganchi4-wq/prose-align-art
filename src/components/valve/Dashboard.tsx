import React from "react";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="relative max-w-[1200px] mx-auto min-h-[720px] rounded-[22px] bg-white/55 border border-foreground/10 shadow-card overflow-hidden z-10">
      {children}
    </div>
  );
};

export default Dashboard;
