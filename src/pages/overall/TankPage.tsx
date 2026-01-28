import React, { useState } from "react";
import FormInput from "@/components/valve/FormInput";
import FormSelect from "@/components/valve/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TankPage: React.FC = () => {
  const [matType, setMatType] = useState("shell");

  const handleSave = () => {
    toast.success("罐体信息已保存（原型）");
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
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">总体设计 · 罐体</h2>
            <span className="text-xs font-extrabold text-foreground/55">参数录入</span>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-foreground/76">罐体材质</label>
              <div className="flex flex-col md:flex-row gap-3">
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value)}
                  className="flex-shrink-0 md:w-40 h-11 rounded-xl border border-foreground/14 bg-white/95 px-3 text-sm font-extrabold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16 appearance-none bg-[linear-gradient(45deg,transparent_50%,rgba(11,26,42,0.45)_50%),linear-gradient(135deg,rgba(11,26,42,0.45)_50%,transparent_50%)] bg-[position:calc(100%-18px)_18px,calc(100%-12px)_18px] bg-[size:6px_6px,6px_6px] bg-no-repeat"
                >
                  <option value="shell">筒体材质</option>
                  <option value="head">封头材质</option>
                </select>
                <input
                  className="flex-1 h-11 rounded-xl border border-foreground/14 bg-white/95 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16"
                  placeholder="例如：316L / 304 / Q345R …"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="罐体厚度" placeholder="例如：6 mm" />
              <FormInput label="防波板" placeholder="例如：有（形式/数量…）或 无" />
            </div>

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

export default TankPage;
