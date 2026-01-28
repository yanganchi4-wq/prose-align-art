import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Dashboard from "@/components/valve/Dashboard";
import SafetyValveStep from "@/components/valve/steps/SafetyValveStep";
import ControlValveStep from "@/components/valve/steps/ControlValveStep";
import FlangeStep from "@/components/valve/steps/FlangeStep";
import MaintenanceStep from "@/components/valve/steps/MaintenanceStep";

const stepNames: Record<number, string> = {
  1: "安全阀选配",
  2: "控制阀选配",
  3: "凸缘选配",
  4: "维护清洗功能",
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedModels, setSelectedModels] = useState<{
    safetyValve: string | null;
    controlValve: string | null;
    flange: string | null;
    maintenance: string | null;
  }>({
    safetyValve: null,
    controlValve: null,
    flange: null,
    maintenance: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < 4) {
      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleModelSelect = useCallback(
    (type: "safetyValve" | "controlValve" | "flange" | "maintenance", model: string) => {
      setSelectedModels((prev) => ({ ...prev, [type]: model }));
      toast.success(`已选择: ${model}`);
    },
    []
  );

  const handleFinish = useCallback(() => {
    const summary = `配置完成！

已选配置：
- 安全阀: ${selectedModels.safetyValve || "未选择"}
- 控制阀: ${selectedModels.controlValve || "未选择"}
- 凸缘: ${selectedModels.flange || "未选择"}
- 维护清洗: ${selectedModels.maintenance || "未选择"}

感谢使用阀门选型配置器！我们将根据您的选择为您提供详细的技术方案和报价。`;

    toast.success("配置已提交！");
    alert(summary);
  }, [selectedModels]);

  const breadcrumb = `选配设计 / 阀门类型选配器 / ${stepNames[currentStep]}`;
  const stepIndicator = `步骤 ${currentStep}/4`;

  return (
    <AppLayout
      sidebar={
        <Sidebar
          currentStep={currentStep}
          onStepChange={handleStepChange}
          completedSteps={completedSteps}
        />
      }
      topbar={<Topbar breadcrumb={breadcrumb} stepIndicator={stepIndicator} />}
    >
      <Dashboard>
        {currentStep === 1 && (
          <SafetyValveStep
            onNext={handleNext}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onModelSelect={(model) => handleModelSelect("safetyValve", model)}
          />
        )}
        {currentStep === 2 && (
          <ControlValveStep
            onNext={handleNext}
            onPrev={handlePrev}
            onModelSelect={(model) => handleModelSelect("controlValve", model)}
          />
        )}
        {currentStep === 3 && (
          <FlangeStep
            onNext={handleNext}
            onPrev={handlePrev}
            selectedSafetyValve={selectedModels.safetyValve}
            selectedControlValve={selectedModels.controlValve}
            onModelSelect={(model) => handleModelSelect("flange", model)}
          />
        )}
        {currentStep === 4 && (
          <MaintenanceStep
            onPrev={handlePrev}
            onFinish={handleFinish}
            onModelSelect={(model) => handleModelSelect("maintenance", model)}
          />
        )}
      </Dashboard>
    </AppLayout>
  );
};

export default Index;
