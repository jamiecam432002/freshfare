import { useQuery } from "@tanstack/react-query";
import { getCategoryCount } from "../services/apiCategories";

export default function useCategoryCount() {
  return useQuery({
    queryKey: ["categories", "count"],
    queryFn: getCategoryCount,
  });
}
