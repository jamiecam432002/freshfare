import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../../services/apiSuppliers";

export default function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });
}
