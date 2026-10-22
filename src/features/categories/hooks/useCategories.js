import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryCount } from "../api/apiCategories";
import { useSearchParams } from "react-router-dom";

export function useCategories() {
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status");
  const search = searchParams.get("search");

  const {
    isLoading,
    data: { data: categories, count } = {},
    error,
  } = useQuery({
    queryKey: ["categories", statusFilter, search],
    queryFn: () => getCategories(statusFilter, search),
  });

  return { isLoading, error, categories, count };
}

export function useCategoryCount() {
  return useQuery({
    queryKey: ["categories", "count"],
    queryFn: getCategoryCount,
  });
}
