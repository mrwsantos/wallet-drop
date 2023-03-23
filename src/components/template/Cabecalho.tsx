import React, { useContext } from "react";
import CoinsContext from "../../../data/context/CoinsContext";
import exchange from "../../functions/exchange";
import AvatarUsuario from "./AvatarUsuario";
import Titulo from "./Titulo";
interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

const Cabecalho = (props: CabecalhoProps) => {
  const { totalInvested, totalBalanceInvested } = useContext(CoinsContext);

  const [totalInvestedOnWallet, setTotalInvestedOnWallet] =
    React.useState<number>(0);
  const [totalBalanceOnWallet, setTotalBalanceOnWallet] =
    React.useState<number>(0);

  React.useEffect(() => {
    let uniqueObject = (a: any) =>
      [...new Set(a.map((o: any) => JSON.stringify(o)))].map((s: any) =>
        JSON.parse(s)
      );
    // console.log("AKA: ", treatedData(totalInvested));

    let treatedInvested = uniqueObject(totalInvested);
    let calcInvested: number = 0;
    treatedInvested.map((data: any) => {
      calcInvested += data.invested;
    });
    setTotalInvestedOnWallet(calcInvested);
    let treatedBalanceInvested = uniqueObject(totalBalanceInvested);
    let calcBalanceInvested: number = 0;
    treatedBalanceInvested.map((data: any) => {
      calcBalanceInvested += data.balance;
    });
    setTotalBalanceOnWallet(calcBalanceInvested);
  }, [totalInvested, totalBalanceInvested]);

  return (
    <div className="flex flex-col-reverse sm:flex-row">
      <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
      <div className="flex flex-grow justify-center sm:justify-end items-center gap-4">
        <div className="flex gap-4 items-center justify-center sm:justify-end w-full border-b mb-4 pb-4 sm:border-none sm:m-0 sm:pb-0">
          <div className="flex flex-col items-center justify-center font-bold  dark:text-white">
            <p className="  text-center">Total Investido</p>
            <span className="text-2xl">
              {exchange(totalInvestedOnWallet, "brl", 2)}
            </span>
          </div>
          <div className="flex flex-col font-bold items-center justify-center dark:text-white">
            <p className="  text-center">Balanço Geral</p>
            {totalBalanceOnWallet < 0 ? (
              <span className="text-2xl text-red-500">
                {exchange(totalBalanceOnWallet, "brl", 2)}
              </span>
            ) : (
              <span className="text-2xl text-lime-500">
                + {exchange(totalBalanceOnWallet, "brl", 2)}
              </span>
            )}
          </div>
        </div>
        <AvatarUsuario />
      </div>
    </div>
  );
};

export default Cabecalho;
