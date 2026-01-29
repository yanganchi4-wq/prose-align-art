import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "@/components/valve/FormCard";
import CategoryCard from "@/components/valve/CategoryCard";
import FormInput from "@/components/valve/FormInput";
import FormSelect from "@/components/valve/FormSelect";
import FormTextarea from "@/components/valve/FormTextarea";
import HighlightBox from "@/components/valve/HighlightBox";
import RecommendationCard from "@/components/valve/RecommendationCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

const categories = [
  { id: "3.1", name: "3.1 常规安全阀", desc: "标准应用" },
  { id: "3.2", name: "3.2 管路安全阀", desc: "管道系统" },
  { id: "3.3", name: "3.3 真空阀", desc: "真空环境" },
  { id: "3.4", name: "3.4 内置式安全阀", desc: "内置安装" },
];

const recommendations = [
  {
    id: "SV-001",
    name: "型号1",
    specs: [
      { label: "适用压力", value: "5-40 bar" },
      { label: "温度范围", value: "-20°C ~ 180°C" },
      { label: "材质", value: "不锈钢" },
    ],
  },
  {
    id: "SV-002",
    name: "型号2",
    specs: [
      { label: "适用压力", value: "10-80 bar" },
      { label: "温度范围", value: "-40°C ~ 220°C" },
      { label: "材质", value: "双相不锈钢" },
    ],
  },
  {
    id: "SV-003",
    name: "型号3",
    specs: [
      { label: "适用压力", value: "3-25 bar" },
      { label: "温度范围", value: "-10°C ~ 150°C" },
      { label: "材质", value: "不锈钢" },
    ],
  },
];

const brandOptions = [
  { value: "品牌1", label: "品牌1" },
  { value: "品牌2", label: "品牌2" },
  { value: "品牌3", label: "品牌3" },
];

// 解析温度范围字符串，如 "-40℃ ~ +130℃"
const parseTemperatureRange = (tempStr: string) => {
  const match = tempStr.match(/(-?\d+).*?~.*?([+-]?\d+)/);
  if (match) {
    return { min: match[1], max: match[2].replace('+', '') };
  }
  return { min: "", max: "" };
};

// 解析压力字符串，如 "0.45 MPa"
const parsePressure = (pressureStr: string) => {
  const match = pressureStr.match(/([\d.]+)/);
  if (match) {
    // 如果是 MPa，转换为 bar (1 MPa = 10 bar)
    const value = parseFloat(match[1]);
    if (pressureStr.includes("MPa")) {
      return (value * 10).toString();
    }
    return value.toString();
  }
  return "";
};

const SafetyValvePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [designPressure, setDesignPressure] = useState("");
  const [setPressure, setSetPressure] = useState("");
  const [hasSpecData, setHasSpecData] = useState(false);

  // 检查是否有设计规范数据
  useEffect(() => {
    const specData = localStorage.getItem("designSpec");
    setHasSpecData(!!specData);
  }, []);

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
      
      // 解析温度范围
      if (spec.designTemperature) {
        const temps = parseTemperatureRange(spec.designTemperature);
        setMinTemp(temps.min);
        setMaxTemp(temps.max);
      }
      
      // 解析设计压力
      if (spec.designPressure) {
        const pressure = parsePressure(spec.designPressure);
        setDesignPressure(pressure);
        // 设定压力默认为设计压力的 80%
        if (pressure) {
          setSetPressure((parseFloat(pressure) * 0.8).toFixed(1));
        }
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
          安全阀选配
        </h2>
        <p className="text-[13px] font-semibold text-foreground/55">
          步骤 1 / 4 - 选择适合您系统的安全阀
        </p>
      </div>

      <FormCard title="分类参数">
        <label className="block mb-2 text-[13px] font-semibold text-foreground/80">
          二级分类
        </label>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              description={cat.desc}
              selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </FormCard>

      <FormCard title="核心参数">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            可手动输入或从设计规范自动导入
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportFromSpec}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            从设计规范导入
            {hasSpecData && (
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormInput
            label="设计温度最高值 (°C)"
            type="number"
            placeholder="例如: 180"
            value={maxTemp}
            onChange={(e) => setMaxTemp(e.target.value)}
          />
          <FormInput
            label="设计温度最低值 (°C)"
            type="number"
            placeholder="例如: -20"
            value={minTemp}
            onChange={(e) => setMinTemp(e.target.value)}
          />
          <FormInput
            label="设计压力 (bar)"
            type="number"
            placeholder="例如: 10"
            value={designPressure}
            onChange={(e) => setDesignPressure(e.target.value)}
          />
        </div>

        <HighlightBox>
          <FormInput
            label="设定压力 (bar)"
            type="number"
            placeholder="例如: 8"
            className="!mb-0 border-warning"
            value={setPressure}
            onChange={(e) => setSetPressure(e.target.value)}
          />
        </HighlightBox>
      </FormCard>

      <FormCard title="偏好与特殊要求">
        <FormSelect label="品牌偏好" options={brandOptions} />
        <FormTextarea
          label="其他特殊要求"
          placeholder="请输入特殊要求..."
        />
      </FormCard>

      <FormCard title="推荐型号">
        <p className="text-muted-foreground text-sm mb-4">
          基于您输入的参数筛选出的推荐型号：
        </p>
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
        <Button
          className="bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
          onClick={() => navigate("/option/valve/control")}
        >
          下一步 →
        </Button>
      </div>
    </div>
  );
};

export default SafetyValvePage;
