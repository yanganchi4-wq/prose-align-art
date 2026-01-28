import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Package, Plus, Search } from "lucide-react";

const PartsLibraryPage: React.FC = () => {
  const handleAddPart = () => {
    toast.info("添加零部件功能（原型占位）");
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">零部件库</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <input 
                  type="text"
                  placeholder="搜索零部件..."
                  className="h-10 pl-9 pr-4 rounded-xl border border-foreground/14 bg-white/95 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16 w-[200px]"
                />
              </div>
              <Button onClick={handleAddPart} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
                <Plus className="w-4 h-4 mr-1" />
                添加零部件
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { title: "标准件", count: 128, desc: "ISO/GB标准零部件" },
              { title: "阀门类", count: 45, desc: "安全阀/控制阀/截止阀等" },
              { title: "法兰类", count: 32, desc: "各类法兰接口" },
              { title: "管路类", count: 56, desc: "管道/接头/弯头等" },
              { title: "框架类", count: 24, desc: "角件/梁/支座等" },
              { title: "自定义件", count: 18, desc: "用户自定义零部件" },
            ].map((category) => (
              <div 
                key={category.title}
                className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4 cursor-pointer hover:border-accent/40 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/14 border border-accent/25 grid place-items-center">
                    <Package className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-foreground/88">{category.title}</span>
                      <span className="text-xs font-extrabold text-accent bg-accent/10 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/55 mt-1">{category.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state / placeholder */}
          <div className="rounded-2xl border border-dashed border-foreground/22 bg-white/55 p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/14 border border-accent/25 grid place-items-center mb-4">
              <Package className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-black text-foreground/80 mb-2">零部件列表</h3>
            <p className="text-sm text-foreground/55">
              选择上方分类查看零部件详情（原型占位）<br/>
              后续可接入3D预览、参数表、BOM导出等功能
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsLibraryPage;
