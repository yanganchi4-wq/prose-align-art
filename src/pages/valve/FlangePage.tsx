import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "@/components/valve/FormCard";
import FormInput from "@/components/valve/FormInput";
import FormSelect from "@/components/valve/FormSelect";
import FormTextarea from "@/components/valve/FormTextarea";
import RecommendationCard from "@/components/valve/RecommendationCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

const recommendations = [
  {
    id: "FL-001",
    name: "凸缘型号1",
    specs: [
      { label: "适用压力", value: "5-50 bar" },
      { label: "温度范围", value: "-20°C ~ 200°C" },
      { label: "厚度", value: "10mm" },
    ],
  },
  {
    id: "FL-002",
    name: "凸缘型号2",
    specs: [
      { label: "适用压力", value: "10-80 bar" },
      { label: "温度范围", value: "-40°C ~ 250°C" },
      { label: "厚度", value: "15mm" },
    ],
  },
];

const installOptions = [
  { value: "顶部安装", label: "顶部安装" },
  { value: "侧面安装", label: "侧面安装" },
  { value: "底部安装", label: "底部安装" },
];

// 解析温度范围字符串
const parseTemperatureRange = (tempStr: string) => {
  const match = tempStr.match(/(-?\d+).*?~.*?([+-]?\d+)/);
  if (match) {
    return { min: match[1], max: match[2].replace('+', '') };
  }
  return { min: "", max: "" };
};

// 解析压力字符串
const parsePressure = (pressureStr: string) => {
  const match = pressureStr.match(/([\d.]+)/);
  if (match) {
    const value = parseFloat(match[1]);
    if (pressureStr.includes("MPa")) {
      return (value * 10).toString();
    }
    return value.toString();
  }
  return "";
};

const FlangePage: React.FC = () => {
  const navigate = useNavigate();
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [designPressure, setDesignPressure] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const toggleModel = (modelName: string) => {
    setSelectedModels((prev) => {
      const newSelection = prev.includes(modelName)
        ? prev.filter((m) => m !== modelName)
        : [...prev, modelName];
      return newSelection;
    });
  };

  const handleImportFromSpec = () => {
    const specData = localStorage.getItem("designSpec");
    if (!specData) {
      toast.error("未找到设计规范数据，请先在总体设计中保存设计规范");
      return;
    }
    try {
      const spec = JSON.parse(specData);
      if (spec.designTemperature) {
        const temps = parseTemperatureRange(spec.designTemperature);
        setMinTemp(temps.min);
        setMaxTemp(temps.max);
      }
      if (spec.designPressure) {
        setDesignPressure(parsePressure(spec.designPressure));
      }
      toast.success("已从设计规范导入参数");
    } catch (e) {
      toast.error("解析设计规范数据失败");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-wide text-foreground/90 mb-2">
          凸缘选配
        </h2>
        <p className="text-[13px] font-semibold text-foreground/55">
          步骤 3 / 4 - 基于已选安全阀和控制阀配置凸缘（可多选）
        </p>
      </div>

      <FormCard title="已选型号信息">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-foreground/80">
              安全阀型号
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 border-2 border-foreground/10 rounded-[10px] text-[13px] font-medium bg-muted"
              value="待选择"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-foreground/80">
              控制阀型号
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 border-2 border-foreground/10 rounded-[10px] text-[13px] font-medium bg-muted"
              value="待选择"
              readOnly
            />
          </div>
        </div>
      </FormCard>

      <FormCard 
        title={
          <div className="flex items-center gap-3">
            <span>设计参数</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportFromSpec}
              className="h-6 px-2 text-xs gap-1"
            >
              <Download className="w-3 h-3" />
              一键导入
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormInput 
            label="设计温度最高值 (°C)" 
            type="number" 
            value={maxTemp}
            onChange={(e) => setMaxTemp(e.target.value)}
          />
          <FormInput 
            label="设计温度最低值 (°C)" 
            type="number" 
            value={minTemp}
            onChange={(e) => setMinTemp(e.target.value)}
          />
          <FormInput 
            label="设计压力 (bar)" 
            type="number" 
            value={designPressure}
            onChange={(e) => setDesignPressure(e.target.value)}
          />
        </div>
      </FormCard>

      <FormCard title="安装参数">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormSelect label="安装方式" options={installOptions} />
          <FormInput label="角度要求 (°)" type="number" placeholder="0-360" />
          <FormInput label="厚度 (mm)" type="number" />
        </div>
      </FormCard>

      <FormCard title="其他特殊要求">
        <FormTextarea label="" placeholder="请输入特殊要求..." />
      </FormCard>

      <FormCard title="推荐型号">
        <p className="text-muted-foreground text-sm mb-2">
          基于您输入的参数筛选出的推荐型号（可多选）：
        </p>
        {selectedModels.length > 0 && (
          <p className="text-accent text-sm font-semibold mb-4">
            已选择 {selectedModels.length} 个型号：{selectedModels.join("、")}
          </p>
        )}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              title={rec.name}
              specs={rec.specs}
              selected={selectedModels.includes(rec.name)}
              multiSelect={true}
              onViewDetails={() => alert(`查看产品详情: ${rec.id}`)}
              onSelect={() => toggleModel(rec.name)}
            />
          ))}
        </div>
      </FormCard>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => navigate("/option/valve/control")}>
          ← 上一步
        </Button>
        <Button
          className="bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
          onClick={() => navigate("/option/valve/maintenance")}
        >
          下一步 →
        </Button>
      </div>
    </div>
  );
};

export default FlangePage;
