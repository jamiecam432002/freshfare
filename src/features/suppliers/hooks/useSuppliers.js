import {
  getSupplierCount,
  getSuppliers,
} from "@/features/suppliers/api/apiSuppliers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

export function useSuppliers() {
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status");
  const search = searchParams.get("search") ?? "";

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: suppliers, count } = {},
    error,
  } = useQuery({
    queryKey: ["suppliers", statusFilter, page, search],
    queryFn: () => getSuppliers(statusFilter, page, search),
  });

  return { isLoading, error, suppliers, count };
}

export function useSupplierCount() {
  return useQuery({
    queryKey: ["suppliers", "count"],
    queryFn: getSupplierCount,
  });
}
