import React from "react";

interface InputProps {
  label: string;
  type?: string;
  disabled?: boolean;
  value?: string;
}

const Input = ({ label, type, disabled, value }: InputProps) => {
  const [valueText, setValueText] = React.useState<string>(value ?? "");

  React.useEffect(()=>{
    console.log(valueText);
  },[valueText])

  return (
    <label className="flex flex-col mb-2">
      <span className="font-semibold text-zinc-700 dark:text-white mb-2">{label}</span>
      <input
      className="w-full border text-zinc-700 p-2 disabled:bg-gray-100"
        type={type ?? "text"}
        value={value ?? valueText}
        onChange={(e) => setValueText(e.target.value)}
        disabled={disabled || undefined}
      />
    </label>
  );
};

export default Input;
