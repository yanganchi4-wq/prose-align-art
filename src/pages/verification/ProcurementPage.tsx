import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ArrowLeft, ArrowRight, Clock, FileText, Briefcase, CheckSquare, 
  Upload, AlertTriangle, CheckCircle, XCircle, RefreshCw, Send,
  FileCheck, Users, Settings, History
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 模拟数据
const partsData = {
  w1: [
    { id: "SV-001", name: "安全阀组件", type: "W1", status: "existing", plmStatus: "已录入", sapStatus: "待传输" },
    { id: "CV-002", name: "球阀组件", type: "W1", status: "existing", plmStatus: "已录入", sapStatus: "已传输" },
  ],
  z4: [
    { id: "FL-003", name: "法兰接口", type: "Z4", status: "new", plmStatus: "待录入", sapStatus: "待MDG" },
  ],
  selfMade: [
    { id: "MT-001", name: "人孔组件", type: "自制", status: "selfMade", plmStatus: "待审核", sapStatus: "待OA" },
  ]
};

const transmissionRecords = [
  { id: 1, time: "2024-01-15 14:32", type: "PLM录入", parts: "SV-001, CV-002", status: "success", operator: "张工" },
  { id: 2, time: "2024-01-15 15:10", type: "SAP传输", parts: "CV-002", status: "success", operator: "系统" },
  { id: 3, time: "2024-01-15 16:45", type: "MDG申请", parts: "FL-003", status: "pending", operator: "李工" },
];

const ProcurementPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("w1");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [changeReviewStatus, setChangeReviewStatus] = useState<"idle" | "reviewing" | "approved" | "rejected">("idle");

  const handleStartTransmission = () => {
    if (selectedParts.length === 0) {
      toast.error("请先选择要传输的零件");
      return;
    }
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

  const handlePartSelect = (partId: string) => {
    setSelectedParts(prev => 
      prev.includes(partId) 
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
  };

  const handleSubmitChangeReview = () => {
    setChangeReviewStatus("reviewing");
    toast.info("变更审核已提交，等待审批...");
    setTimeout(() => {
      setChangeReviewStatus("approved");
      toast.success("变更审核已通过！");
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "existing":
        return <Badge className="bg-green-100 text-green-700 border-green-200">已有零件</Badge>;
      case "new":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">新建零件</Badge>;
      case "selfMade":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">自制件</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlmStatusBadge = (status: string) => {
    switch (status) {
      case "已录入":
        return <Badge className="bg-green-100 text-green-700">已录入</Badge>;
      case "待录入":
        return <Badge className="bg-amber-100 text-amber-700">待录入</Badge>;
      case "待审核":
        return <Badge className="bg-purple-100 text-purple-700">待审核</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSapStatusBadge = (status: string) => {
    switch (status) {
      case "已传输":
        return <Badge className="bg-green-100 text-green-700">已传输</Badge>;
      case "待传输":
        return <Badge className="bg-amber-100 text-amber-700">待传输</Badge>;
      case "待MDG":
        return <Badge className="bg-blue-100 text-blue-700">待MDG</Badge>;
      case "待OA":
        return <Badge className="bg-purple-100 text-purple-700">待OA</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderPartsTable = (parts: typeof partsData.w1) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">选择</TableHead>
          <TableHead>零件编号</TableHead>
          <TableHead>零件名称</TableHead>
          <TableHead>类型</TableHead>
          <TableHead>零件状态</TableHead>
          <TableHead>PLM状态</TableHead>
          <TableHead>SAP状态</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parts.map((part) => (
          <TableRow key={part.id}>
            <TableCell>
              <Checkbox 
                checked={selectedParts.includes(part.id)}
                onCheckedChange={() => handlePartSelect(part.id)}
              />
            </TableCell>
            <TableCell className="font-medium">{part.id}</TableCell>
            <TableCell>{part.name}</TableCell>
            <TableCell><Badge variant="outline">{part.type}</Badge></TableCell>
            <TableCell>{getStatusBadge(part.status)}</TableCell>
            <TableCell>{getPlmStatusBadge(part.plmStatus)}</TableCell>
            <TableCell>{getSapStatusBadge(part.sapStatus)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-foreground/92 tracking-wide mb-2">录入与传输预采购</h2>
        <p className="text-sm font-semibold text-foreground/55">将核对后的阀件信息传输至PLM和SAP系统（W1/Z4分类管理）</p>
      </div>

      {/* W1/Z4 零件分类管理 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          零件分类管理 (W1/Z4)
        </h3>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="w1" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              W1 外购件 ({partsData.w1.length})
            </TabsTrigger>
            <TabsTrigger value="z4" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Z4 标准件 ({partsData.z4.length})
            </TabsTrigger>
            <TabsTrigger value="selfMade" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              自制人孔 ({partsData.selfMade.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="w1">
            <div className="bg-blue-50/50 p-4 rounded-xl mb-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800">W1 外购件说明</div>
                  <div className="text-sm text-blue-600 mt-1">外购标准零件，可直接录入PLM并传输SAP。如为新建零件需先申请MDG。</div>
                </div>
              </div>
            </div>
            {renderPartsTable(partsData.w1)}
          </TabsContent>

          <TabsContent value="z4">
            <div className="bg-amber-50/50 p-4 rounded-xl mb-4 border border-amber-100">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-800">Z4 标准件说明</div>
                  <div className="text-sm text-amber-600 mt-1">标准规格零件，新建时需要申请MDG物料编码后方可传输SAP。</div>
                </div>
              </div>
            </div>
            {renderPartsTable(partsData.z4)}
          </TabsContent>

          <TabsContent value="selfMade">
            <div className="bg-purple-50/50 p-4 rounded-xl mb-4 border border-purple-100">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-medium text-purple-800">自制人孔处理说明</div>
                  <div className="text-sm text-purple-600 mt-1">自制人孔组件需经过OA审批流程，通过后方可录入PLM并传输SAP。</div>
                </div>
              </div>
            </div>
            {renderPartsTable(partsData.selfMade)}

            {/* 自制人孔专属操作 */}
            <div className="mt-4 p-4 bg-purple-50/30 rounded-xl border border-purple-100">
              <div className="text-sm font-semibold text-purple-800 mb-3">自制人孔处理流程</div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Upload className="w-4 h-4 mr-2" />
                  上传图纸
                </Button>
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Send className="w-4 h-4 mr-2" />
                  提交OA审批
                </Button>
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <FileCheck className="w-4 h-4 mr-2" />
                  查看审批状态
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 零件状态检查 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          零件状态检查
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <div className="bg-green-50 p-5 rounded-xl text-center border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700 mb-2">2</div>
            <div className="text-sm text-green-800 font-medium">已有零件</div>
            <div className="text-xs text-green-600 mt-1">可直接导入PLM</div>
          </div>
          <div className="bg-amber-50 p-5 rounded-xl text-center border-2 border-amber-200">
            <div className="text-3xl font-bold text-amber-700 mb-2">1</div>
            <div className="text-sm text-amber-800 font-medium">新建零件</div>
            <div className="text-xs text-amber-600 mt-1">需要申请MDG</div>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl text-center border-2 border-purple-200">
            <div className="text-3xl font-bold text-purple-700 mb-2">1</div>
            <div className="text-sm text-purple-800 font-medium">自制件</div>
            <div className="text-xs text-purple-600 mt-1">需OA审批</div>
          </div>
          <div className="bg-red-50 p-5 rounded-xl text-center border-2 border-red-200">
            <div className="text-3xl font-bold text-red-700 mb-2">0</div>
            <div className="text-sm text-red-800 font-medium">缺乏零件</div>
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

        <div className="text-sm font-semibold text-foreground/60 mb-2">
          传输进度: {progress}% {selectedParts.length > 0 && `(已选 ${selectedParts.length} 项)`}
        </div>
        <div className="h-2 bg-foreground/12 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            { icon: FileText, title: "PLM录入", sub: "W1/Z4", color: "bg-blue-100", iconColor: "text-blue-600" },
            { icon: Users, title: "校对审核", sub: "如新建零件", color: "bg-purple-100", iconColor: "text-purple-600" },
            { icon: Briefcase, title: "MDG申请", sub: "如新建零件", color: "bg-amber-100", iconColor: "text-amber-600" },
            { icon: Send, title: "OA传输", sub: "自制件", color: "bg-pink-100", iconColor: "text-pink-600" },
            { icon: CheckSquare, title: "SAP传输", sub: "", color: "bg-green-100", iconColor: "text-green-600" },
          ].map((step) => (
            <div key={step.title} className="text-center">
              <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <step.icon className={`w-7 h-7 ${step.iconColor}`} />
              </div>
              <div className="font-medium text-sm mb-1">{step.title}</div>
              {step.sub && <div className="text-xs text-slate-500">{step.sub}</div>}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <Button 
            variant="outline"
            onClick={() => setSelectedParts([])}
            disabled={selectedParts.length === 0}
          >
            清除选择
          </Button>
          <Button 
            onClick={handleStartTransmission}
            disabled={isTransmitting || selectedParts.length === 0}
            className="bg-gradient-to-r from-accent to-accent/70 text-white shadow-[0_4px_12px_rgba(26,163,255,0.3)]"
          >
            <Clock className="w-4 h-4 mr-2" />
            {isTransmitting ? "传输中..." : "开始传输流程"}
          </Button>
        </div>
      </div>

      {/* 变更审核流程 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          变更审核流程
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 变更申请 */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <div className="font-semibold">发起变更</div>
                <div className="text-xs text-slate-500">修改已录入的零件信息</div>
              </div>
            </div>
            <div className="space-y-3">
              <select className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm">
                <option>选择变更零件...</option>
                <option>SV-001 - 安全阀组件</option>
                <option>CV-002 - 球阀组件</option>
              </select>
              <textarea 
                className="w-full h-20 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm resize-none"
                placeholder="请输入变更原因..."
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSubmitChangeReview}
                disabled={changeReviewStatus === "reviewing"}
              >
                <Send className="w-4 h-4 mr-2" />
                {changeReviewStatus === "reviewing" ? "审核中..." : "提交变更审核"}
              </Button>
            </div>
          </div>

          {/* 审核状态 */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <div className="font-semibold">审核状态</div>
                <div className="text-xs text-slate-500">查看变更审核进度</div>
              </div>
            </div>
            <div className="space-y-3">
              {changeReviewStatus === "idle" && (
                <div className="text-center py-6 text-slate-400">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">暂无待审核变更</p>
                </div>
              )}
              {changeReviewStatus === "reviewing" && (
                <div className="text-center py-6 text-amber-500">
                  <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                  <p className="text-sm font-medium">审核进行中...</p>
                  <p className="text-xs text-slate-500 mt-1">预计1-2个工作日</p>
                </div>
              )}
              {changeReviewStatus === "approved" && (
                <div className="text-center py-6 text-green-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">变更已批准</p>
                  <p className="text-xs text-slate-500 mt-1">可继续传输流程</p>
                </div>
              )}
              {changeReviewStatus === "rejected" && (
                <div className="text-center py-6 text-red-500">
                  <XCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">变更被驳回</p>
                  <p className="text-xs text-slate-500 mt-1">请修改后重新提交</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 传输记录查看 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <History className="w-4 h-4" />
          传输记录查看
        </h3>

        {transmissionRecords.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>时间</TableHead>
                <TableHead>操作类型</TableHead>
                <TableHead>涉及零件</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作人</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transmissionRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="text-sm text-slate-600">{record.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{record.parts}</TableCell>
                  <TableCell>
                    {record.status === "success" ? (
                      <Badge className="bg-green-100 text-green-700">成功</Badge>
                    ) : record.status === "pending" ? (
                      <Badge className="bg-amber-100 text-amber-700">处理中</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700">失败</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{record.operator}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <p>暂无传输记录</p>
          </div>
        )}
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
