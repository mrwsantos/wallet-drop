import React, { useContext, useEffect, useState } from "react";
import CoinsContext from "../../../data/context/CoinsContext";
import Button from "../../components/Button";
import {
  IconLoading,
  IconRefresh,
  IconWarning,
} from "../../components/Icons/Index";
import Input from "../../components/Input";
import CardCoin from "../../components/template/CardCoin";
import Layout from "../../components/template/Layout";
import searchCoinById from "../../functions/searchCoinById";
import ToastInfo, { ToastInfoProps } from "../../helpers/ToastInfo";

// MAIN COINS
const mainCoins = [
  { id: "bitcoin" },
  { id: "ethereum" },
  { id: "tether" },
  { id: "binancecoin" },
  { id: "cardano" },
  { id: "ripple" },
  { id: "solana" },
  { id: "dogecoin" },
  { id: "dai" },
  { id: "polkadot" },
  { id: "tron" },
  { id: "api3" },
  // { id: "leo" },
  { id: "shiba-inu" },
  { id: "wrapped-bitcoin" },
  // { id: "avalanche-2" },
  // { id: "litecoin" },
  { id: "uniswap" },
  { id: "matic-network" },
];

const moedas = () => {
  const [mainCoinsInfo, setMainCoinsInfo] = useState<any[]>([]);
  const [searchCoins, setSearchCoins] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorGetCoins, setErrorGetCoins] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastInfoProps>();

  const { allCoins } = useContext(CoinsContext);

  useEffect(() => {
    getMainCoins();
  }, []);

  async function getMainCoins() {
    setLoading(true);
    setSearchCoins("");
    setErrorGetCoins(false)
    try {
      const fetchedCoins = await searchCoinById(mainCoins);
      if (fetchedCoins) setMainCoinsInfo(fetchedCoins);
    } catch (e: any) {
      setMainCoinsInfo(mainCoins);
      setErrorGetCoins(true)
      throw new Error(
        "Erro na requisição. Tente novamente mais tarde! ERR #",
        e
      );
    } finally {
      setLoading(false);
    }
  }

  function filterCoins() {
    if (searchCoins.length <= 0) {
      getMainCoins();
    } else {
      let coinsFiltered = mainCoinsInfo.filter((coin) => {
        return JSON.stringify(coin.name)
          .toLowerCase()
          .includes(searchCoins.toLowerCase());
      });
      setMainCoinsInfo(coinsFiltered);
    }
  }

  useEffect(() => {
    filterCoins();
  }, [searchCoins]);

  async function handleWithSearch() {
    let filteredCoins = allCoins.filter(
      (coin: any) =>
        coin.name.toLowerCase().indexOf(searchCoins.toLocaleLowerCase()) !== -1
    );

    if (searchCoins.length < 3 || filteredCoins.length >= 30) {
      let randomize = Math.random();
      setToast({
        randomize,
        type: "error",
        message: ":( Busca sem resultados. Seja mais específico.",
      });
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const fetchedCoins = await searchCoinById(filteredCoins);
      if (fetchedCoins) setMainCoinsInfo(fetchedCoins);
    } catch (error: any) {
      setError(true);
      let randomize = Math.random();
      setToast({
        randomize,
        time: 10000,
        type: "warning",
        message:
          "Wow, Wow! Vá com calma, amigão! Houveram muitas requisições em tão pouco tempo. Tome uma água enquanto isso.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout
      titulo="Moedas"
      subtitulo="Veja as cotações atuais das principais moedas"
    >
      <div
        className="
      search w-full 
      flex flex-col md:flex-row items-center 
      mb-10
      relative
      "
      >
        {errorGetCoins && <p>Não foi possível buscar moedas, tente novamente mais tarde.</p>}
        {searchCoins.length > 0 && (
          <p className="informativo text-red-700 dark:text-yellow-500 block w-full mb-4 md:absolute -top-6">
            ** Para filtrar pelas principais moedas, digite algo. Para encontrar
            uma que não se encontra na lista, digite um nome e clique no botão
            busca.
          </p>
        )}
        <div className="flex items-center w-full">
          <Input
            className="rounded-lg"
            value={searchCoins}
            valorMudou={setSearchCoins}
            placeholder="Busque por alguma moeda."
          />
          <Button
            className="w-20 ml-4 h-10 p-2"
            onClick={() => handleWithSearch()}
          >
            Busca
          </Button>
        </div>
        <Button
          className="ml-4 h-10 p-2 !w-fit mt-4 md:mt-0
          flex items-center flex-nowrap !flex-row whitespace-nowrap
          "
          onClick={() => getMainCoins()}
        >
          Atualizar Principais Moedas
          <IconRefresh />
        </Button>
      </div>

      {loading ? (
        <IconLoading />
      ) : (
        <div
          className="grid gap-2 grid-cols-1 
        sm:grid-cols-2 
        md:gap-4
        lg:grid-cols-4
        "
        >
          {mainCoinsInfo.map((coin, idx) => {
            let price = coin.market_data?.current_price;
            let min24 = coin.market_data?.low_24h.brl;
            let max24 = coin.market_data?.high_24h.brl;
            return (
              <CardCoin
                key={idx}
                index={idx}
                name={coin.name}
                symbol={coin.symbol}
                image={coin.image?.small ?? ""}
                price={price}
                min24={min24}
                max24={max24}
                // description={coin?.description.en}
              />
            );
          })}
        </div>
      )}

      {mainCoinsInfo.length <= 0 && (
        <div className="text-center mx-auto p-4 flex items-center gap-2">
          <IconWarning /> <p>NADA PARA SE EXIBIR AQUI</p>
        </div>
      )}

      {error && toast && (
        <ToastInfo
          randomize={toast?.randomize}
          type={toast?.type}
          message={toast?.message}
          errorId={toast?.errorId}
        />
      )}
    </Layout>
  );
};

export default moedas;
