import React from "react";

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, subtitle }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-wide text-foreground/90 mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] font-semibold text-foreground/55">{subtitle}</p>
        )}
      </div>

      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10">
        <div className="border border-dashed border-foreground/20 rounded-[14px] p-6 bg-white/55 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 border border-accent/20 grid place-items-center">
            <svg className="w-8 h-8 text-accent-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-foreground/80 mb-2">{title}</h3>
          <p className="text-sm text-foreground/55">
            此页面正在开发中，敬请期待...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
