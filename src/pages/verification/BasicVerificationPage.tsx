import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search, ArrowRight, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VerificationItemProps {
  label: string;
  status: "pass" | "fail" | "pending";
}

const VerificationItem: React.FC<VerificationItemProps> = ({ label, status }) => {
  const statusConfig = {
    pass: { text: "通过", bg: "bg-gradient-to-r from-emerald-500 to-emerald-400", color: "text-white" },
    fail: { text: "不通过", bg: "bg-gradient-to-r from-red-500 to-red-400", color: "text-white" },
    pending: { text: "待确认", bg: "bg-gradient-to-r from-amber-500 to-amber-400", color: "text-white" },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white p-4 rounded-xl flex items-center justify-between border-2 border-foreground/12 hover:border-accent hover:shadow-[0_4px_12px_rgba(26,163,255,0.15)] transition-all">
      <span className="text-sm text-foreground/70 font-medium">{label}</span>
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${config.bg} ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
};

const BasicVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [partNumber, setPartNumber] = useState("");

  const handleSearch = () => {
    if (partNumber) {
      toast.success(`正在检索零件编号: ${partNumber}，已找到匹配零件`);
    } else {
      toast.error("请输入零件编号");
    }
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-foreground/92 tracking-wide mb-2">核阀 — 基础信息核对</h2>
        <p className="text-sm font-semibold text-foreground/55">核对阀件清单中的基础信息与罐体材料的一致性</p>
      </div>

      {/* 导入阀件清单 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          导入阀件清单
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">编号检索</label>
            <input
              type="text"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              placeholder="输入零件编号进行检索"
              className="w-full h-11 px-4 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all"
            />
          </div>
          <Button onClick={handleSearch} className="bg-gradient-to-r from-accent to-accent/70 text-white shadow-[0_4px_12px_rgba(26,163,255,0.3)] hover:shadow-[0_6px_16px_rgba(26,163,255,0.4)] hover:-translate-y-0.5 transition-all">
            <Search className="w-4 h-4 mr-2" />
            检索并导入
          </Button>
        </div>
      </div>

      {/* 零件A基础信息 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          零件A基础信息
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: "温度范围", value: "-20°C ~ 180°C" },
            { label: "压力等级", value: "10 bar" },
            { label: "主体材料", value: "316L不锈钢" },
            { label: "密封材料", value: "EPDM" },
            { label: "结构型式", value: "法兰连接" },
            { label: "规格尺寸", value: "DN50" },
            { label: "表面粗糙度", value: "Ra 0.8" },
            { label: "连接尺寸", value: "PN16" },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">{item.label}</label>
              <input
                type="text"
                value={item.value}
                readOnly
                className="w-full h-11 px-4 rounded-xl border-2 border-foreground/12 bg-slate-100 text-sm cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">法规要求</label>
            <input
              type="text"
              value="符合FDA、3A卫生标准"
              readOnly
              className="w-full h-11 px-4 rounded-xl border-2 border-foreground/12 bg-slate-100 text-sm cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">配件要求</label>
            <input
              type="text"
              value="不锈钢螺栓、密封垫片"
              readOnly
              className="w-full h-11 px-4 rounded-xl border-2 border-foreground/12 bg-slate-100 text-sm cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">客户个性化要求</label>
            <textarea
              value="需要额外的温度传感器接口，表面需要电抛光处理"
              readOnly
              className="w-full min-h-[80px] px-4 py-3 rounded-xl border-2 border-foreground/12 bg-slate-100 text-sm cursor-not-allowed resize-y"
            />
          </div>
        </div>
      </div>

      {/* 核对结果 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          核对结果
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          <VerificationItem label="与罐体材料一致性" status="pass" />
          <VerificationItem label="温度压力匹配" status="pass" />
          <VerificationItem label="法规要求符合性" status="pass" />
          <VerificationItem label="连接尺寸匹配" status="fail" />
          <VerificationItem label="密封材料适配" status="pass" />
          <VerificationItem label="表面处理要求" status="pending" />
        </div>

        {/* 冲突问题记录 */}
        <div className="mt-6">
          <h4 className="text-base font-semibold text-sidebar mb-4">冲突问题记录</h4>
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-4">
            <div className="font-bold text-red-800 mb-2">连接尺寸不匹配</div>
            <div className="text-red-700 text-sm">零件法兰规格为PN16，但罐体接口要求为PN25，需要使用转接法兰或更换零件规格</div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-2">
          <List className="w-4 h-4 mr-2" />
          查看总图规范
        </Button>
        <Button 
          onClick={() => navigate("/option/verification/positioning")}
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all"
        >
          继续定位核阀
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BasicVerificationPage;
