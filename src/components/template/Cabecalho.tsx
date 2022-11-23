import React from "react";
import AvatarUsuario from "./AvatarUsuario";
import Titulo from "./Titulo";
interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

const Cabecalho = (props: CabecalhoProps) => {
  return (
    <div className="flex">
      <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
      <div className="flex flex-grow justify-end  items-center gap-4">
        <AvatarUsuario />
      </div>
    </div>
  );
};

export default Cabecalho;
