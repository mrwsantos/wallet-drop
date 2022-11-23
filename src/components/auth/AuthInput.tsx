import React from "react";

interface AuthInputProps {
  label: string;
  valor: any;
  tipo: "text" | "email" | "password";
  obrigatorio?: boolean;
  valorMudou: (novoValor: any) => void;
}

const AuthInput = (props: AuthInputProps) => {
  return (
    <div>
      <label className="flex flex-col mt-4">
        <span className="font-bold text-zinc-700">{props.label}</span>
        <input
          type={props.tipo ?? "text"}
          value={props.valor}
          onChange={(e) => props.valorMudou?.(e.target.value)}
          required={props.obrigatorio}
          className="
        px-4 py-3 rounded-lg 
        bg-zinc-200 mt-2 border-2 border-transparent focus:border-zinc-800 focus:outline-none focus:bg-white
        "
        />
      </label>
    </div>
  );
};

export default AuthInput;
