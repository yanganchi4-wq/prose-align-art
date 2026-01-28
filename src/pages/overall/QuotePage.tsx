import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QuotePage: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      toast.success(`已选择文件：${file.name}`);
    }
  };

  const handleClear = () => {
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("已清空");
  };

  const handleSave = () => {
    toast.success("报价总图已保存（原型）");
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/10 shadow-card overflow-hidden p-6 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-35 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-foreground/92 tracking-wide">总体设计 · 报价总图</h2>
            <span className="text-xs font-extrabold text-foreground/55">二维图纸导入与预览</span>
          </div>

          {/* Section card */}
          <div className="rounded-2xl border border-foreground/12 bg-white/78 shadow-[0_10px_22px_rgba(7,30,55,0.08)] p-4 mb-4">
            <div className="flex items-center gap-3 font-extrabold text-sidebar mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-accent/95 to-accent/25 shadow-[0_6px_14px_rgba(26,163,255,0.25)]" />
              <span>二维图纸总览</span>
            </div>
            <p className="text-xs text-foreground/65 mb-4">在此导入二维图纸（原型占位），并在右侧预览窗口中展示（后续可接入缩放/标注/图层等功能）。</p>

            <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4">
              {/* 导入图纸窗口 */}
              <div className="rounded-2xl border border-dashed border-foreground/22 bg-white/60 min-h-[220px] p-4 flex flex-col gap-3 justify-center items-center text-center shadow-[0_10px_24px_rgba(6,34,66,0.08)]">
                <div className="w-14 h-14 rounded-2xl grid place-items-center bg-accent/14 border border-accent/25 text-sidebar font-black text-lg">
                  ▦
                </div>
                <div className="text-base font-extrabold text-sidebar">导入图纸窗口</div>
                <div className="text-xs text-foreground/70 leading-relaxed">
                  点击"选择文件"导入（原型示意）<br/>
                  支持：PDF / PNG / JPG / DWG（占位）
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.dwg"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex gap-3 flex-wrap justify-center">
                  <Button type="button" onClick={handleFileSelect} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
                    选择文件
                  </Button>
                  <Button type="button" variant="outline" onClick={handleClear}>
                    清空
                  </Button>
                </div>

                <div className="w-full mt-2 px-3 py-2 rounded-xl border border-foreground/14 bg-white/55 text-foreground/85 text-xs flex justify-between items-center gap-3">
                  <span>{fileName || "未选择文件"}</span>
                  <span>{fileSize || "—"}</span>
                </div>
              </div>

              {/* 二维图纸预览窗口 */}
              <div className="rounded-2xl border border-dashed border-foreground/22 bg-[linear-gradient(0deg,rgba(255,255,255,0.62),rgba(255,255,255,0.62)),linear-gradient(90deg,rgba(10,60,110,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(10,60,110,0.05)_1px,transparent_1px)] bg-[length:auto,32px_32px,32px_32px] overflow-hidden min-h-[400px] shadow-[0_10px_24px_rgba(6,34,66,0.08)] relative">
                {!fileName ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/70 text-center p-6">
                    <div className="w-14 h-14 rounded-2xl grid place-items-center bg-accent/14 border border-accent/25 text-sidebar font-black">
                      ▦
                    </div>
                    <div className="font-black text-sidebar">二维图纸预览窗口</div>
                    <div className="text-xs text-foreground/65 leading-relaxed">
                      暂无图纸内容（原型占位）<br/>
                      导入文件后将在此处显示文件信息/预览占位
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/70 text-center p-6">
                    <div className="w-14 h-14 rounded-2xl grid place-items-center bg-accent/14 border border-accent/25 text-sidebar font-black">
                      ✓
                    </div>
                    <div className="font-black text-sidebar">已导入图纸</div>
                    <div className="text-xs text-foreground/65 leading-relaxed">
                      文件名：{fileName}<br/>
                      （原型：未接入真实渲染，仅展示文件信息）
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={handleSave} className="bg-accent/14 border-accent/35 text-sidebar hover:shadow-lg">
              保存（原型）
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
