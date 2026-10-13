import { getSuppliers } from "@/services/apiSuppliers";
import { useQuery } from "@tanstack/react-query";

export default function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });
}
