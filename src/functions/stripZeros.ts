export default function stripZeros(valor: string) {
  return valor?.replace(/(^0+(?=\d))|(,?0+$)/g, "");
}