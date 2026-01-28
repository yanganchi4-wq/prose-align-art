import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import MainSidebar from "@/components/layout/MainSidebar";
import MainTopbar from "@/components/layout/MainTopbar";
import Dashboard from "@/components/valve/Dashboard";
import HomePage from "@/pages/HomePage";

// 总体设计
import SpecPage from "@/pages/overall/SpecPage";
import FramePage from "@/pages/overall/FramePage";
import TankPage from "@/pages/overall/TankPage";
import PartsPage from "@/pages/overall/PartsPage";
import InsulationPage from "@/pages/overall/InsulationPage";
import ProtectionPage from "@/pages/overall/ProtectionPage";
import QuotePage from "@/pages/overall/QuotePage";

// 布局设计
import PositionPage from "@/pages/layout/PositionPage";
import CheckPage from "@/pages/layout/CheckPage";

// 其他页面
import PartsLibraryPage from "@/pages/PartsLibraryPage";
import ValveDesignPage from "@/pages/ValveDesignPage";

// 选配设计 - 阀门选型配置器
import SafetyValvePage from "@/pages/valve/SafetyValvePage";
import ControlValvePage from "@/pages/valve/ControlValvePage";
import FlangePage from "@/pages/valve/FlangePage";
import MaintenancePage from "@/pages/valve/MaintenancePage";

// 选配设计 - 阀组件设计校核
import BasicVerificationPage from "@/pages/verification/BasicVerificationPage";
import PositioningPage from "@/pages/verification/PositioningPage";
import ProcurementPage from "@/pages/verification/ProcurementPage";
import ComponentDrawingPage from "@/pages/verification/ComponentDrawingPage";
import OrderMemoPage from "@/pages/verification/OrderMemoPage";

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
  "/option/verification/basic": "选配设计 / 阀组件设计校核 / 基础信息核对",
  "/option/verification/positioning": "选配设计 / 阀组件设计校核 / 阀件定位与核阀图",
  "/option/verification/procurement": "选配设计 / 阀组件设计校核 / 录入预采购传输",
  "/option/verification/component-drawing": "选配设计 / 阀组件设计校核 / 阀件组件图",
  "/option/verification/order-memo": "选配设计 / 阀组件设计校核 / 订单备忘",
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
          <Route path="/overall/spec" element={<SpecPage />} />
          <Route path="/overall/frame" element={<FramePage />} />
          <Route path="/overall/tank" element={<TankPage />} />
          <Route path="/overall/parts" element={<PartsPage />} />
          <Route path="/overall/insulation" element={<InsulationPage />} />
          <Route path="/overall/protection" element={<ProtectionPage />} />
          <Route path="/overall/quote" element={<QuotePage />} />
          
          {/* 布局设计 */}
          <Route path="/layout/position" element={<PositionPage />} />
          <Route path="/layout/check" element={<CheckPage />} />
          
          {/* 零部件库 */}
          <Route path="/parts-library" element={<PartsLibraryPage />} />
          
          {/* 选配设计 - 阀门选型配置器 */}
          <Route path="/option/valve/safety" element={<SafetyValvePage />} />
          <Route path="/option/valve/control" element={<ControlValvePage />} />
          <Route path="/option/valve/flange" element={<FlangePage />} />
          <Route path="/option/valve/maintenance" element={<MaintenancePage />} />
          
          {/* 选配设计 - 阀组件设计校核 */}
          <Route path="/option/verification/basic" element={<BasicVerificationPage />} />
          <Route path="/option/verification/positioning" element={<PositioningPage />} />
          <Route path="/option/verification/procurement" element={<ProcurementPage />} />
          <Route path="/option/verification/component-drawing" element={<ComponentDrawingPage />} />
          <Route path="/option/verification/order-memo" element={<OrderMemoPage />} />
          
          {/* 阀组件设计 */}
          <Route path="/valve-design" element={<ValveDesignPage />} />
        </Routes>
      </Dashboard>
    </AppLayout>
  );
};

export default Index;
