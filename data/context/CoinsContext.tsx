import React, { createContext, useEffect, useState } from "react";

interface CoinsContextProps {
  allCoins: any;
  coinsList: (msg: string) => void;
  setTotalInvested: any;
  totalInvested: any;
  totalBalanceInvested: any;
  setTotalBalanceInvested: any;
}

const CoinsContext = createContext<CoinsContextProps>({
  allCoins: [],
  coinsList: () => {},
  setTotalInvested: '',
  totalInvested: '',
  totalBalanceInvested: '',
  setTotalBalanceInvested: '',
});

export function CoinProvider(props: any) {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<any>(null);
  const [allCoins, setAllCoins] = useState<any>();

  const [totalInvested, setTotalInvested] = useState([]);
  const [totalBalanceInvested, setTotalBalanceInvested] = useState([]);

  useEffect(() => {
    coinsList();
  }, []);

  async function coinsList() {
    let allCoinsOnStorage = window.localStorage.getItem(
      "wallet-watch-all-coins"
    );

    if (allCoinsOnStorage && allCoinsOnStorage?.length > 0) {
      setAllCoins(JSON.parse(allCoinsOnStorage));
    } else {
      try {
        setCarregando(true);
        const resp = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const coins = await resp.json();
        setAllCoins(coins);
        window.localStorage.setItem(
          "wallet-watch-all-coins",
          JSON.stringify(coins)
        );
      } catch (e: any) {
        throw new Error(`Error: `, e);
      } finally {
        setCarregando(false);
      }
    }
  }

  return (
    <CoinsContext.Provider
      value={{
        coinsList,
        allCoins,
        setTotalInvested,
        totalInvested,
        totalBalanceInvested,
        setTotalBalanceInvested,
      }}
    >
      {props.children}
    </CoinsContext.Provider>
  );
}

export default CoinsContext;
