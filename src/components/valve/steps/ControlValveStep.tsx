import React, { useState } from "react";
import FormCard from "../FormCard";
import CategoryCard from "../CategoryCard";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import FormTextarea from "../FormTextarea";
import RecommendationCard from "../RecommendationCard";
import { Button } from "@/components/ui/button";

interface ControlValveStepProps {
  onNext: () => void;
  onPrev: () => void;
  onModelSelect: (models: string[]) => void;
}

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

const ControlValveStep: React.FC<ControlValveStepProps> = ({
  onNext,
  onPrev,
  onModelSelect,
}) => {
  const [primaryCategory, setPrimaryCategory] = useState<string | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const toggleModel = (modelName: string) => {
    setSelectedModels((prev) => {
      const newSelection = prev.includes(modelName)
        ? prev.filter((m) => m !== modelName)
        : [...prev, modelName];
      onModelSelect(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-wide text-foreground/90 mb-2">
          控制阀选配
        </h2>
        <p className="text-[13px] font-semibold text-foreground/55">
          步骤 2 / 4 - 选择适合您系统的控制阀（可多选）
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

      <FormCard title="核心参数">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormInput
            label="设计温度最高值 (°C)"
            type="number"
          />
          <FormInput
            label="设计温度最低值 (°C)"
            type="number"
          />
          <FormInput
            label="设计压力 (bar)"
            type="number"
          />
          <FormSelect
            label="手柄型式"
            options={handleOptions}
          />
        </div>
      </FormCard>

      <FormCard title="偏好与特殊要求">
        <FormSelect label="品牌偏好" options={brandOptions} />
        <FormTextarea label="其他特殊要求" />
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
        <Button variant="outline" onClick={onPrev}>
          ← 上一步
        </Button>
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

export default ControlValveStep;
