import React from "react";
import Layout from "../components/template/Layout";

export default function Home() {
  React.useEffect(()=>{
    console.log('TAMO NA HOME');
  },[])

  return (
    <Layout titulo="Home" subtitulo="Gerencie seus investimentos">
      Conteudo
    </Layout>
  );
}
