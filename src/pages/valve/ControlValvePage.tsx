import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "@/components/valve/FormCard";
import CategoryCard from "@/components/valve/CategoryCard";
import FormInput from "@/components/valve/FormInput";
import FormSelect from "@/components/valve/FormSelect";
import FormTextarea from "@/components/valve/FormTextarea";
import RecommendationCard from "@/components/valve/RecommendationCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

const primaryCategories = [
  { id: "4", name: "4. 球阀" },
  { id: "5", name: "5. 蝶阀" },
  { id: "6", name: "6. 底阀" },
];

const subCategories: Record<string, { id: string; name: string }[]> = {
  "4": [
    { id: "4.1", name: "4.1 管路球阀" },
    { id: "4.2", name: "4.2 法兰-接头球阀" },
    { id: "4.3", name: "4.3 法兰球阀" },
  ],
  "5": [
    { id: "5.1", name: "5.1 夹持阀" },
    { id: "5.2", name: "5.2 法兰蝶阀" },
    { id: "5.3", name: "5.3 法兰-接头蝶阀" },
  ],
  "6": [
    { id: "6.1", name: "6.1 底阀-接头出口" },
    { id: "6.2", name: "6.2 底阀-法兰出口" },
  ],
};

const recommendations = [
  {
    id: "CV-001",
    name: "球阀型号1",
    specs: [
      { label: "适用压力", value: "5-50 bar" },
      { label: "温度范围", value: "-20°C ~ 200°C" },
    ],
  },
  {
    id: "CV-002",
    name: "蝶阀型号1",
    specs: [
      { label: "适用压力", value: "3-40 bar" },
      { label: "温度范围", value: "-10°C ~ 180°C" },
    ],
  },
  {
    id: "CV-003",
    name: "底阀型号1",
    specs: [
      { label: "适用压力", value: "5-60 bar" },
      { label: "温度范围", value: "-20°C ~ 220°C" },
    ],
  },
];

const handleOptions = [
  { value: "手动", label: "手动" },
  { value: "气动", label: "气动" },
  { value: "电动", label: "电动" },
];

const brandOptions = [
  { value: "品牌1", label: "品牌1" },
  { value: "品牌2", label: "品牌2" },
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

const ControlValvePage: React.FC = () => {
  const navigate = useNavigate();
  const [primaryCategory, setPrimaryCategory] = useState<string | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<string | null>(null);
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [designPressure, setDesignPressure] = useState("");

  const handleModelSelect = (model: string) => {
    toast.success(`已选择: ${model}`);
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
          控制阀选配
        </h2>
        <p className="text-[13px] font-semibold text-foreground/55">
          步骤 2 / 4 - 选择适合您系统的控制阀
        </p>
      </div>

      <FormCard title="分类参数">
        <label className="block mb-2 text-[13px] font-semibold text-foreground/80">
          一级分类
        </label>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {primaryCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              selected={primaryCategory === cat.id}
              onClick={() => {
                setPrimaryCategory(cat.id);
                setSecondaryCategory(null);
              }}
            />
          ))}
        </div>

        {primaryCategory && subCategories[primaryCategory] && (
          <>
            <label className="block mt-6 mb-2 text-[13px] font-semibold text-foreground/80">
              二级分类
            </label>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {subCategories[primaryCategory].map((cat) => (
                <CategoryCard
                  key={cat.id}
                  name={cat.name}
                  selected={secondaryCategory === cat.id}
                  onClick={() => setSecondaryCategory(cat.id)}
                />
              ))}
            </div>
          </>
        )}
      </FormCard>

      <FormCard 
        title={
          <div className="flex items-center gap-3">
            <span>核心参数</span>
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
          <FormSelect label="手柄型式" options={handleOptions} />
        </div>
      </FormCard>

      <FormCard title="偏好与特殊要求">
        <FormSelect label="品牌偏好" options={brandOptions} />
        <FormTextarea label="其他特殊要求" />
      </FormCard>

      <FormCard title="推荐型号">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              title={rec.name}
              specs={rec.specs}
              onViewDetails={() => alert(`查看产品详情: ${rec.id}`)}
              onSelect={() => handleModelSelect(rec.name)}
            />
          ))}
        </div>
      </FormCard>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => navigate("/option/valve/safety")}>
          ← 上一步
        </Button>
        <Button
          className="bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
          onClick={() => navigate("/option/valve/flange")}
        >
          下一步 →
        </Button>
      </div>
    </div>
  );
};

export default ControlValvePage;
