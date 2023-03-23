import React from "react";
import useAppData from "../../../data/hook/useAppData";
// import forcarAutenticacao from "../../../functions/ForcarAutenticacao";
import ForcarAutenticacao from "../auth/ForcarAutenticacao";
import BotaoAlternarTema from "./BotaoAlternarTema";
import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import MenuLateral from "./MenuLateral";

interface LayoutProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  const { tema, alternarTema } = useAppData();

  // POR FUNCAO
  // return forcarAutenticacao(
  //   <div className={`${tema} flex h-screen w-screen`}>
  //     <MenuLateral />
  //     <div
  //       className={`flex flex-col w-full p-4 md:p-7 bg-zinc-300 dark:bg-zinc-900`}
  //     >
  //       <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
  //       <Conteudo>{props.children}</Conteudo>
  //     </div>
  //   </div>
  // );

  // POR COMPONENTE

  return (
    <ForcarAutenticacao>
      <div className={`${tema} flex min-h-screen`}>
        <MenuLateral />
        <div
          className={`content flex flex-col
            py-4 pr-4 pl-14 md:pl-28
            bg-zinc-300 dark:bg-zinc-900 w-full
            `}
        >
          <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
          <Conteudo>{props.children}</Conteudo>

          <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
        </div>
      </div>
    </ForcarAutenticacao>
  );
}
