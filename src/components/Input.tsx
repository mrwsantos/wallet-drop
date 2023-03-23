import React from "react";

interface InputProps {
  value: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  valorMudou: (novoValor: any) => void;
}

const Input = ({
  label,
  type,
  disabled,
  value,
  className,
  placeholder,
  valorMudou,
}: InputProps) => {
  return (
    <label className="flex flex-col mb-2 w-full max-w-2xl">
      <span className="font-semibold text-zinc-700 dark:text-white mb-2">
        {label}
      </span>
      <input
        className={`w-full border text-zinc-700 p-2 disabled:bg-gray-100 ${className} rounded-lg`}
        type={type ?? "text"}
        value={value}
        onChange={(e) => valorMudou?.(e.target.value)}
        disabled={disabled || undefined}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
