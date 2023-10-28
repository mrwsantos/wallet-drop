import React from "react";
import exchange from "../../functions/exchange";
import Button from "../Button";
import { IconAdd, IconDown, IconUp } from "../Icons/Index";

interface CardCoinProps {
  index: number;
  name: string;
  symbol: string;
  image: string;
  price: any;
  min24: number;
  max24: number;
}

const CardCoin = ({
  index,
  name,
  symbol,
  image,
  price,
  min24,
  max24,
}: CardCoinProps) => {
  const priceBrl = exchange(price?.brl, "brl");
  const priceUsd = exchange(price?.usd, "usd");
  const min24Brl = exchange(min24, "brl");
  const max24Brl = exchange(max24, "brl");

  const percentage = (price?.brl * 100) / min24 - 100 || false;

  return (
    <div
      className="
      relative
      flex flex-col items-center rounded-lg bg-gray-100 p-2 pt-4 dark:bg-zinc-800 shadow-xl
      hover:scale-90 focus:scale-90 focus:outline-2 active:scale-90 active:outline-2 duration-200 cursor-pointer
      "
      key={index}
    >
      <Button
        className="absolute top-2 right-2 scale-150 text-zinc-500 dark:text-zinc-300 hover:text-yellow-500"
        bgColor="bg-transparent"
        onClick={() => console.log("ADICIONAR REGISTRO NA CARTEIRA: ", name)}
      >
        <IconAdd />
      </Button>
      <img src={image} alt="Logo da Moeda" />
      <h1 className="flex items-center mt-2 capitalize font-bold text-zinc-700 dark:text-white text-xl">
        {name}
        <span className="ml-1 font-normal uppercase text-zinc-700 dark:text-white">
          ({symbol})
        </span>
      </h1>
      <br />
      <h2 className="text-center font-bold text-3xl text-yellow-500">
        {priceBrl}
      </h2>
      <h3 className="text-center text-2xl text-zinc-700 dark:text-white">
        {priceUsd}
      </h3>
      <div className="w-full text-center">
        <hr className="my-2" />
        <p className="font-bold uppercase">Ultimas 24h</p>
        <div className="flex items-center justify-between">
          {min24Brl && (
            <span className="flex flex-col items-center tracking-wide">
              Min
              <span className="-rotate-45 text-red-500">
                <IconDown />
              </span>
              {min24Brl}
            </span>
          )}
          {percentage && (
            <span className="flex flex-col items-center text-lg tracking-wide">
              Variação
              <div
                className={`${
                  percentage < 0 ? "text-red-500" : "text-lime-500"
                }`}
              >
                {percentage.toFixed(3).replace(".", ",")} %
              </div>
            </span>
          )}
          {max24Brl && (
            <span className="flex flex-col items-center tracking-wide">
              Max
              <span className="rotate-45 text-lime-500">
                <IconUp />
              </span>
              {max24Brl}
            </span>
          )}
          {!min24Brl && !max24Brl && !percentage && (
            <p className="text-center mx-auto mt-6 text-zinc-400">
              INFORMAÇÕES NÃO DISPONÍVEIS
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCoin;
