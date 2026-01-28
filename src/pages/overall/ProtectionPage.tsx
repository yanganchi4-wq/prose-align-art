import React, { useState } from "react";
import FormInput from "@/components/valve/FormInput";
import FormSelect from "@/components/valve/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = "pretreat" | "primer" | "topcoat";

const ProtectionPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("pretreat");

  const handleSave = () => {
    toast.success("防腐保护信息已保存（原型）");
  };

  const handleClear = () => {
    toast.info("已清空表单");
  };

  const handleNext = () => {
    if (currentStep === "pretreat") setCurrentStep("primer");
    else if (currentStep === "primer") setCurrentStep("topcoat");
  };

  const handleBack = () => {
    if (currentStep === "topcoat") setCurrentStep("primer");
    else if (currentStep === "primer") setCurrentStep("pretreat");
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">总体设计 · 防腐保护</h2>
            <span className="text-xs font-extrabold text-foreground/55">工艺参数</span>
          </div>

          {/* Step tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "pretreat", label: "前处理" },
              { key: "primer", label: "底漆" },
              { key: "topcoat", label: "面漆" },
            ].map((step) => (
              <button
                key={step.key}
                onClick={() => setCurrentStep(step.key as Step)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-black transition-all",
                  currentStep === step.key
                    ? "bg-accent/20 text-sidebar border border-accent/30"
                    : "bg-white/60 text-foreground/60 border border-foreground/12 hover:bg-white/80"
                )}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* 前处理 */}
          {currentStep === "pretreat" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4">
                <div className="flex items-center gap-3 font-extrabold text-sidebar mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-accent/95 to-accent/25 shadow-[0_6px_14px_rgba(26,163,255,0.25)]" />
                  <span>前处理工艺</span>
                </div>
                <p className="text-xs text-foreground/65 mb-3 -mt-1">填写表面处理方式、等级等信息</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="处理方式"
                    options={[
                      { value: "blast", label: "喷砂/抛丸" },
                      { value: "pickle", label: "酸洗" },
                      { value: "phosphate", label: "磷化" },
                      { value: "other", label: "其他" },
                    ]}
                    placeholder="选择处理方式"
                  />
                  <FormInput label="处理等级" placeholder="例如：Sa2.5 / Sa3" />
                  <FormInput label="表面粗糙度" placeholder="例如：40-75 μm" />
                  <FormInput label="清洁度要求" placeholder="例如：ISO 8501-1" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" onClick={handleNext} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
                  下一步：底漆
                </Button>
              </div>
            </div>
          )}

          {/* 底漆 */}
          {currentStep === "primer" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4">
                <div className="flex items-center gap-3 font-extrabold text-sidebar mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-accent/95 to-accent/25 shadow-[0_6px_14px_rgba(26,163,255,0.25)]" />
                  <span>底漆配置</span>
                </div>
                <p className="text-xs text-foreground/65 mb-3 -mt-1">填写底漆类型、厚度等信息</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="底漆类型"
                    options={[
                      { value: "epoxy", label: "环氧底漆" },
                      { value: "zinc", label: "富锌底漆" },
                      { value: "alkyd", label: "醇酸底漆" },
                      { value: "other", label: "其他" },
                    ]}
                    placeholder="选择底漆类型"
                  />
                  <FormInput label="干膜厚度" placeholder="例如：75 μm" />
                  <FormInput label="涂装遍数" placeholder="例如：2 遍" />
                  <FormInput label="品牌型号" placeholder="例如：佐敦 xxx" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={handleBack}>
                  返回
                </Button>
                <Button type="button" onClick={handleNext} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
                  下一步：面漆
                </Button>
              </div>
            </div>
          )}

          {/* 面漆 */}
          {currentStep === "topcoat" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4">
                <div className="flex items-center gap-3 font-extrabold text-sidebar mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-accent/95 to-accent/25 shadow-[0_6px_14px_rgba(26,163,255,0.25)]" />
                  <span>面漆配置</span>
                </div>
                <p className="text-xs text-foreground/65 mb-3 -mt-1">填写面漆类型、颜色等信息</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="面漆类型"
                    options={[
                      { value: "polyurethane", label: "聚氨酯面漆" },
                      { value: "epoxy", label: "环氧面漆" },
                      { value: "acrylic", label: "丙烯酸面漆" },
                      { value: "other", label: "其他" },
                    ]}
                    placeholder="选择面漆类型"
                  />
                  <FormInput label="干膜厚度" placeholder="例如：50 μm" />
                  <div className="space-y-2">
                    <label className="text-xs font-black text-foreground/76">面漆颜色</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        defaultValue="#ffffff"
                        className="w-[46px] h-9 p-0 border-none bg-transparent cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-[10px] [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-foreground/22 [&::-webkit-color-swatch]:shadow-[0_8px_16px_rgba(7,30,55,0.10)]"
                      />
                      <input
                        className="flex-1 h-11 rounded-xl border border-foreground/14 bg-white/95 px-3 text-sm font-bold outline-none focus:border-accent/55 focus:ring-2 focus:ring-accent/16"
                        placeholder="RAL编号 / 颜色名称"
                      />
                    </div>
                  </div>
                  <FormInput label="涂装遍数" placeholder="例如：2 遍" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={handleBack}>
                  返回
                </Button>
                <Button type="button" onClick={handleSave} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
                  保存（原型）
                </Button>
                <Button type="button" variant="outline" onClick={handleClear}>
                  清空
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectionPage;
