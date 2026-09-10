export function getCurrencyIcon(currency?: string) {
  const symbolMap: Record<string, string> = {
    BDT: "৳",
    USD: "$",
    INR: "₹",
    EUR: "€",
  };

  const key = currency?.trim().toUpperCase() || "BDT";
  return symbolMap[key] ?? "৳";
}
