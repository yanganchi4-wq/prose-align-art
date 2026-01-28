import React from "react";
import { Search, HelpCircle } from "lucide-react";

interface MainTopbarProps {
  breadcrumb: string;
}

const MainTopbar: React.FC<MainTopbarProps> = ({ breadcrumb }) => {
  return (
    <>
      <div className="flex items-center gap-2.5 text-foreground/90 font-bold">
        <span className="opacity-60 font-extrabold">当前位置</span>
        <span className="text-xs px-2.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground font-extrabold">
          {breadcrumb}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          className="w-[34px] h-[34px] grid place-items-center rounded-[10px] border border-foreground/14 bg-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card"
          title="搜索"
        >
          <Search className="w-[18px] h-[18px] text-foreground/70" />
        </button>
        <button
          className="w-[34px] h-[34px] grid place-items-center rounded-[10px] border border-foreground/14 bg-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card"
          title="帮助"
        >
          <HelpCircle className="w-[18px] h-[18px] text-foreground/70" />
        </button>
        <div className="flex items-center gap-2.5 pl-2 border-l border-foreground/12 ml-1.5">
          <div className="w-[30px] h-[30px] rounded-full bg-[radial-gradient(circle_at_30%_30%,_#fff,_#cfeaff_40%,_#6ec7ff_70%,_#1a86d6)] border border-foreground/18" />
          <div className="font-extrabold text-[13px] text-foreground/90">admin</div>
        </div>
      </div>
    </>
  );
};

export default MainTopbar;
