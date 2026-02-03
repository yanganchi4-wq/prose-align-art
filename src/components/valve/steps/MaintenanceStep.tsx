import React, { useState } from "react";
import FormCard from "../FormCard";
import CategoryCard from "../CategoryCard";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import FormTextarea from "../FormTextarea";
import RecommendationCard from "../RecommendationCard";
import { Button } from "@/components/ui/button";

interface MaintenanceStepProps {
  onPrev: () => void;
  onFinish: () => void;
  onModelSelect: (models: string[]) => void;
}

const categories = [
  { id: "2.1", name: "2.1 快开人孔组件" },
  { id: "2.2", name: "2.2 法兰人孔组件" },
  { id: "2.3", name: "2.3 快开清洁口组件" },
  { id: "2.4", name: "2.4 法兰清洁口组件" },
];

const recommendations = [
  {
    id: "MT-001",
    name: "快开人孔组件A",
    specs: [
      { label: "适用压力", value: "3-30 bar" },
      { label: "直径", value: "400mm" },
    ],
  },
  {
    id: "MT-002",
    name: "法兰人孔组件B",
    specs: [
      { label: "适用压力", value: "5-50 bar" },
      { label: "直径", value: "500mm" },
    ],
  },
];

const directionOptions = [
  { value: "顺时针", label: "顺时针" },
  { value: "逆时针", label: "逆时针" },
];

const nutOptions = [
  { value: "标准螺母", label: "标准螺母" },
  { value: "六角螺母", label: "六角螺母" },
  { value: "蝶形螺母", label: "蝶形螺母" },
];

const lockingOptions = [
  { value: "需要", label: "需要" },
  { value: "不需要", label: "不需要" },
];

const MaintenanceStep: React.FC<MaintenanceStepProps> = ({
  onPrev,
  onFinish,
  onModelSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
          维护清洗功能配置
        </h2>
        <p className="text-[13px] font-semibold text-foreground/55">
          步骤 4 / 4 - 最后一步，配置维护和清洗功能（可多选）
        </p>
      </div>

      <FormCard title="分类选择">
        <label className="block mb-2 text-[13px] font-semibold text-foreground/80">
          一级分类
        </label>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </FormCard>

      <FormCard title="基本参数">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormInput label="设计压力 (bar)" type="number" />
          <FormInput label="内径 (mm)" type="number" />
          <FormInput label="外径 (mm)" type="number" />
        </div>
      </FormCard>

      <FormCard title="安装参数">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormInput label="安装角度 (°)" type="number" />
          <FormInput label="法兰厚度 (mm)" type="number" />
          <FormInput label="打开角度 (°)" type="number" />
          <FormSelect label="方向" options={directionOptions} />
        </div>
      </FormCard>

      <FormCard title="附加选项">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <FormSelect label="螺母类型" options={nutOptions} />
          <FormSelect label="海关插销" options={lockingOptions} />
          <FormInput label="颈圈曲率半径 (mm)" type="number" />
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
        <Button variant="outline" onClick={onPrev}>
          ← 上一步
        </Button>
        <Button
          className="bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
          onClick={onFinish}
        >
          开始咨询
        </Button>
      </div>
    </div>
  );
};

export default MaintenanceStep;
