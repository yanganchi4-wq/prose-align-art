import React, { useState, useEffect } from "react";
import FormCard from "@/components/valve/FormCard";
import FormInput from "@/components/valve/FormInput";
import FormSelect from "@/components/valve/FormSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface SpecFormData {
  tankType: string;
  modelSpec: string;
  dimensions: string;
  volume: string;
  selfWeight: string;
  totalWeight: string;
  designPressure: string;
  designTemperature: string;
  medium: string;
  tempOk: boolean;
}

const SpecPage: React.FC = () => {
  const [formData, setFormData] = useState<SpecFormData>({
    tankType: "",
    modelSpec: "",
    dimensions: "",
    volume: "",
    selfWeight: "",
    totalWeight: "",
    designPressure: "",
    designTemperature: "",
    medium: "",
    tempOk: false,
  });

  // 加载已保存的数据
  useEffect(() => {
    const saved = localStorage.getItem("designSpec");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved spec data");
      }
    }
  }, []);

  const handleInputChange = (field: keyof SpecFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("designSpec", JSON.stringify(formData));
    toast.success("设计规范已保存，可在阀门选配中导入使用");
  };

  const handleClear = () => {
    setFormData({
      tankType: "",
      modelSpec: "",
      dimensions: "",
      volume: "",
      selfWeight: "",
      totalWeight: "",
      designPressure: "",
      designTemperature: "",
      medium: "",
      tempOk: false,
    });
    localStorage.removeItem("designSpec");
    toast.info("已清空表单");
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">总体设计 · 设计规范</h2>
            <span className="text-xs font-extrabold text-foreground/55">参数录入</span>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="罐箱类型"
                options={[
                  { value: "t11", label: "T11 - 普通液体" },
                  { value: "t14", label: "T14 - 腐蚀性液体" },
                  { value: "t50", label: "T50 - 液化气体" },
                  { value: "t75", label: "T75 - 低温液体" },
                  { value: "other", label: "其他" },
                ]}
                placeholder="请选择罐箱类型"
                value={formData.tankType}
                onChange={(value) => handleInputChange("tankType", value)}
              />
              <FormInput 
                label="规格型号" 
                placeholder="例如：20ft / 40ft / 特种型号…" 
                value={formData.modelSpec}
                onChange={(e) => handleInputChange("modelSpec", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                label="尺寸（L×W×H）" 
                placeholder="例如：6058×2438×2591 mm" 
                value={formData.dimensions}
                onChange={(e) => handleInputChange("dimensions", e.target.value)}
              />
              <FormInput 
                label="容积" 
                placeholder="例如：24000 L" 
                value={formData.volume}
                onChange={(e) => handleInputChange("volume", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                label="自重" 
                placeholder="例如：3200 kg" 
                value={formData.selfWeight}
                onChange={(e) => handleInputChange("selfWeight", e.target.value)}
              />
              <FormInput 
                label="总重" 
                placeholder="例如：30480 kg" 
                value={formData.totalWeight}
                onChange={(e) => handleInputChange("totalWeight", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                label="设计压力" 
                placeholder="例如：0.45 MPa" 
                value={formData.designPressure}
                onChange={(e) => handleInputChange("designPressure", e.target.value)}
              />
              <FormInput 
                label="设计温度" 
                placeholder="例如：-40℃ ~ +130℃" 
                value={formData.designTemperature}
                onChange={(e) => handleInputChange("designTemperature", e.target.value)}
              />
            </div>

            <FormInput 
              label="装载介质" 
              placeholder="例如：液氨 / 乙醇 / 食用油…" 
              value={formData.medium}
              onChange={(e) => handleInputChange("medium", e.target.value)}
            />

            <div className="rounded-[14px] bg-white/86 border border-foreground/14 p-4 flex items-center gap-3">
              <span className="text-xs font-black text-foreground/76">是否满足设计温度</span>
              <Checkbox 
                id="tempOk" 
                checked={formData.tempOk}
                onCheckedChange={(checked) => handleInputChange("tempOk", !!checked)}
              />
              <label htmlFor="tempOk" className="text-sm font-extrabold text-foreground/78 cursor-pointer">
                满足设计温度要求
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <Button type="button" onClick={handleSave} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
                保存
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

export default SpecPage;
