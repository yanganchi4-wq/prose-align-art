import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Upload, Check } from "lucide-react";

const OrderMemoPage: React.FC = () => {
  const handleSaveDraft = () => {
    toast.success("草稿已保存");
  };

  const handleUploadPLM = () => {
    toast.success("已上传至PLM系统");
  };

  const handleComplete = () => {
    toast.success("校核流程已完成！");
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-foreground/92 tracking-wide mb-2">订单备忘</h2>
        <p className="text-sm font-semibold text-foreground/55">记录订单相关的重要信息和注意事项</p>
      </div>

      {/* 订单基本信息 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          订单基本信息
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "订单编号", value: "ORD-2026-001234" },
            { label: "客户名称", value: "XXX有限公司" },
            { label: "项目编号", value: "PRJ-2026-789" },
            { label: "交付日期", value: "2026-01-31" },
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
      </div>

      {/* 订单备忘记录编写 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          订单备忘记录编写
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">技术要点</label>
            <textarea
              defaultValue="1. 控制阀需要配备执行器"
              placeholder="记录关键技术要求和注意事项..."
              className="w-full min-h-[120px] px-4 py-3 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">特殊工艺要求</label>
            <textarea
              defaultValue="1. 装配完成后需进行10 bar压力测试，保压30分钟"
              placeholder="记录特殊工艺和加工要求..."
              className="w-full min-h-[100px] px-4 py-3 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">客户沟通记录</label>
            <textarea
              defaultValue="2026-01-23: 讨论凸缘定位角度，最终确定为45度安装"
              placeholder="记录与客户的重要沟通内容..."
              className="w-full min-h-[100px] px-4 py-3 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">风险提示</label>
            <textarea
              defaultValue="注意事项：&#10;1. 客户现场安装空间受限，需再次确认外形尺寸"
              placeholder="记录潜在风险和应对措施..."
              className="w-full min-h-[80px] px-4 py-3 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">附件文档</label>
            <div className="border-2 border-dashed border-foreground/20 rounded-xl p-8 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <div className="text-foreground/60 text-sm">点击上传相关文档、图片或邮件记录</div>
            </div>
          </div>
        </div>
      </div>

      {/* 备忘录状态 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          备忘录状态
        </h3>

        <div className="bg-slate-50 p-5 rounded-xl flex justify-between items-center">
          <div>
            <div className="font-semibold mb-1">当前状态</div>
            <div className="text-sm text-slate-500">草稿 - 未上传至PLM</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">最后修改</div>
            <div className="font-medium">2026-01-22 14:35</div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-2" onClick={handleSaveDraft}>
          <Save className="w-4 h-4 mr-2" />
          保存草稿
        </Button>
        <Button 
          className="bg-gradient-to-r from-accent to-accent/70 text-white"
          onClick={handleUploadPLM}
        >
          <Upload className="w-4 h-4 mr-2" />
          上传至PLM
        </Button>
      </div>

      {/* 完成按钮 */}
      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleComplete}
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] px-12 py-6 text-lg"
        >
          <Check className="w-5 h-5 mr-2" />
          完成校核流程
        </Button>
      </div>
    </div>
  );
};

export default OrderMemoPage;
