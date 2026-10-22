import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryCount } from "../api/apiCategories";

export function useCategories() {
  return useQuery({
    queryKey: ["categories", "list"],
    queryFn: getCategories,
  });
}

export function useCategoryCount() {
  return useQuery({
    queryKey: ["categories", "count"],
    queryFn: getCategoryCount,
  });
}
