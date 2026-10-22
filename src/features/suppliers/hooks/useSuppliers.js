import {
  getSupplierCount,
  getSuppliers,
} from "@/features/suppliers/api/apiSuppliers";
import { useQuery } from "@tanstack/react-query";

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });
}

export function useSupplierCount() {
  return useQuery({
    queryKey: ["suppliers", "count"],
    queryFn: getSupplierCount,
  });
}
