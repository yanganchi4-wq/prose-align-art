import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PartPositionCardProps {
  title: string;
  namePrefix: string;
  refPlaceholder?: string;
  descPlaceholder?: string;
}

const PartPositionCard: React.FC<PartPositionCardProps> = ({ 
  title, 
  namePrefix,
  refPlaceholder = "相对基准零部件（例如：罐体封头/顶部走台/阀箱）",
  descPlaceholder = "相对关系描述（可选）：如对齐/间距/方向/检修空间等…"
}) => (
  <div className="rounded-[14px] bg-white/86 border border-foreground/14 p-3 col-span-full">
    <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
      <span className="font-black text-foreground/86">{title}</span>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-accent/10 border border-accent/22 px-3 py-1.5 rounded-full">
          <span className="text-xs font-black text-foreground/75">数量</span>
          <input 
            type="number" 
            min="0" 
            step="1" 
            placeholder="1"
            className="w-[78px] h-[30px] rounded-[10px] border border-foreground/14 bg-white/96 px-3 text-sm font-black outline-none"
          />
        </div>
        <span className="text-xs font-extrabold text-foreground/55">位置信息（绝对 + 相对）</span>
      </div>
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

const PartsPage: React.FC = () => {
  const handleSave = () => {
    toast.success("部件信息已保存（原型）");
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
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">总体设计 · 部件</h2>
            <span className="text-xs font-extrabold text-foreground/55">位置信息与数量</span>
          </div>

          <form className="space-y-4">
            <PartPositionCard 
              title="人孔" 
              namePrefix="manhole"
              refPlaceholder="相对基准零部件（例如：罐体封头/顶部走台/阀箱）"
              descPlaceholder="相对关系描述（可选）：如对齐/间距/方向/检修空间等…"
            />

            <PartPositionCard 
              title="安全阀" 
              namePrefix="safetyValve"
              refPlaceholder="相对基准零部件（例如：阀箱/人孔/罐体顶部）"
              descPlaceholder="相对关系描述（可选）：如排放方向/高度/通道空间等…"
            />

            <PartPositionCard 
              title="控制阀" 
              namePrefix="controlValve"
              refPlaceholder="相对基准零部件（例如：阀箱/底出料口/管路分流区）"
              descPlaceholder="相对关系描述（可选）：如操作空间/对齐/连接方向等…"
            />

            <PartPositionCard 
              title="温度计" 
              namePrefix="thermometer"
              refPlaceholder="相对基准零部件（例如：罐体壁面/阀箱/管路）"
              descPlaceholder="相对关系描述（可选）：如插入深度/读数朝向/保护套等…"
            />

            <PartPositionCard 
              title="压力表" 
              namePrefix="pressureGauge"
              refPlaceholder="相对基准零部件（例如：罐顶/阀箱/检修步道）"
              descPlaceholder="相对关系描述（可选）：如可读朝向/安装高度/避让阀门等…"
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

export default PartsPage;
