import React, { useEffect, useState } from "react";
import InvestmentCard from "../components/template/InvestmentCard";
import Layout from "../components/template/Layout";
import useGetDataFromDB from "../helpers/hooks/useGetDataFromDB";

interface ResponseData {
  response: { id: string }[];
}


export default function Home() {
  const { request } = useGetDataFromDB("myWalletCurrencies");
  const [cardsInvestments, setCardsInvestments] = useState<any[]>();

  useEffect(() => {
    async function fetchDataFromDB() {
      const { response } = await request() as ResponseData;
      setCardsInvestments(response);
    }
    fetchDataFromDB();
  }, [request]);

  return (
    <Layout titulo="My Wallet" subtitulo="Manage your investments">
      <main className="section grid gap-2 md:gap-4 grid-cols-1 lg:grid-cols-2">
        {cardsInvestments?.map((card) => (
          <InvestmentCard
            key={card.currencyId}
            currencyId={card.currencyId}
            transactions={card.transactions}
          />
        ))}
      </main>
    </Layout>
  );
}
