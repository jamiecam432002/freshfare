import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/getDashboardStats";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5,
  });
}
