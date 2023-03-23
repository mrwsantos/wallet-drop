import React, { createContext } from "react";

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
  const [carregando, setCarregando] = React.useState(true);
  const [erro, setErro] = React.useState<any>(null);
  const [allCoins, setAllCoins] = React.useState<any>();

  const [totalInvested, setTotalInvested] = React.useState([]);
  const [totalBalanceInvested, setTotalBalanceInvested] = React.useState([]);

  React.useEffect(() => {
    coinsList();
  }, []);

  async function coinsList() {
    let allCoinsOnStorage = window.localStorage.getItem(
      "wallet-drop-all-coins"
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
          "wallet-drop-all-coins",
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
