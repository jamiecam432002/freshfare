import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts } from "../api/getLowStockProducts";

export function useLowStockProducts() {
  return useQuery({
    queryKey: ["dashboard", "low-stock-products"],
    queryFn: getLowStockProducts,
  });
}
