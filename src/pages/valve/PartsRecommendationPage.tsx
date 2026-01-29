import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "@/components/valve/FormCard";
import CategoryCard from "@/components/valve/CategoryCard";
import FormSelect from "@/components/valve/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Check, Package, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// 组件分类数据
const componentCategories = [
  { id: "manhole", name: "人孔、清洗孔组件", desc: "人孔盖、清洗孔等相关零件" },
  { id: "safety", name: "安全阀组件", desc: "安全阀及配套零件" },
  { id: "control", name: "控制阀组件", desc: "球阀、蝶阀等控制阀零件" },
  { id: "bottom", name: "底阀组件", desc: "底阀及配套法兰零件" },
];

// 规格选项
const specOptions: Record<string, { value: string; label: string }[]> = {
  manhole: [
    { value: "500", label: "人孔-500" },
    { value: "300", label: "清洗孔-300" },
  ],
  safety: [
    { value: "2.5bsp", label: "2.5\" BSP" },
    { value: "3flange", label: "3\"法兰式" },
  ],
  control: [
    { value: "dn50", label: "DN50" },
    { value: "dn80", label: "DN80" },
    { value: "dn100", label: "DN100" },
  ],
  bottom: [
    { value: "3inch", label: "3\"底阀" },
    { value: "4inch", label: "4\"底阀" },
  ],
};

// 品牌型号映射
const brandModels = ["FV型号", "PL型号", "GD型号", "BG型号"];

// 智能推荐零件数据（模拟数据库）
interface PartItem {
  partName: string;
  models: Record<string, string>;
  quantity?: number;
}

interface ComponentParts {
  [spec: string]: PartItem[];
}

const partsDatabase: Record<string, ComponentParts> = {
  manhole: {
    "500": [
      { partName: "标准快开人孔", models: { "FV型号": "E4D/8528025BT", "PL型号": "CMS554D8ST 1118539200", "GD型号": "R4583A44-00", "BG型号": "02BGF1250R/F" } },
      { partName: "垫片：EPDM/PTFE", models: { "FV型号": "5005-860EP", "PL型号": "1113750019", "GD型号": "RM50EP00-01", "BG型号": "BG802850EF" } },
    ],
    "300": [
      { partName: "标准快开清洁孔", models: { "FV型号": "8TB/2750118P", "PL型号": "CMS354D4ST 1115279200", "GD型号": "R4343A04-00", "BG型号": "04BGF1250R/F" } },
      { partName: "垫片：EPDM/PTFE", models: { "FV型号": "5005-890EP", "PL型号": "1113750020", "GD型号": "RM30EP00-02", "BG型号": "BG802855EF" } },
    ],
  },
  safety: {
    "2.5bsp": [
      { partName: "凸缘：切向凸缘", models: { "FV型号": "176/3150", "PL型号": "1291140000", "GD型号": "ZAB46501-03", "BG型号": "BG3150F-176R" } },
      { partName: "垫片：CNAF/PTFE", models: { "FV型号": "5005-398", "PL型号": "1110016000", "GD型号": "ZAB46501-07-00", "BG型号": "BG398F-5005" } },
      { partName: "过渡法兰", models: { "FV型号": "176/7050", "PL型号": "1191155200", "GD型号": "ZAB46501-04-00", "BG型号": "BG901647R" } },
      { partName: "螺固件", models: { "FV型号": "176/7021", "PL型号": "1212609300", "GD型号": "SNFA0001", "BG型号": "BG803130P" }, quantity: 6 },
      { partName: "安全阀", models: { "FV型号": "010/144000", "PL型号": "MX65F44TSP", "GD型号": "AMB46501-00", "BG型号": "10BG64440GR/F" } },
      { partName: "安全阀垫片", models: { "FV型号": "/", "PL型号": "/", "GD型号": "ZAB46501-01-00", "BG型号": "BG802801FQ" } },
      { partName: "螺塞", models: { "FV型号": "5128-005", "PL型号": "7012393707", "GD型号": "/", "BG型号": "BG200113R" } },
    ],
    "3flange": [
      { partName: "凸缘：切向凸缘", models: { "FV型号": "176/3125", "PL型号": "1190154000", "GD型号": "ZAF48001-07", "BG型号": "BG3125F-176R" } },
      { partName: "螺固件", models: { "FV型号": "311/3050", "PL型号": "1190010700", "GD型号": "SNFA0125", "BG型号": "BG820110P" }, quantity: 4 },
      { partName: "垫片：CNAF/PTFE", models: { "FV型号": "5005-930", "PL型号": "1292040000", "GD型号": "ZAF48001-01-00", "BG型号": "BG334F-5005" } },
      { partName: "安全阀-4.4bar", models: { "FV型号": "043/1440008ZS", "PL型号": "MX80P44TS", "GD型号": "AF8004400013", "BG型号": "10BG82440GR/F" } },
      { partName: "螺塞", models: { "FV型号": "5128-08", "PL型号": "/", "GD型号": "/", "BG型号": "/" } },
    ],
  },
  control: {
    "dn50": [
      { partName: "球阀主体", models: { "FV型号": "BV50-001", "PL型号": "PLB50-A", "GD型号": "GDB50-01", "BG型号": "BGBV50F" } },
      { partName: "密封垫片", models: { "FV型号": "5005-050", "PL型号": "1113750050", "GD型号": "GD50-SEAL", "BG型号": "BG050SEAL" } },
      { partName: "手柄组件", models: { "FV型号": "HND-50", "PL型号": "PLHND50", "GD型号": "GDHND50", "BG型号": "BGHND50" } },
      { partName: "连接螺栓", models: { "FV型号": "176/5050", "PL型号": "1190050000", "GD型号": "SNFA0050", "BG型号": "BG805050P" }, quantity: 4 },
    ],
    "dn80": [
      { partName: "球阀主体", models: { "FV型号": "BV80-001", "PL型号": "PLB80-A", "GD型号": "GDB80-01", "BG型号": "BGBV80F" } },
      { partName: "密封垫片", models: { "FV型号": "5005-080", "PL型号": "1113750080", "GD型号": "GD80-SEAL", "BG型号": "BG080SEAL" } },
      { partName: "手柄组件", models: { "FV型号": "HND-80", "PL型号": "PLHND80", "GD型号": "GDHND80", "BG型号": "BGHND80" } },
      { partName: "连接螺栓", models: { "FV型号": "176/5080", "PL型号": "1190080000", "GD型号": "SNFA0080", "BG型号": "BG805080P" }, quantity: 8 },
    ],
    "dn100": [
      { partName: "球阀主体", models: { "FV型号": "BV100-001", "PL型号": "PLB100-A", "GD型号": "GDB100-01", "BG型号": "BGBV100F" } },
      { partName: "密封垫片", models: { "FV型号": "5005-100", "PL型号": "1113750100", "GD型号": "GD100-SEAL", "BG型号": "BG100SEAL" } },
      { partName: "手柄组件", models: { "FV型号": "HND-100", "PL型号": "PLHND100", "GD型号": "GDHND100", "BG型号": "BGHND100" } },
      { partName: "连接螺栓", models: { "FV型号": "176/5100", "PL型号": "1190100000", "GD型号": "SNFA0100", "BG型号": "BG805100P" }, quantity: 8 },
    ],
  },
  bottom: {
    "3inch": [
      { partName: "底阀主体", models: { "FV型号": "BTV3-001", "PL型号": "PLBTV3-A", "GD型号": "GDBTV3-01", "BG型号": "BGBTV3F" } },
      { partName: "法兰接口", models: { "FV型号": "FL3-176", "PL型号": "PLFL3-176", "GD型号": "GDFL3-01", "BG型号": "BGFL3-176" } },
      { partName: "密封组件", models: { "FV型号": "5005-BTV3", "PL型号": "1113BTV3", "GD型号": "GDBTV3-SEAL", "BG型号": "BGBTV3SEAL" } },
      { partName: "螺固件", models: { "FV型号": "176/7030", "PL型号": "1212609400", "GD型号": "SNFA0003", "BG型号": "BG803140P" }, quantity: 6 },
    ],
    "4inch": [
      { partName: "底阀主体", models: { "FV型号": "BTV4-001", "PL型号": "PLBTV4-A", "GD型号": "GDBTV4-01", "BG型号": "BGBTV4F" } },
      { partName: "法兰接口", models: { "FV型号": "FL4-176", "PL型号": "PLFL4-176", "GD型号": "GDFL4-01", "BG型号": "BGFL4-176" } },
      { partName: "密封组件", models: { "FV型号": "5005-BTV4", "PL型号": "1113BTV4", "GD型号": "GDBTV4-SEAL", "BG型号": "BGBTV4SEAL" } },
      { partName: "螺固件", models: { "FV型号": "176/7040", "PL型号": "1212609500", "GD型号": "SNFA0004", "BG型号": "BG803150P" }, quantity: 8 },
    ],
  },
};

const PartsRecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string>("");
  const [recommendedParts, setRecommendedParts] = useState<PartItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("FV型号");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSpec("");
    setRecommendedParts([]);
  };

  const handleGenerateRecommendation = () => {
    if (!selectedCategory || !selectedSpec) {
      toast.error("请先选择组件分类和规格");
      return;
    }

    setIsGenerating(true);
    
    // 模拟AI推荐延迟
    setTimeout(() => {
      const parts = partsDatabase[selectedCategory]?.[selectedSpec] || [];
      setRecommendedParts(parts);
      setIsGenerating(false);
      
      if (parts.length > 0) {
        toast.success(`已智能推荐 ${parts.length} 个零件`);
      } else {
        toast.info("暂无匹配的零件推荐");
      }
    }, 1200);
  };

  const toggleRowExpand = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    toast.success("已将所有推荐零件添加到选配清单");
  };

  const handleSelectPart = (partName: string) => {
    toast.success(`已添加: ${partName}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-wide text-foreground/90 mb-2 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-accent" />
          智能零件推荐
        </h2>
        <p className="text-[13px] font-semibold text-foreground/55">
          根据组件规格要求，智能匹配并推荐所有需要的零件及各品牌型号
        </p>
      </div>

      <FormCard title="组件分类选择">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {componentCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              description={cat.desc}
              selected={selectedCategory === cat.id}
              onClick={() => handleCategorySelect(cat.id)}
            />
          ))}
        </div>
      </FormCard>

      {selectedCategory && (
        <FormCard title="规格参数">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <FormSelect
              label="选择规格"
              options={specOptions[selectedCategory] || []}
              value={selectedSpec}
              onChange={(value) => setSelectedSpec(value)}
            />
          </div>
          
          <div className="mt-6">
            <Button
              onClick={handleGenerateRecommendation}
              disabled={!selectedSpec || isGenerating}
              className="bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span>
                  智能匹配中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  智能推荐零件
                </>
              )}
            </Button>
          </div>
        </FormCard>
      )}

      {recommendedParts.length > 0 && (
        <FormCard title="推荐零件清单">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-foreground/60">
              共推荐 <span className="font-bold text-accent">{recommendedParts.length}</span> 个零件
            </p>
            <div className="flex gap-2">
              <FormSelect
                label=""
                options={brandModels.map(b => ({ value: b, label: b }))}
                value={selectedBrand}
                onChange={(value) => setSelectedBrand(value)}
                className="!mb-0 w-32"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs"
              >
                <Check className="w-3 h-3 mr-1" />
                全部添加
              </Button>
            </div>
          </div>

          {/* 零件表格 */}
          <div className="border border-foreground/10 rounded-xl overflow-hidden">
            {/* 表头 */}
            <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 bg-foreground/5 text-xs font-bold text-foreground/70 border-b border-foreground/10">
              <div className="w-8">#</div>
              <div>零件名称</div>
              <div>{selectedBrand}</div>
              <div className="w-24 text-center">操作</div>
            </div>
            
            {/* 表格内容 */}
            {recommendedParts.map((part, index) => (
              <div key={index} className="border-b border-foreground/8 last:border-b-0">
                {/* 主行 */}
                <div 
                  className={cn(
                    "grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 items-center hover:bg-foreground/3 transition-colors cursor-pointer",
                    expandedRows.includes(index) && "bg-accent/5"
                  )}
                  onClick={() => toggleRowExpand(index)}
                >
                  <div className="w-8 text-xs font-bold text-foreground/50">{index + 1}</div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-accent/70" />
                    <span className="text-sm font-semibold text-foreground/85">
                      {part.partName}
                      {part.quantity && (
                        <span className="ml-2 text-xs text-accent font-bold">
                          (数量×{part.quantity})
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-sm font-mono text-foreground/70">
                    {part.models[selectedBrand] || "-"}
                  </div>
                  <div className="w-24 flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPart(part.partName);
                      }}
                    >
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </Button>
                    {expandedRows.includes(index) ? (
                      <ChevronUp className="w-4 h-4 text-foreground/40" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-foreground/40" />
                    )}
                  </div>
                </div>
                
                {/* 展开行 - 显示所有品牌型号 */}
                {expandedRows.includes(index) && (
                  <div className="px-4 py-3 bg-foreground/3 border-t border-foreground/8">
                    <div className="grid grid-cols-4 gap-3">
                      {brandModels.map((brand) => (
                        <div key={brand} className="bg-white/60 rounded-lg p-3 border border-foreground/8">
                          <div className="text-[10px] font-bold text-foreground/50 mb-1 uppercase tracking-wider">
                            {brand}
                          </div>
                          <div className="text-xs font-mono text-foreground/80 break-all">
                            {part.models[brand] || "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FormCard>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => navigate("/valve-design")}>
          ← 返回阀组件总览
        </Button>
        <Button
          className="bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
          onClick={() => navigate("/option/verification/basic")}
        >
          进入设计校核 →
        </Button>
      </div>
    </div>
  );
};

export default PartsRecommendationPage;
