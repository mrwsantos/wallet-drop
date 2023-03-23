import React from "react";
import { IconMoon, IconSun } from "../Icons/Index";

interface BotaoAlternarTemaProps {
  tema: string;
  alternarTema: () => void;
}

const BotaoAlternarTema = (props: BotaoAlternarTemaProps) => {
  return props.tema === "dark" ? (
    <div
      onClick={props.alternarTema}
      className={`
    hidden sm:flex items-center cursor-pointer
    bg-transparent border-2 border-white
    w-10 h-6 p-1 rounded-full
    fixed bottom-4 right-4
    `}
    >
      <div
        className={`
      flex items-center justify-center
      text-white 
      w-4 h-4 rounded-full
      `}
      >
        <IconSun />
      </div>
    </div>
  ) : (
    <div
      onClick={props.alternarTema}
      className={` hidden sm:flex items-center justify-end cursor-pointer
      bg-transaparent border-2 border-zinc-700
      w-10 h-6 p-1 rounded-full
    fixed bottom-4 right-4

    `}
    >
      <div
        className={`flex items-center justify-center text-zinc-700 w-4 h-4 rounded-full `}
      >
        <IconMoon />
      </div>
    </div>
  );
};

export default BotaoAlternarTema;
