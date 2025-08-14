import type { SelectProps } from "@/lib/interfaces";
import React from "react";

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
}) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-primary-400 font-medium mb-1">{label}</label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-primary-300 rounded text-primary-400 bg-white text-base outline-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
