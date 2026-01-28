import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface CheckItemProps {
  id: string;
  title: string;
}

const CheckItem: React.FC<CheckItemProps> = ({ id, title }) => (
  <label className="flex items-center justify-between p-3 rounded-[14px] border border-foreground/12 bg-white/70 cursor-pointer hover:bg-white/90 transition-colors">
    <span className="font-extrabold text-foreground/82">{title}</span>
    <div className="flex items-center gap-3 font-extrabold text-foreground/75">
      <Checkbox id={id} />
      <span>满足要求</span>
    </div>
  </label>
);

const CheckPage: React.FC = () => {
  const handleSave = () => {
    toast.success("校核信息已保存（原型）");
  };

  const handleClear = () => {
    toast.info("已清空表单");
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10 max-w-[980px]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">布局设计 · 校核信息</h2>
            <span className="text-xs font-extrabold text-foreground/55">勾选各项校核是否满足要求（原型示意）</span>
          </div>

          {/* Card header */}
          <div className="flex items-start gap-3 mb-4">
            <span className="w-2.5 h-2.5 mt-1.5 rounded-full bg-accent/85 shadow-[0_8px_18px_rgba(26,163,255,0.25)]" />
            <div>
              <div className="font-extrabold text-foreground/88">空间与干涉校核</div>
              <div className="text-xs text-foreground/55 mt-0.5">对关键空间与互不干涉进行快速确认。</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <CheckItem id="chk_opspace" title="操作空间是否足够" />
            <CheckItem id="chk_overhang" title="外伸距离是否足够" />
            <CheckItem id="chk_inner" title="内部空间是否满足要求" />
            <CheckItem id="chk_top" title="顶部空间是否满足要求" />
            <CheckItem id="chk_bottom" title="底部空间是否满足要求" />
            <CheckItem id="chk_interference" title="是否满足互不干涉要求" />
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="button" onClick={handleSave} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
              保存（原型）
            </Button>
            <Button type="button" variant="outline" onClick={handleClear}>
              清空
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPage;
