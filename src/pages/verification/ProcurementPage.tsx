import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Clock, FileText, Briefcase, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProcurementPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleStartTransmission = () => {
    setIsTransmitting(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsTransmitting(false);
        toast.success("传输流程完成！");
      }
    }, 300);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-foreground/92 tracking-wide mb-2">录入与传输预采购</h2>
        <p className="text-sm font-semibold text-foreground/55">将核对后的阀件信息传输至PLM和SAP系统</p>
      </div>

      {/* 选择核对后的阀件清单 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          选择核对后的阀件清单
        </h3>

        <select className="w-full h-11 px-4 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all">
          <option>所有已核对阀件 (3项)</option>
          <option>零件A - 安全阀 SV-001</option>
          <option>零件B - 球阀 CV-002</option>
          <option>零件C - 人孔组件 MT-001</option>
        </select>
      </div>

      {/* 零件状态检查 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          零件状态检查
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-green-50 p-6 rounded-xl text-center border-2 border-green-200">
            <div className="text-4xl font-bold text-green-700 mb-2">2</div>
            <div className="text-sm text-green-800">已有零件</div>
            <div className="text-xs text-green-600 mt-1">可直接导入PLM</div>
          </div>
          <div className="bg-amber-50 p-6 rounded-xl text-center border-2 border-amber-200">
            <div className="text-4xl font-bold text-amber-700 mb-2">1</div>
            <div className="text-sm text-amber-800">新建零件</div>
            <div className="text-xs text-amber-600 mt-1">需要申请MDG</div>
          </div>
          <div className="bg-red-50 p-6 rounded-xl text-center border-2 border-red-200">
            <div className="text-4xl font-bold text-red-700 mb-2">0</div>
            <div className="text-sm text-red-800">缺乏零件</div>
            <div className="text-xs text-red-600 mt-1">需要补充信息</div>
          </div>
        </div>
      </div>

      {/* 传输流程 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          传输流程
        </h3>

        <div className="text-sm font-semibold text-foreground/60 mb-2">传输进度: {progress}%</div>
        <div className="h-2 bg-foreground/12 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: FileText, title: "导入PLM", sub: "", color: "bg-blue-100", iconColor: "text-blue-600" },
            { icon: FileText, title: "提交校对审核", sub: "如新建零件", color: "bg-purple-100", iconColor: "text-purple-600" },
            { icon: Briefcase, title: "申请MDG", sub: "如新建零件", color: "bg-amber-100", iconColor: "text-amber-600" },
            { icon: CheckSquare, title: "传输SAP", sub: "", color: "bg-green-100", iconColor: "text-green-600" },
          ].map((step) => (
            <div key={step.title} className="text-center">
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <step.icon className={`w-8 h-8 ${step.iconColor}`} />
              </div>
              <div className="font-medium mb-1">{step.title}</div>
              {step.sub && <div className="text-xs text-slate-500">{step.sub}</div>}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleStartTransmission}
            disabled={isTransmitting}
            className="bg-gradient-to-r from-accent to-accent/70 text-white shadow-[0_4px_12px_rgba(26,163,255,0.3)]"
          >
            <Clock className="w-4 h-4 mr-2" />
            {isTransmitting ? "传输中..." : "开始传输流程"}
          </Button>
        </div>
      </div>

      {/* 传输记录查看 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          传输记录查看
        </h3>

        <div className="text-center py-12 text-slate-400">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <p>暂无传输记录</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/option/verification/positioning")} className="border-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回上一步
        </Button>
        <Button 
          onClick={() => navigate("/option/verification/component-drawing")}
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
        >
          查看组件图
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ProcurementPage;
