import React from "react";

interface AppLayoutProps {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ sidebar, topbar, children }) => {
  return (
    <div className="h-screen grid grid-cols-[240px_1fr] grid-rows-[56px_1fr]">
      {/* Sidebar */}
      <aside className="row-span-2 bg-sidebar-gradient text-sidebar-foreground p-3 shadow-[6px_0_18px_rgba(0,0,0,0.08)] relative overflow-y-auto scrollbar-thin">
        {sidebar}
      </aside>

      {/* Topbar */}
      <header className="bg-white/85 backdrop-blur-[10px] border-b border-foreground/10 flex items-center justify-between px-4">
        {topbar}
      </header>

      {/* Main Content */}
      <main className="relative overflow-auto p-[18px] bg-main-gradient">
        {/* Decorative waves */}
        <svg
          className="absolute -left-[120px] top-[74px] w-[520px] opacity-60 pointer-events-none z-0"
          viewBox="0 0 1200 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(26,163,255,0.12)"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,170.7C960,160,1056,160,1152,170.7L1200,181.3L1200,320L0,320Z"
          />
          <path
            fill="rgba(26,163,255,0.08)"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,202.7C960,192,1056,192,1152,202.7L1200,213.3L1200,320L0,320Z"
          />
        </svg>

        {/* Tech grid decoration */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,60,110,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,60,110,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at 60% 35%, rgba(0,0,0,0.75), rgba(0,0,0,0) 60%)",
          }}
        />

        {children}
      </main>
    </div>
  );
};

export default AppLayout;
