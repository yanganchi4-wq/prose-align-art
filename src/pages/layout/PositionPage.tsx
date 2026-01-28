import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PositionCardProps {
  title: string;
  namePrefix: string;
  refPlaceholder?: string;
  descPlaceholder?: string;
}

const PositionCard: React.FC<PositionCardProps> = ({ 
  title, 
  namePrefix,
  refPlaceholder = "相对基准零部件（例如：框架顶侧梁/角件/罐体中心线/阀箱）",
  descPlaceholder = "相对关系描述（可选）：如对齐/间距/方向/检修空间等…"
}) => (
  <div className="rounded-[14px] bg-white/86 border border-foreground/14 p-3 col-span-full">
    <div className="flex items-center justify-between gap-3 mb-3">
      <span className="font-black text-foreground/86">{title}</span>
      <span className="text-xs font-extrabold text-foreground/55">位置信息（绝对 + 相对）</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl bg-white/92 border border-foreground/14 p-3">
        <div className="text-xs font-black text-foreground/74 mb-2">绝对位置（X, Y, Z）</div>
        <div className="grid grid-cols-3 gap-2">
          <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16" placeholder="X" />
          <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16" placeholder="Y" />
          <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16" placeholder="Z" />
        </div>
        <div className="text-xs font-extrabold text-foreground/55 mt-2 mb-1">单位/坐标系</div>
        <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16" placeholder="例如：mm，基于框架原点/罐体中心线" />
      </div>
      <div className="rounded-xl bg-white/92 border border-foreground/14 p-3">
        <div className="text-xs font-black text-foreground/74 mb-2">相对信息（相对零部件 + 位移/描述）</div>
        <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16 mb-2" placeholder={refPlaceholder} />
        <div className="text-xs font-extrabold text-foreground/55 mb-1">相对位移（Δx, Δy, Δz）</div>
        <div className="grid grid-cols-3 gap-2">
          <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16" placeholder="Δx" />
          <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16" placeholder="Δy" />
          <input className="w-full h-10 rounded-xl border border-foreground/14 bg-white/96 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16" placeholder="Δz" />
        </div>
        <div className="h-2" />
        <textarea className="w-full min-h-[70px] resize-y rounded-xl border border-foreground/14 bg-white/96 px-3 py-2 text-sm font-medium outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16 leading-relaxed" placeholder={descPlaceholder} />
      </div>
    </div>
  </div>
);

const PositionPage: React.FC = () => {
  const handleSave = () => {
    toast.success("位置信息已保存（原型）");
  };

  const handleClear = () => {
    toast.info("已清空表单");
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">布局设计 · 位置信息</h2>
            <span className="text-xs font-extrabold text-foreground/55">参数录入</span>
          </div>

          <form className="space-y-4">
            <PositionCard 
              title="梯子位置" 
              namePrefix="ladder"
              refPlaceholder="相对基准零部件（例如：框架顶侧梁/角件/罐体中心线/阀箱）"
              descPlaceholder="相对关系描述（可选）：如对齐/间距/方向/检修空间等…"
            />

            <PositionCard 
              title="步道位置" 
              namePrefix="walkway"
              refPlaceholder="相对基准零部件（例如：框架顶侧梁/角件/罐体中心线/阀箱）"
              descPlaceholder="相对关系描述（可选）：如对齐/间距/方向/检修空间等…"
            />

            <PositionCard 
              title="接地板位置" 
              namePrefix="groundplate"
              refPlaceholder="相对基准零部件（例如：框架顶侧梁/角件/罐体中心线/阀箱）"
              descPlaceholder="相对关系描述（可选）：如对齐/间距/方向/检修空间等…"
            />

            <PositionCard 
              title="出料口位置" 
              namePrefix="outlet"
              refPlaceholder="相对基准零部件（例如：框架顶侧梁/角件/罐体中心线/阀箱）"
              descPlaceholder="相对关系描述（可选）：如对齐/间距/方向/检修空间等…"
            />

            <div className="flex gap-3 mt-6">
              <Button type="button" onClick={handleSave} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
                保存（原型）
              </Button>
              <Button type="button" variant="outline" onClick={handleClear}>
                清空
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PositionPage;
