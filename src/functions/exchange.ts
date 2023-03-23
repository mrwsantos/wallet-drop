export default function exchange(valor: number, currency: string = "brl", digits: number = 11) {
  if (currency === "brl") {
    return valor?.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: digits,
    });
  } else {
    return valor?.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: digits,
    });
  }
}
