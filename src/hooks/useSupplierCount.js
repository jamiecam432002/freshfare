import { useQuery } from "@tanstack/react-query";
import { getSupplierCount } from "../services/apiSuppliers";

export default function useSupplierCount() {
  return useQuery({
    queryKey: ["suppliers", "count"],
    queryFn: getSupplierCount,
  });
}
