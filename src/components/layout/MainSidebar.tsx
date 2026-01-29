import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Home, Layers, LayoutGrid, Package, Settings, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    key: "home",
    label: "首页",
    icon: <Home className="w-[18px] h-[18px]" />,
    path: "/",
  },
  {
    key: "overall",
    label: "总体设计",
    icon: <Layers className="w-[18px] h-[18px]" />,
    children: [
      { key: "spec", label: "设计规范", path: "/overall/spec", icon: null },
      { key: "frame", label: "框架", path: "/overall/frame", icon: null },
      { key: "tank", label: "罐体", path: "/overall/tank", icon: null },
      { key: "parts", label: "部件", path: "/overall/parts", icon: null },
      { key: "insulation", label: "保温＆外包", path: "/overall/insulation", icon: null },
      { key: "protection", label: "防腐保护", path: "/overall/protection", icon: null },
      { key: "quote", label: "报价总图", path: "/overall/quote", icon: null },
    ],
  },
  {
    key: "layout",
    label: "布局设计",
    icon: <LayoutGrid className="w-[18px] h-[18px]" />,
    children: [
      { key: "position", label: "位置信息", path: "/layout/position", icon: null },
      { key: "check", label: "校核信息", path: "/layout/check", icon: null },
    ],
  },
  {
    key: "partsLib",
    label: "零部件库",
    icon: <Package className="w-[18px] h-[18px]" />,
    path: "/parts-library",
  },
  {
    key: "option",
    label: "选配设计",
    icon: <Settings className="w-[18px] h-[18px]" />,
    children: [
      {
        key: "valve-config",
        label: "阀门选型配置器",
        icon: null,
        children: [
          { key: "safety-valve", label: "安全阀选配", path: "/option/valve/safety", icon: null },
          { key: "control-valve", label: "控制阀选配", path: "/option/valve/control", icon: null },
          { key: "flange", label: "凸缘选配", path: "/option/valve/flange", icon: null },
          { key: "maintenance", label: "维护清洗功能", path: "/option/valve/maintenance", icon: null },
        ],
      },
      {
        key: "verification",
        label: "阀组件设计校核",
        icon: null,
        children: [
          { key: "basic-verification", label: "基础信息核对", path: "/option/verification/basic", icon: null },
          { key: "positioning", label: "阀件定位与核阀图", path: "/option/verification/positioning", icon: null },
          { key: "procurement", label: "录入预采购传输", path: "/option/verification/procurement", icon: null },
          { key: "component-drawing", label: "阀件组件图", path: "/option/verification/component-drawing", icon: null },
          { key: "order-memo", label: "订单备忘", path: "/option/verification/order-memo", icon: null },
        ],
      },
    ],
  },
  {
    key: "valve",
    label: "阀组件设计",
    icon: <Wrench className="w-[18px] h-[18px]" />,
    children: [
      { key: "valve-design-main", label: "阀组件总览", path: "/valve-design", icon: null },
      { key: "parts-recommendation", label: "智能零件推荐", path: "/valve-design/parts-recommendation", icon: null },
    ],
  },
];

const MainSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["option", "valve-config", "verification", "valve"]);

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const isActive = (path?: string) => path && location.pathname === path;
  
  const isGroupActive = (item: NavItem): boolean => {
    if (item.path && location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some((child) => isGroupActive(child));
    }
    return false;
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedGroups.includes(item.key);
    const active = isActive(item.path);
    const groupActive = isGroupActive(item);

    const paddingLeft = level === 0 ? "px-2.5" : level === 1 ? "pl-8" : "pl-12";

    if (hasChildren) {
      return (
        <div key={item.key}>
          <div
            className={cn(
              "flex items-center gap-2.5 py-2.5 rounded-xl cursor-pointer select-none transition-all duration-150",
              paddingLeft,
              "hover:bg-white/10 hover:translate-x-0.5",
              groupActive && "bg-accent/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            )}
            onClick={() => toggleGroup(item.key)}
          >
            {item.icon && <span className="opacity-95">{item.icon}</span>}
            <span className={cn("text-sm font-medium", level > 0 && "text-[13px]")}>
              {item.label}
            </span>
            <ChevronRight
              className={cn(
                "w-3 h-3 ml-auto transition-transform duration-300",
                isExpanded && "rotate-90"
              )}
            />
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isExpanded ? "max-h-[800px]" : "max-h-0"
            )}
          >
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </div>
        </div>
      );
    }

    return (
      <div
        key={item.key}
        className={cn(
          "flex items-center gap-2.5 py-2 rounded-xl cursor-pointer select-none transition-all duration-150",
          paddingLeft,
          "hover:bg-white/10 hover:translate-x-0.5",
          active && "bg-accent/18"
        )}
        onClick={() => item.path && navigate(item.path)}
      >
        {level === 0 && item.icon && <span className="opacity-95">{item.icon}</span>}
        {level > 0 && (
          <span
            className={cn(
              "w-2 h-2 rounded-full bg-sidebar-foreground/70 shadow-[0_0_0_2px_rgba(26,163,255,0.18)]",
              active && "bg-accent"
            )}
          />
        )}
        <span className={cn("text-sm font-medium", level > 0 && "text-[13px]")}>
          {item.label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2.5 pb-3.5 pt-2.5 border-b border-white/10 mb-2.5">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-[radial-gradient(circle_at_35%_35%,_#bfe8ff,_#4cc1ff_40%,_#0e7ad6_70%,_#0a5aa3)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] flex-shrink-0" />
        <div>
          <h1 className="text-sm font-bold tracking-wide leading-tight">
            罐箱产品AI辅助设计系统平台
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-1.5 overflow-y-auto scrollbar-thin flex-1">
        {navItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Decorative glow */}
      <svg
        className="absolute -left-[240px] -bottom-[260px] w-[520px] opacity-35 pointer-events-none"
        viewBox="0 0 600 600"
      >
        <defs>
          <radialGradient id="sidebar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6ec7ff" stopOpacity="1" />
            <stop offset="45%" stopColor="#1aa3ff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#0b2f4a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="260" fill="url(#sidebar-glow)" />
      </svg>
    </div>
  );
};

export default MainSidebar;
