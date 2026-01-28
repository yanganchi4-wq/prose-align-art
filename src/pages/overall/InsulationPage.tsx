import React from "react";
import FormInput from "@/components/valve/FormInput";
import FormSelect from "@/components/valve/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const InsulationPage: React.FC = () => {
  const handleSave = () => {
    toast.success("保温外包信息已保存（原型）");
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
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">总体设计 · 保温＆外包</h2>
            <span className="text-xs font-extrabold text-foreground/55">配置参数</span>
          </div>

          {/* 保温材料 */}
          <div className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4 mb-4">
            <div className="flex items-center gap-3 font-extrabold text-sidebar mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-accent/95 to-accent/25 shadow-[0_6px_14px_rgba(26,163,255,0.25)]" />
              <span>保温材料</span>
            </div>
            <p className="text-xs text-foreground/65 mb-3 -mt-1">填写保温层材质、厚度、导热系数等信息</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="保温材质" placeholder="例如：聚氨酯 / 岩棉 / 真空绝热板…" />
              <FormInput label="保温厚度" placeholder="例如：50 mm" />
              <FormInput label="导热系数" placeholder="例如：0.024 W/(m·K)" />
              <FormInput label="密度" placeholder="例如：40 kg/m³" />
            </div>
          </div>

          {/* 外包材料 */}
          <div className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4 mb-4">
            <div className="flex items-center gap-3 font-extrabold text-sidebar mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-accent/95 to-accent/25 shadow-[0_6px_14px_rgba(26,163,255,0.25)]" />
              <span>外包材料</span>
            </div>
            <p className="text-xs text-foreground/65 mb-3 -mt-1">填写外护板材质、颜色等信息</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="外包材质" placeholder="例如：镀锌钢板 / 铝板 / 不锈钢…" />
              <FormInput label="外包厚度" placeholder="例如：0.5 mm" />
              <div className="space-y-2">
                <label className="text-xs font-black text-foreground/76">外包颜色</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    defaultValue="#ffffff"
                    className="w-[46px] h-9 p-0 border-none bg-transparent cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-[10px] [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-foreground/22 [&::-webkit-color-swatch]:shadow-[0_8px_16px_rgba(7,30,55,0.10)]"
                  />
                  <FormInput label="" placeholder="颜色代码 / RAL编号" />
                </div>
              </div>
            </div>
          </div>

          {/* 附加信息 */}
          <div className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4">
            <div className="flex items-center gap-3 font-extrabold text-sidebar mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-accent/95 to-accent/25 shadow-[0_6px_14px_rgba(26,163,255,0.25)]" />
              <span>附加信息</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="保温方式"
                options={[
                  { value: "full", label: "整体保温" },
                  { value: "partial", label: "局部保温" },
                  { value: "none", label: "无保温" },
                ]}
                placeholder="选择保温方式"
              />
              <FormInput label="备注说明" placeholder="其他特殊要求…" />
            </div>
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

export default InsulationPage;
