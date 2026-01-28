import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import MainSidebar from "@/components/layout/MainSidebar";
import MainTopbar from "@/components/layout/MainTopbar";
import Dashboard from "@/components/valve/Dashboard";
import HomePage from "@/pages/HomePage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import SafetyValvePage from "@/pages/valve/SafetyValvePage";
import ControlValvePage from "@/pages/valve/ControlValvePage";
import FlangePage from "@/pages/valve/FlangePage";
import MaintenancePage from "@/pages/valve/MaintenancePage";

const breadcrumbMap: Record<string, string> = {
  "/": "首页",
  "/overall/spec": "总体设计 / 设计规范",
  "/overall/frame": "总体设计 / 框架",
  "/overall/tank": "总体设计 / 罐体",
  "/overall/parts": "总体设计 / 部件",
  "/overall/insulation": "总体设计 / 保温＆外包",
  "/overall/protection": "总体设计 / 防腐保护",
  "/overall/quote": "总体设计 / 报价总图",
  "/layout/position": "布局设计 / 位置信息",
  "/layout/check": "布局设计 / 校核信息",
  "/parts-library": "零部件库",
  "/option/valve/safety": "选配设计 / 阀门选型配置器 / 安全阀选配",
  "/option/valve/control": "选配设计 / 阀门选型配置器 / 控制阀选配",
  "/option/valve/flange": "选配设计 / 阀门选型配置器 / 凸缘选配",
  "/option/valve/maintenance": "选配设计 / 阀门选型配置器 / 维护清洗功能",
  "/valve-design": "阀组件设计",
};

const Index = () => {
  const location = useLocation();
  const breadcrumb = breadcrumbMap[location.pathname] || "首页";

  return (
    <AppLayout
      sidebar={<MainSidebar />}
      topbar={<MainTopbar breadcrumb={breadcrumb} />}
    >
      <Dashboard>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* 总体设计 */}
          <Route path="/overall/spec" element={<PlaceholderPage title="设计规范" subtitle="总体设计 - 参数录入" />} />
          <Route path="/overall/frame" element={<PlaceholderPage title="框架" subtitle="总体设计 - 框架配置" />} />
          <Route path="/overall/tank" element={<PlaceholderPage title="罐体" subtitle="总体设计 - 罐体设计" />} />
          <Route path="/overall/parts" element={<PlaceholderPage title="部件" subtitle="总体设计 - 部件管理" />} />
          <Route path="/overall/insulation" element={<PlaceholderPage title="保温＆外包" subtitle="总体设计 - 保温外包配置" />} />
          <Route path="/overall/protection" element={<PlaceholderPage title="防腐保护" subtitle="总体设计 - 防腐保护设计" />} />
          <Route path="/overall/quote" element={<PlaceholderPage title="报价总图" subtitle="总体设计 - 二维图纸" />} />
          
          {/* 布局设计 */}
          <Route path="/layout/position" element={<PlaceholderPage title="位置信息" subtitle="布局设计 - 部件位置配置" />} />
          <Route path="/layout/check" element={<PlaceholderPage title="校核信息" subtitle="布局设计 - 空间校核" />} />
          
          {/* 零部件库 */}
          <Route path="/parts-library" element={<PlaceholderPage title="零部件库" subtitle="标准件/自定义件管理" />} />
          
          {/* 选配设计 - 阀门选型配置器 */}
          <Route path="/option/valve/safety" element={<SafetyValvePage />} />
          <Route path="/option/valve/control" element={<ControlValvePage />} />
          <Route path="/option/valve/flange" element={<FlangePage />} />
          <Route path="/option/valve/maintenance" element={<MaintenancePage />} />
          
          {/* 阀组件设计 */}
          <Route path="/valve-design" element={<PlaceholderPage title="阀组件设计" subtitle="阀门/管路/接口设计" />} />
        </Routes>
      </Dashboard>
    </AppLayout>
  );
};

export default Index;
