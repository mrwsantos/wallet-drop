import React from "react";
interface TituloProps {
  titulo: string;
  subtitulo: string;
}

const Titulo = (props: TituloProps) => {
  return (
    <div>
      <h1 className={`font-black text-3xl text-zinc-900 dark:text-zinc-100 capitalize`}>{props.titulo}</h1>
      <h2 className={`font-light text-lg text-zinc-600 dark:text-zinc-300`}>{props.subtitulo}</h2>
    </div>
  );
};

export default Titulo;
