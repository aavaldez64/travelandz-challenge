export function parseCurrencyAmount(
  amount: number,
  currencyId: string = "EUR"
): string {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: currencyId,
  }).format(amount);
}
