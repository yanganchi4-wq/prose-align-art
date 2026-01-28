import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, className, ...props }) => {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-[13px] font-semibold text-foreground/80">
        {label}
      </label>
      <input
        className={cn(
          "w-full px-3.5 py-2.5 border-2 border-foreground/10 rounded-[10px] text-[13px] font-medium transition-all duration-200 bg-white",
          "focus:outline-none focus:border-accent",
          "placeholder:text-foreground/40",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default FormInput;
