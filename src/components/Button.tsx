import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: any;
  className?: string;
  bgColor?: string;
  color?: string;
  disabled?: boolean
}

const Button = ({
  bgColor = "bg-yellow-500",
  children,
  className,
  color = "text-zinc-800",
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`
    flex items-center justify-center gap-2 flex-row-reverse
    border-2 border-transparent
    hover:border-zinc-800
    ${color} ${bgColor} 
    disabled:bg-gray-300
    rounded-lg font-semibold text-lg capitalize ${className}
    `}
      onClick={onClick}
      disabled={disabled || undefined}
    >
      {children}
    </button>
  );
};

export default Button;
