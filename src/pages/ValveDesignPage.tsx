import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Wrench, GitBranch, Circle } from "lucide-react";

const ValveDesignPage: React.FC = () => {
  const handleSave = () => {
    toast.success("阀组件设计已保存（原型）");
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">阀组件设计</h2>
            <span className="text-xs font-extrabold text-foreground/55">阀门/管路/接口设计</span>
          </div>

          {/* Design modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: Wrench, title: "阀门配置", desc: "安全阀/控制阀/截止阀组合设计" },
              { icon: GitBranch, title: "管路设计", desc: "管道路径/连接方式/流向规划" },
              { icon: Circle, title: "接口定义", desc: "法兰接口/快接头/焊接口规格" },
            ].map((module) => (
              <div 
                key={module.title}
                className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-5 cursor-pointer hover:border-accent/40 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/14 border border-accent/25 grid place-items-center mb-3">
                  <module.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <div className="font-black text-foreground/88 mb-1">{module.title}</div>
                <p className="text-xs text-foreground/55">{module.desc}</p>
              </div>
            ))}
          </div>

          {/* Canvas placeholder */}
          <div className="rounded-2xl border border-dashed border-foreground/22 bg-[linear-gradient(0deg,rgba(255,255,255,0.62),rgba(255,255,255,0.62)),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:auto,32px_32px,32px_32px] min-h-[400px] flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/14 border border-accent/25 grid place-items-center mb-4">
              <Wrench className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-black text-foreground/80 mb-2">阀组件设计工作区</h3>
            <p className="text-sm text-foreground/55 text-center max-w-md">
              此处为阀组件可视化设计区域（原型占位）<br/>
              后续可接入2D/3D编辑器、拖拽布局、参数化设计等功能
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="button" onClick={handleSave} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
              保存设计（原型）
            </Button>
            <Button type="button" variant="outline">
              导出BOM
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValveDesignPage;
