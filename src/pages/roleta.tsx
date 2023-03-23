// import React, { useState } from "react";
// import Layout from "../components/template/Layout";

// import { Wheel } from "react-custom-roulette";

// const data = [
//   {
//     option: "10% OFF",
//     style: { backgroundColor: "gold" },
//   },
//   { option: "20% OFF", style: { backgroundColor: "white" } },
//   {
//     option: "30% OFF",
//     style: { backgroundColor: "gold" },
//   },
//   { option: "40% OFF", style: { backgroundColor: "white" } },
//   { option: "50% OFF", style: { backgroundColor: "gold" } },
//   { option: "60% OFF", style: { backgroundColor: "white" } },
// ];

// const Roleta = () => {
//   // const [data, setData] = React.useState([]);

//   // if (data.length <= 0) return <></>;

//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);

//   const handleSpinClick = () => {
//     const newPrizeNumber = Math.floor(Math.random() * data.length);
//     setPrizeNumber(newPrizeNumber);
//     setMustSpin(true);
//   };

//   React.useEffect(() => {
//     renderRoleta();
//   }, []);

//   React.useEffect(() => {
//     console.log("AKA: ", prizeNumber);
//   }, [prizeNumber]);

//   function renderRoleta() {
//     return (
//       <Wheel
//         mustStartSpinning={mustSpin}
//         prizeNumber={prizeNumber}
//         data={data}
//         onStopSpinning={() => {
//           setMustSpin(false);
//           console.log(
//             "PARABENS! você ganhou : ",
//             data[prizeNumber].option,
//             "!"
//           );
//         }}
//       />
//     );
//   }

//   return (
//     <Layout titulo="Minha Carteira" subtitulo="Gerencie seus investimentos">
//       <main className="section grid gap-2 md:gap-4 grid-cols-1 lg:grid-cols-2">
//         {renderRoleta()}
//         <button onClick={handleSpinClick}>Girar roleta</button>
//       </main>
//     </Layout>
//   );
// };

// export default Roleta;
