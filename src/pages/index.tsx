import React, { useEffect, useState } from "react";
import InvestmentCard from "../components/template/InvestmentCard";
import Layout from "../components/template/Layout";
import useGetDataFromDB from "../helpers/hooks/useGetDataFromDB";

export default function Home() {
  const { request } = useGetDataFromDB("myWalletCurrencies");
  const [cardsInvestments, setCardsInvestments] = useState<any[]>();

  useEffect(() => {
    async function fetchDataFromDB() {
      const { response } = await request();
      setCardsInvestments(response);
    }
    fetchDataFromDB();
  }, [request]);

  useEffect(()=>{
    renderInvestmentCards()
  },[cardsInvestments])


  function renderInvestmentCards() {
    return cardsInvestments?.map((card) => {
      return (
        <InvestmentCard
          currencyId={card.currencyId}
          transactions={card.transactions}
        />
      );
    })
  }
  
  return (
    <Layout titulo="Minha Carteira" subtitulo="Gerencie seus investimentos">
      <main className="section grid gap-2 md:gap-4 grid-cols-1 lg:grid-cols-2">
        {renderInvestmentCards()}
      </main>
    </Layout>
  );
}
