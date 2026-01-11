export function formatCurrency(amount: number, formatType: "INR"): string {
  if (formatType === "INR") {
    return inrFormatter.format(amount);
  }
  return amount.toString();
}

export const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});
