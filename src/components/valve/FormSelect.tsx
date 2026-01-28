import React from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "请选择...",
  className,
}) => {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-[13px] font-semibold text-foreground/80">
        {label}
      </label>
      <select
        className={cn(
          "w-full px-3.5 py-2.5 border-2 border-foreground/10 rounded-[10px] text-[13px] font-medium transition-all duration-200 bg-white appearance-none",
          "focus:outline-none focus:border-accent",
          "bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M6%208L2%204h8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]",
          className
        )}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
