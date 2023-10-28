import React, { useContext, useEffect, useState } from "react";
import CoinsContext from "../../../data/context/CoinsContext";
import exchange from "../../functions/exchange";
import searchCoinById from "../../functions/searchCoinById";
import { LoadingSmall } from "../../helpers/Loading";
import Button from "../Button";
import { IconAdd, IconDetails, IconSearch } from "../Icons/Index";

interface InvestmentCardProps {
  currencyId: string;
  id?: string;
  transactions: any[];
}

const InvestmentCard = ({ currencyId, transactions }: InvestmentCardProps) => {
  const [coinInfo, setCoinInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  const { setTotalInvested, setTotalBalanceInvested } =
    useContext(CoinsContext);

  let valueInvested: number[] = [];
  let quantityInvested: number[] = [];
  let sell: number[] = [0];

  transactions.forEach(({ type, priceAtDate, quantity }) => {
    if (type === "buy") {
      quantityInvested.push(quantity);
      valueInvested.push(priceAtDate * quantity);
    } else {
      quantityInvested.push(-quantity);
      sell.push(priceAtDate * quantity);
    }
  });

  let invested = valueInvested.reduce((a, b) => a + b);
  let quantity = quantityInvested.reduce((a, b) => a + b);
  let selled = sell.reduce((a, b) => a + b);

  useEffect(() => {
    getCoinInfo();
    setTotalInvested((prev: any) => [...prev, { id: currencyId, invested }]);
  }, []);

  useEffect(() => {
    setTotalBalanceInvested((prev: any) => [
      ...prev,
      { id: currencyId, balance },
    ]);
  }, [balance]);

  useEffect(() => {
    if (!coinInfo) return;
    setBalance(
      coinInfo[0]?.market_data?.current_price.brl * quantity + selled - invested
    );
  }, [coinInfo]);

  async function getCoinInfo() {
    let fetchedCoin;
    try {
      setLoading(true);
      fetchedCoin = await searchCoinById([{ id: currencyId }]);
    } catch (error: any) {
      console.error("error: ", error);
    } finally {
      setLoading(false);
      setCoinInfo(fetchedCoin);
    }
  }

  if (!coinInfo || coinInfo.length <= 0) return <></>;
  return (
    <div
      className={`
      card
      relative
      flex flex-col items-center rounded-lg p-4 
    bg-gray-100 dark:bg-zinc-800 shadow-xl
      focus:outline-2 active:outline-2 duration-200 cursor-pointer
     `}
    >
      <div className="card-header flex items-center w-full gap-4">
        <div className="flex items-center gap-4 w-full">
          <img src={coinInfo[0]?.image?.small} alt="Logo da Moeda" />
          <h1 className="flex items-center mt-2 capitalize font-bold text-zinc-700 dark:text-white text-xl">
            {coinInfo[0]?.name} ({coinInfo[0]?.symbol?.toUpperCase()})
          </h1>
        </div>
        <div className="card-action flex flex-col w-full items-end gap-2">
          <div className="card-prices w-full">
            {loading ? (
              <LoadingSmall />
            ) : (
              <div className="flex flex-col w-full items-end">
                <h3 className="flex items-center text-center font-bold text-3xl text-yellow-500">
                  <span className="live animate-pulse  text-lime-500 rounded-full scale-50 ">
                    ⬤
                  </span>
                  {exchange(coinInfo[0]?.market_data?.current_price.brl)}{" "}
                </h3>
                <h4 className="text-center text-2xl text-zinc-700 dark:text-white">
                  {exchange(coinInfo[0]?.market_data?.current_price.usd, "usd")}
                </h4>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="block p-2
            border border-text-zinc-300
            text-zinc-700 hover:bg-white 
            text-xl capitalize
            "
              bgColor="bg-yellow-500"
              onClick={() =>
                console.log(
                  "ADICIONAR REGISTRO NA CARTEIRA: ",
                  coinInfo[0]?.name
                )
              }
            >
              <IconAdd />
              {/* Add registro */}
            </Button>
            <Button
              className="block p-2
            border border-text-zinc-300
            text-zinc-700 hover:bg-white 
            text-xl capitalize
            "
              bgColor="bg-yellow-500"
              onClick={() => console.log("VER DASHBOARD: ", name)}
            >
              <IconSearch />
              {/* ver detalhes */}
            </Button>
          </div>
        </div>
      </div>
      <br />
      <hr className="mb-2 border-gray-500 w-full" />
      <div className="card-body flex justify-between flex-wrap w-full gap-2 text-xl">
        <h2 className="w-full flex items-center justify-center gap-2 font-bold text-zinc-700 dark:text-white">
          <IconDetails />
          Detalhes
        </h2>
        <div className="card-body-left flex flex-col gap-2">
          <h3 className="font-bold text-zinc-700 dark:text-white">
            Investido Total:{" "}
            <span className="invested-on-wallet text-yellow-500 ml-2">
              {exchange(invested)}
            </span>
          </h3>
          <p className="font-bold text-zinc-700 dark:text-white">
            Quantidade:{" "}
            <span className="text-yellow-500 ml-2">
              {`${quantity}`.replace(".", ",")}
            </span>
          </p>
        </div>
        <div className="card-body-right flex flex-col items-end gap-2">
          {balance < 0 ? (
            <div className="text-red-500 flex flex-col items-end">
              <p>PERDA</p>
              <h3 className="font-bold">{exchange(balance)}</h3>
            </div>
          ) : (
            <div className=" text-lime-500 flex flex-col items-end">
              <p>GANHO</p>
              <h3 className="font-bold">{exchange(balance)}</h3>
            </div>
          )}
        </div>
      </div>

      {/* <div className="w-full text-center">
        <hr className="my-2" />
        <table>
          <thead>
            <th>ok</th>
            <th>ok2</th>
            <th>ok3</th>
          </thead>
          <tbody>
            <tr>
              <td>pora</td>
              <td>meua</td>
              <td>pmigo</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default InvestmentCard;
