import React from "react";
import Layout from "../components/template/Layout";
import useAppData from "../../data/hook/useAppData";

const dashboard = () => {
  const {alternarTema} = useAppData()

  return (
    <Layout
      titulo="dashboard"
      subtitulo="Manage your dashboards">
   
    <h1>Dashboard</h1>
    </Layout>
  );
};

export default dashboard;
