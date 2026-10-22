import {
  getSupplierCount,
  getSuppliers,
} from "@/features/suppliers/api/apiSuppliers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useSuppliers() {
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status");
  const search = searchParams.get("search") ?? "";

  const {
    isLoading,
    data: { data: suppliers, count } = {},
    error,
  } = useQuery({
    queryKey: ["suppliers", statusFilter, search],
    queryFn: () => getSuppliers(statusFilter, search),
  });

  return { isLoading, error, suppliers, count };
}

export function useSupplierCount() {
  return useQuery({
    queryKey: ["suppliers", "count"],
    queryFn: getSupplierCount,
  });
}
