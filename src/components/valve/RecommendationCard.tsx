import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Spec {
  label: string;
  value: string;
}

interface RecommendationCardProps {
  title: string;
  specs: Spec[];
  onViewDetails?: () => void;
  onSelect?: () => void;
  selected?: boolean;
  multiSelect?: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  specs,
  onViewDetails,
  onSelect,
  selected = false,
  multiSelect = false,
}) => {
  return (
    <div
      className={cn(
        "bg-white border-2 rounded-xl p-5 transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5 cursor-pointer",
        selected
          ? "border-accent bg-gradient-to-br from-accent/5 to-accent/10"
          : "border-foreground/10"
      )}
      onClick={multiSelect ? onSelect : undefined}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {multiSelect && (
            <Checkbox
              checked={selected}
              onCheckedChange={() => onSelect?.()}
              className="h-5 w-5"
            />
          )}
          <div className="text-[15px] font-bold text-foreground">{title}</div>
        </div>
        <div className="bg-gradient-to-r from-accent to-accent/70 text-white px-2.5 py-1 rounded-full text-[11px] font-bold">
          推荐
        </div>
      </div>

      <div className="mb-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b border-foreground/8 last:border-b-0"
          >
            <span className="text-xs text-foreground/60 font-semibold">
              {spec.label}
            </span>
            <span className="text-xs text-foreground font-semibold">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.();
          }}
        >
          详细参数
        </Button>
        {!multiSelect && (
          <Button
            size="sm"
            className="text-xs bg-gradient-to-r from-accent to-accent/70 hover:shadow-hover"
            onClick={onSelect}
          >
            选择型号
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
