import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Upload, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VerificationItemProps {
  label: string;
  status: "pass" | "fail" | "pending";
}

const VerificationItem: React.FC<VerificationItemProps> = ({ label, status }) => {
  const statusConfig = {
    pass: { text: "通过", bg: "bg-gradient-to-r from-emerald-500 to-emerald-400" },
    fail: { text: "不通过", bg: "bg-gradient-to-r from-red-500 to-red-400" },
    pending: { text: "待确认", bg: "bg-gradient-to-r from-amber-500 to-amber-400" },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white p-4 rounded-xl flex items-center justify-between border-2 border-foreground/12 hover:border-accent transition-all">
      <span className="text-sm text-foreground/70 font-medium">{label}</span>
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${config.bg} text-white`}>
        {config.text}
      </span>
    </div>
  );
};

const PositioningPage: React.FC = () => {
  const navigate = useNavigate();
  const [showDrawing, setShowDrawing] = useState(false);

  const handleGenerateDrawing = () => {
    setShowDrawing(true);
    toast.success("核阀图已生成");
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-foreground/92 tracking-wide mb-2">核阀 — 阀件定位与核阀图</h2>
        <p className="text-sm font-semibold text-foreground/55">配置阀件定位属性并生成核阀图</p>
      </div>

      {/* 选择核对后的阀件清单 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          选择核对后的阀件清单
        </h3>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">已核对阀件</label>
          <select className="w-full h-11 px-4 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all">
            <option>零件A - 安全阀 SV-001 (已通过核对)</option>
            <option>零件B - 球阀 CV-002 (已通过核对)</option>
            <option>零件C - 人孔组件 MT-001 (已通过核对)</option>
          </select>
        </div>
      </div>

      {/* 阀件定位属性 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          阀件定位属性
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-accent/5">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground/70 border-b border-foreground/10">属性名称</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground/70 border-b border-foreground/10">数值</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground/70 border-b border-foreground/10">单位</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground/70 border-b border-foreground/10">备注</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "凸缘厚度", value: "12", unit: "mm", note: "影响安装强度" },
                { name: "凸缘定位角度", value: "0", unit: "度", note: "0-360°" },
                { name: "罐体下沉距离", value: "150", unit: "mm", note: "保证操作空间" },
                { name: "溢流盒长度", value: "200", unit: "mm", note: "-" },
                { name: "溢流盒宽度", value: "150", unit: "mm", note: "-" },
                { name: "外形尺寸（高度）", value: "320", unit: "mm", note: "含阀体总高" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-foreground/10">
                  <td className="px-4 py-3 text-sm text-foreground">{row.name}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      defaultValue={row.value}
                      className="w-full h-9 px-3 rounded-lg border border-foreground/12 text-sm focus:border-accent focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{row.unit}</td>
                  <td className="px-4 py-3 text-sm text-foreground/60">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 核阀图预览 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          核阀图预览
        </h3>

        <div className="bg-slate-50 rounded-xl p-12 text-center">
          {!showDrawing ? (
            <>
              <div className="mb-4">
                <Image className="w-8 h-8 mx-auto text-slate-400" />
              </div>
              <p className="text-slate-400 mb-5">调整定位属性后，图像将实时更新显示</p>
              <Button variant="outline" onClick={handleGenerateDrawing}>
                生成核阀图
              </Button>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold text-sidebar mb-3">核阀图已生成</div>
              <p className="text-slate-500 mb-5">基于当前定位参数生成的三维示意图</p>
              <div className="w-full h-[300px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
                3D 核阀图预览
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" className="border-2">
            <Upload className="w-4 h-4 mr-2" />
            导出核阀图
          </Button>
        </div>
      </div>

      {/* 核对部分 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          核对部分
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <VerificationItem label="顶部空间满足要求" status="pass" />
          <VerificationItem label="底部空间满足要求" status="pass" />
          <VerificationItem label="操作空间足够" status="pass" />
          <VerificationItem label="凸缘厚度足够" status="pass" />
          <VerificationItem label="外伸距离足够" status="pending" />
        </div>

        <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
          <p className="font-medium text-amber-800 mb-2">布局调整建议</p>
          <p className="text-amber-700 text-sm">建议增加罐体下沉距离至180mm以确保底部维护空间充足</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/option/verification/basic")} className="border-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回上一步
        </Button>
        <Button 
          onClick={() => navigate("/option/verification/procurement")}
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
        >
          继续录入传输
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PositioningPage;
