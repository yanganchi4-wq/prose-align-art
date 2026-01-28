import React from "react";
import { ChevronRight, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
}

interface SidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  completedSteps: number[];
}

const steps: Step[] = [
  { id: 1, name: "安全阀选配" },
  { id: 2, name: "控制阀选配" },
  { id: 3, name: "凸缘选配" },
  { id: 4, name: "维护清洗功能" },
];

const Sidebar: React.FC<SidebarProps> = ({
  currentStep,
  onStepChange,
  completedSteps,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(true);
  const [subMenuOpen, setSubMenuOpen] = React.useState(true);

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2.5 pb-3.5 pt-2.5 border-b border-white/10 mb-2.5">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-[radial-gradient(circle_at_35%_35%,_#bfe8ff,_#4cc1ff_40%,_#0e7ad6_70%,_#0a5aa3)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] flex-shrink-0" />
        <div>
          <h1 className="text-sm font-bold tracking-wide leading-tight">
            阀门选型配置器
          </h1>
          <small className="block opacity-75 font-semibold text-xs mt-0.5">
            Valve Configurator
          </small>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5 px-1.5">
        {/* Main Menu Item */}
        <div
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl cursor-pointer select-none transition-all duration-150",
            "hover:bg-white/10 hover:translate-x-0.5",
            menuOpen && "bg-accent/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Grid3X3 className="w-[18px] h-[18px] opacity-95" />
          <span className="text-sm font-medium">选配设计</span>
          <ChevronRight
            className={cn(
              "w-3 h-3 ml-auto transition-transform duration-300",
              menuOpen && "rotate-90"
            )}
          />
        </div>

        {/* Sub Menu */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 pl-2",
            menuOpen ? "max-h-[800px]" : "max-h-0"
          )}
        >
          {/* Sub Item */}
          <div
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] cursor-pointer select-none transition-all duration-150 text-[13px] mt-1",
              "hover:bg-white/8 hover:translate-x-0.5",
              subMenuOpen && "bg-accent/18"
            )}
            onClick={() => setSubMenuOpen(!subMenuOpen)}
          >
            <span>阀门类型选配器</span>
            <ChevronRight
              className={cn(
                "w-2.5 h-2.5 ml-auto transition-transform duration-300",
                subMenuOpen && "rotate-90"
              )}
            />
          </div>

          {/* Steps */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 pl-2",
              subMenuOpen ? "max-h-[600px]" : "max-h-0"
            )}
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-[7px] mt-[3px] rounded-lg cursor-pointer select-none transition-all duration-150 text-xs",
                  "hover:bg-white/6 hover:translate-x-0.5",
                  currentStep === step.id && "bg-accent/15",
                  completedSteps.includes(step.id) && currentStep !== step.id && "opacity-75"
                )}
                onClick={() => onStepChange(step.id)}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-semibold text-[11px] flex-shrink-0",
                    currentStep === step.id && "bg-accent text-primary-foreground",
                    completedSteps.includes(step.id) && currentStep !== step.id && "bg-success"
                  )}
                >
                  {step.id}
                </div>
                <span>{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
