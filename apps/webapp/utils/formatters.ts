export function formatCurrency(amount: number, formatType: "INR"): string {
  if (formatType === "INR") {
    return inrFormatter.format(amount);
  }
  return amount.toString();
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

export function formatOrdinals(num: number): string {
  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);

  const enCardinal = new Intl.PluralRules("en-US", { type: "ordinal" });
  const cardinality = enCardinal.select(num);
  const suffix = suffixes.get(cardinality);
  return `${num}${suffix}`;
}
