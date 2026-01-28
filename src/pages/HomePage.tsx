import React from "react";
import { useNavigate } from "react-router-dom";
import { Layers, LayoutGrid, Package, Settings, Wrench } from "lucide-react";

interface TileProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ icon, title, subtitle, onClick }) => (
  <div
    className="relative w-full max-w-[360px] h-[150px] rounded-[20px] bg-card/92 border border-foreground/15 shadow-card flex flex-col justify-center items-center gap-2.5 cursor-pointer select-none transition-all duration-150 hover:border-accent/40 hover:shadow-hover justify-self-center"
    onClick={onClick}
  >
    <div className="w-[54px] h-[54px] rounded-2xl bg-[radial-gradient(circle_at_30%_30%,_#ffffff,_rgba(26,163,255,0.22)_45%,_rgba(26,163,255,0.10)_70%)] border border-accent/25 grid place-items-center">
      {icon}
    </div>
    <div className="text-lg font-black text-foreground/90">{title}</div>
    <div className="text-xs text-foreground/55 font-bold">{subtitle}</div>
  </div>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-[22px] grid grid-cols-2 gap-x-9 gap-y-6" style={{ gridTemplateAreas: '"t1 t2" "t3 t4" "t5 t5" "hero hero"' }}>
      <div style={{ gridArea: "t1" }} className="flex justify-center">
        <Tile
          icon={<Layers className="w-[30px] h-[30px] text-accent-foreground" />}
          title="总体设计"
          subtitle="参数/结构/约束"
          onClick={() => navigate("/overall/spec")}
        />
      </div>
      <div style={{ gridArea: "t2" }} className="flex justify-center">
        <Tile
          icon={<LayoutGrid className="w-[30px] h-[30px] text-accent-foreground" />}
          title="布局设计"
          subtitle="部件布置/空间校核"
          onClick={() => navigate("/layout/position")}
        />
      </div>
      <div style={{ gridArea: "t3" }} className="flex justify-center">
        <Tile
          icon={<Package className="w-[30px] h-[30px] text-accent-foreground" />}
          title="零部件库"
          subtitle="标准件/自定义件"
          onClick={() => navigate("/parts-library")}
        />
      </div>
      <div style={{ gridArea: "t4" }} className="flex justify-center">
        <Tile
          icon={<Settings className="w-[30px] h-[30px] text-accent-foreground" />}
          title="选配设计"
          subtitle="配置组合/清单输出"
          onClick={() => navigate("/option/valve/safety")}
        />
      </div>
      <div style={{ gridArea: "t5" }} className="flex justify-center">
        <Tile
          icon={<Wrench className="w-[30px] h-[30px] text-accent-foreground" />}
          title="阀组件设计"
          subtitle="阀门/管路/接口"
          onClick={() => navigate("/valve-design")}
        />
      </div>

      {/* Hero area - 3D Model placeholder */}
      <div
        style={{ gridArea: "hero" }}
        className="relative w-full h-[320px] rounded-[26px] bg-gradient-to-b from-white/95 to-card/80 border border-foreground/16 shadow-card flex items-center justify-center p-[18px] overflow-hidden"
      >
        <div className="w-full h-full rounded-[18px] bg-[radial-gradient(160px_140px_at_25%_30%,_rgba(26,163,255,0.20),_transparent_60%),radial-gradient(220px_160px_at_75%_55%,_rgba(26,163,255,0.16),_transparent_65%),linear-gradient(180deg,_rgba(10,60,110,0.06),_rgba(10,60,110,0.02))] border border-dashed border-foreground/18 grid place-items-center relative overflow-hidden">
          {/* Tank container SVG */}
          <svg className="w-[min(420px,92%)] h-auto opacity-95" viewBox="0 0 720 360">
            <defs>
              <linearGradient id="m1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e9f7ff" />
                <stop offset="0.5" stopColor="#bfe8ff" />
                <stop offset="1" stopColor="#6ec7ff" />
              </linearGradient>
              <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0b4f86" stopOpacity="0.22" />
                <stop offset="1" stopColor="#0b4f86" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            {/* Frame */}
            <rect x="70" y="240" width="580" height="62" rx="14" fill="rgba(10,60,110,0.06)" stroke="rgba(10,60,110,0.22)" />
            <rect x="90" y="255" width="540" height="32" rx="12" fill="url(#m2)" stroke="rgba(10,60,110,0.20)" />
            {/* Tank body */}
            <rect x="150" y="92" width="420" height="148" rx="74" fill="url(#m1)" stroke="rgba(10,60,110,0.28)" strokeWidth="2" />
            <ellipse cx="150" cy="166" rx="38" ry="74" fill="rgba(255,255,255,0.45)" stroke="rgba(10,60,110,0.22)" strokeWidth="2" />
            <ellipse cx="570" cy="166" rx="38" ry="74" fill="rgba(255,255,255,0.32)" stroke="rgba(10,60,110,0.22)" strokeWidth="2" />
            {/* Supports */}
            <rect x="210" y="232" width="26" height="24" rx="6" fill="rgba(10,60,110,0.10)" stroke="rgba(10,60,110,0.22)" />
            <rect x="484" y="232" width="26" height="24" rx="6" fill="rgba(10,60,110,0.10)" stroke="rgba(10,60,110,0.22)" />
            {/* Pipes & valve box */}
            <rect x="570" y="144" width="58" height="44" rx="10" fill="rgba(26,163,255,0.18)" stroke="rgba(10,60,110,0.26)" />
            <path d="M602 144 v-22" stroke="rgba(10,60,110,0.30)" strokeWidth="6" strokeLinecap="round" />
            <circle cx="602" cy="118" r="10" fill="rgba(26,163,255,0.25)" stroke="rgba(10,60,110,0.30)" strokeWidth="2" />
            {/* Highlights */}
            <path d="M205 120 C310 70 420 70 520 110" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="10" strokeLinecap="round" />
            <path d="M190 205 C290 250 430 245 540 210" fill="none" stroke="#0b4f86" strokeOpacity="0.14" strokeWidth="14" strokeLinecap="round" />
          </svg>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-black text-foreground/70 tracking-wide">
            <span>三维模型/总览区</span>
            <span className="text-xs px-2.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground font-black">
              点击菜单进入模块
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="col-span-2 h-[54px] flex items-center justify-center text-xs text-foreground/55 bg-gradient-to-b from-transparent to-foreground/4 border-t border-foreground/10 rounded-[14px] mt-4">
        © 罐箱总体设计平台 · AI辅助设计系统
      </div>
    </div>
  );
};

export default HomePage;
