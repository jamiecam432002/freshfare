import { useQuery } from "@tanstack/react-query";
import { getCategorySummary } from "../api/getCategorySummary";

export function useCategorySummary() {
  return useQuery({
    queryKey: ["dashboard", "category-summary"],
    queryFn: getCategorySummary,
    staleTime: 1 * 60 * 1000,
  });
}
