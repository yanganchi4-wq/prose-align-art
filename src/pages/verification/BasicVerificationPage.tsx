import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search, ArrowRight, List, FileText, Users, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VerificationItemProps {
  label: string;
  status: "pass" | "fail" | "pending";
  note?: string;
}

const VerificationItem: React.FC<VerificationItemProps> = ({ label, status, note }) => {
  const statusConfig = {
    pass: { text: "通过", bg: "bg-gradient-to-r from-emerald-500 to-emerald-400", color: "text-white" },
    fail: { text: "不通过", bg: "bg-gradient-to-r from-red-500 to-red-400", color: "text-white" },
    pending: { text: "待确认", bg: "bg-gradient-to-r from-amber-500 to-amber-400", color: "text-white" },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white p-4 rounded-xl flex items-center justify-between border-2 border-foreground/12 hover:border-accent hover:shadow-[0_4px_12px_rgba(26,163,255,0.15)] transition-all">
      <div className="flex-1">
        <span className="text-sm text-foreground/70 font-medium">{label}</span>
        {note && <p className="text-xs text-foreground/50 mt-1">{note}</p>}
      </div>
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${config.bg} ${config.color} whitespace-nowrap ml-3`}>
        {config.text}
      </span>
    </div>
  );
};

// 个性化要求表数据
const customerRequirements = [
  { customer: "Akmar", requirement: "370/270, 2PTFE, PTFE FV500550FT" },
  { customer: "Bertschi", requirement: "FV 标准配置" },
  { customer: "CONTANK", requirement: "*441$7 特殊阀门" },
  { customer: "CRONOS", requirement: "ITT-PERLOITTLNT-342 配置" },
  { customer: "CSL&CARU", requirement: "CRONOS FP 标准" },
  { customer: "DAELIM", requirement: "strengthen val 368/3220, 底阀加强" },
];

// 大客户标准规范
const majorCustomerSpecs = [
  { 
    name: "Trifleet", 
    standard: "INSULATED UN PORTABLE TANK, TYPE T11/L4BN",
    details: "ASME VIII div.1, EN14025, R36 ISO 1496-3, CSC"
  },
  { 
    name: "Stolt", 
    standard: "CHEMICAL TANK CONTAINER T14",
    details: "IMO Type 1, ADR 6.8, 49CFR 178.274"
  },
  { 
    name: "Hoyer", 
    standard: "GAS TANK CONTAINER T50",
    details: "ASME VIII, EN 13530, ADR/RID"
  },
];

const BasicVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [partNumber, setPartNumber] = useState("");
  const [showCustomerReq, setShowCustomerReq] = useState(false);
  const [showMajorSpecs, setShowMajorSpecs] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

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
        <p className="text-sm font-semibold text-foreground/55">根据总图规范，核实阀件是否满足要求</p>
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

      {/* 零件基础信息 - 核对要点(1)-(5) */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          零件基础信息
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: "主体材料", value: "316L不锈钢" },
            { label: "密封材料", value: "EPDM" },
            { label: "温度范围", value: "-20°C ~ 180°C" },
            { label: "压力等级", value: "10 bar" },
            { label: "法规要求", value: "FDA、3A卫生标准" },
            { label: "罐体材料", value: "316L不锈钢" },
            { label: "表面粗糙度", value: "Ra 0.8" },
            { label: "结构型式", value: "法兰连接" },
            { label: "规格尺寸", value: "DN50" },
            { label: "连接尺寸", value: "PN16" },
            { label: "配件要求", value: "不锈钢螺栓、密封垫片" },
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

        {/* 产品扩展属性 - 介质/UN号 (9) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-blue-800">装载介质</label>
            <input
              type="text"
              value="p-Phenylenediamine"
              readOnly
              className="w-full h-11 px-4 rounded-xl border-2 border-blue-300 bg-white text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-blue-800">UN号</label>
            <input
              type="text"
              value="UN1673, PG II"
              readOnly
              className="w-full h-11 px-4 rounded-xl border-2 border-blue-300 bg-white text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-blue-800">T Code / ADR Code</label>
            <input
              type="text"
              value="T12 / 4BH_L4BH"
              readOnly
              className="w-full h-11 px-4 rounded-xl border-2 border-blue-300 bg-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* 个性化要求表 (5) */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowCustomerReq(!showCustomerReq)}
        >
          <h3 className="text-base font-bold text-foreground flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <Users className="w-4 h-4 text-accent" />
            客户个性化要求表
          </h3>
          {showCustomerReq ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        {showCustomerReq && (
          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-accent/5">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground/70 border-b border-foreground/10">客户名称</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground/70 border-b border-foreground/10">个性化要求</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground/70 border-b border-foreground/10">选择</th>
                  </tr>
                </thead>
                <tbody>
                  {customerRequirements.map((req) => (
                    <tr 
                      key={req.customer} 
                      className={`border-b border-foreground/10 cursor-pointer hover:bg-accent/5 ${selectedCustomer === req.customer ? 'bg-accent/10' : ''}`}
                      onClick={() => setSelectedCustomer(req.customer)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{req.customer}</td>
                      <td className="px-4 py-3 text-sm text-foreground/70">{req.requirement}</td>
                      <td className="px-4 py-3 text-center">
                        <input 
                          type="radio" 
                          name="customer" 
                          checked={selectedCustomer === req.customer}
                          onChange={() => setSelectedCustomer(req.customer)}
                          className="w-4 h-4 accent-accent"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-sm font-semibold text-foreground/80">其他个性化要求</label>
              <textarea
                placeholder="输入客户的其他特殊要求..."
                className="w-full min-h-[80px] px-4 py-3 rounded-xl border-2 border-foreground/12 bg-white text-sm focus:border-accent focus:outline-none transition-all resize-y"
              />
            </div>
          </div>
        )}
      </div>

      {/* 大客户标准规范 */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowMajorSpecs(!showMajorSpecs)}
        >
          <h3 className="text-base font-bold text-foreground flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <FileText className="w-4 h-4 text-accent" />
            大客户标准规范
          </h3>
          {showMajorSpecs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        {showMajorSpecs && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {majorCustomerSpecs.map((spec) => (
              <div 
                key={spec.name}
                className="p-4 rounded-xl border-2 border-foreground/12 hover:border-accent hover:shadow-md transition-all cursor-pointer"
              >
                <div className="font-bold text-accent mb-2">{spec.name}</div>
                <div className="text-sm font-medium text-foreground mb-2">{spec.standard}</div>
                <div className="text-xs text-foreground/60">{spec.details}</div>
                <Button variant="outline" size="sm" className="mt-3 w-full text-xs">
                  查看完整规范
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 额外信息来源 (6)(7)(8) */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          额外信息来源
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border-2 border-dashed border-foreground/20 hover:border-accent transition-all cursor-pointer text-center">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-sm font-semibold text-foreground/80">报价比较</div>
            <div className="text-xs text-foreground/50 mt-1">查看额外要求</div>
          </div>
          <div className="p-4 rounded-xl border-2 border-dashed border-foreground/20 hover:border-accent transition-all cursor-pointer text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-sm font-semibold text-foreground/80">客户资料</div>
            <div className="text-xs text-foreground/50 mt-1">其他提供资料</div>
          </div>
          <div className="p-4 rounded-xl border-2 border-dashed border-foreground/20 hover:border-accent transition-all cursor-pointer text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm font-semibold text-foreground/80">邮件通知</div>
            <div className="text-xs text-foreground/50 mt-1">其他要求</div>
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
          <VerificationItem label="介质兼容性" status="pass" note="主体材料、密封材料与货物兼容" />
          <VerificationItem label="温度压力法规" status="pass" note="满足设计要求" />
          <VerificationItem label="罐体材料一致性" status="pass" note="材料一致，表面粗糙度满足" />
          <VerificationItem label="结构规格尺寸" status="fail" note="连接尺寸与总图规范不符" />
          <VerificationItem label="客户个性化要求" status="pending" note="需确认特殊要求" />
          <VerificationItem label="介质UN号匹配" status="pass" note="UN1673 已确认" />
        </div>
      </div>

      {/* 冲突问题审核 (10)(11)(12) */}
      <div className="relative rounded-[18px] bg-white/86 border border-foreground/12 shadow-card overflow-hidden p-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          冲突问题审核
        </h3>

        <div className="space-y-4">
          {/* 规范审核问题 (10) */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-4">
            <div className="font-bold text-red-800 mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-red-200 rounded text-xs">规范冲突</span>
              连接尺寸不匹配
            </div>
            <div className="text-red-700 text-sm mb-3">零件法兰规格为PN16，但总图要求为PN25，需要使用转接法兰或更换零件规格</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs border-red-300 text-red-700 hover:bg-red-100">
                反馈汇总组
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-red-300 text-red-700 hover:bg-red-100">
                标记已处理
              </Button>
            </div>
          </div>

          {/* 总图审核问题 (11) */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-xl p-4">
            <div className="font-bold text-amber-800 mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-200 rounded text-xs">总图问题</span>
              图面与放大图不一致
            </div>
            <div className="text-amber-700 text-sm mb-3">主视图阀门角度标注与放大详图存在5°偏差，需核实确认</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100">
                查看总图
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100">
                标记已处理
              </Button>
            </div>
          </div>

          {/* 需反馈确认 (12) */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl p-4">
            <div className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-200 rounded text-xs">待确认</span>
              供应商产品确认
            </div>
            <div className="text-blue-700 text-sm mb-3">指定供应商FV暂无满足客户特殊密封要求的产品，需确认替代方案</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100">
                反馈报价组
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100">
                反馈市场部
              </Button>
            </div>
          </div>
        </div>

        {/* 新增冲突记录 */}
        <div className="mt-5 p-4 border-2 border-dashed border-foreground/20 rounded-xl">
          <div className="text-sm font-semibold text-foreground/80 mb-3">新增冲突/问题记录</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select className="h-10 px-3 rounded-lg border-2 border-foreground/12 text-sm focus:border-accent focus:outline-none">
              <option>问题类型</option>
              <option>与总图要求冲突</option>
              <option>与规范要求冲突</option>
              <option>与客户要求冲突</option>
              <option>与法规要求冲突</option>
              <option>介质兼容性问题</option>
              <option>供应商无法提供</option>
              <option>中英文不一致</option>
              <option>描述歧义</option>
              <option>其他</option>
            </select>
            <input 
              type="text" 
              placeholder="问题标题"
              className="h-10 px-3 rounded-lg border-2 border-foreground/12 text-sm focus:border-accent focus:outline-none"
            />
            <input 
              type="text" 
              placeholder="问题描述"
              className="h-10 px-3 rounded-lg border-2 border-foreground/12 text-sm focus:border-accent focus:outline-none md:col-span-1"
            />
            <Button variant="outline" className="h-10">
              添加记录
            </Button>
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
