import React from "react";
import FormCard from "../FormCard";
import CategoryCard from "../CategoryCard";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import FormTextarea from "../FormTextarea";
import HighlightBox from "../HighlightBox";
import RecommendationCard from "../RecommendationCard";
import { Button } from "@/components/ui/button";

interface SafetyValveStepProps {
  onNext: () => void;
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
  onModelSelect: (model: string) => void;
}

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

const SafetyValveStep: React.FC<SafetyValveStepProps> = ({
  onNext,
  selectedCategory,
  onCategorySelect,
  onModelSelect,
}) => {
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
              onClick={() => onCategorySelect(cat.id)}
            />
          ))}
        </div>
      </FormCard>

      <FormCard title="核心参数">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormInput
            label="设计温度最高值 (°C)"
            type="number"
            placeholder="例如: 180"
          />
          <FormInput
            label="设计温度最低值 (°C)"
            type="number"
            placeholder="例如: -20"
          />
          <FormInput
            label="设计压力 (bar)"
            type="number"
            placeholder="例如: 10"
          />
        </div>

        <HighlightBox>
          <FormInput
            label="设定压力 (bar)"
            type="number"
            placeholder="例如: 8"
            className="!mb-0 border-warning"
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
              onSelect={() => onModelSelect(rec.name)}
            />
          ))}
        </div>
      </FormCard>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          className="bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
          onClick={onNext}
        >
          下一步 →
        </Button>
      </div>
    </div>
  );
};

export default SafetyValveStep;
