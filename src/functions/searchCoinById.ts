export default function searchCoinById(coins: any) {
  if (!coins) return;
  
  const coinsIds = coins.map((coin: any) => coin.id);

  const coinsFetched = coinsIds.map(async (coin: any) => {
    const resp = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
    const coinInfo = await resp.json();
    return coinInfo;
  });

  const dataCoins = Promise.all(coinsFetched).then((result) => {
    return result;
  });

  return dataCoins;
}
