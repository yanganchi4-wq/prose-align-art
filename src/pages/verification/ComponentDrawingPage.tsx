import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, FileText, Search, Eye, Check, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComponentDrawingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    toast.info(`${action}（原型占位）`);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-foreground/92 tracking-wide mb-2">阀件组件图</h2>
        <p className="text-sm font-semibold text-foreground/55">确认组件图纸并进行模型装配</p>
      </div>

      {/* 确认组件图纸 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          确认组件图纸
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "导入校审表", icon: FileText },
            { title: "标准组件表", icon: FileText },
            { title: "BOM反查", icon: Search },
            { title: "相似订单组件图", icon: FileText },
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => handleAction(item.title)}
              className="border-2 border-dashed border-foreground/20 rounded-xl p-8 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="text-foreground/60 text-sm">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 模型装配流程 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          模型装配流程
        </h3>

        <div className="bg-slate-50 p-6 rounded-xl mb-6">
          <div className="font-medium text-sidebar mb-3">当前状态: 无现有图纸</div>
          <div className="text-sm text-slate-500">需要进行三维模型装配并制作工程图</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { step: 1, title: "导入零件三维模型", desc: "从PLM系统导入已核对的零件3D模型", action: "导入模型", primary: false },
            { step: 2, title: "模型装配", desc: "在CAD软件中进行装配关系定义", action: "启动装配", primary: false },
            { step: 3, title: "工程图制作", desc: "根据装配体生成二维工程图", action: "生成图纸", primary: false },
            { step: 4, title: "工程图上传PLM", desc: "将完成的工程图上传至PLM系统", action: "上传PLM", primary: true },
          ].map((item) => (
            <div key={item.step} className="bg-white border-2 border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 font-semibold text-sidebar mb-3">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                  {item.step}
                </span>
                {item.title}
              </div>
              <div className="text-sm text-slate-500 mb-4">{item.desc}</div>
              <Button
                variant={item.primary ? "default" : "outline"}
                className={`w-full text-sm ${item.primary ? "bg-gradient-to-r from-accent to-accent/70 text-white" : ""}`}
                onClick={() => handleAction(item.action)}
              >
                {item.action}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 核对校审 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          核对校审
        </h3>

        <div className="bg-slate-50 rounded-xl p-12 text-center mb-6">
          <div className="mb-4">
            <FileText className="w-8 h-8 mx-auto text-slate-400" />
          </div>
          <p className="text-slate-400">组件图纸预览区域</p>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-2" onClick={() => handleAction("预览图纸")}>
            <Eye className="w-4 h-4 mr-2" />
            预览图纸
          </Button>
          <Button 
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white"
            onClick={() => handleAction("确认图纸")}
          >
            <Check className="w-4 h-4 mr-2" />
            确认图纸
          </Button>
          <Button 
            className="bg-gradient-to-r from-accent to-accent/70 text-white"
            onClick={() => handleAction("提交PLM")}
          >
            <Upload className="w-4 h-4 mr-2" />
            提交PLM
          </Button>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/option/verification/procurement")} className="border-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回上一步
        </Button>
        <Button 
          onClick={() => navigate("/option/verification/order-memo")}
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
        >
          填写订单备忘
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ComponentDrawingPage;
