import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../services/apiProducts";

export function useProduct() {
  const { productId } = useParams();
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
    retry: false,
  });
  return { isLoading, product, error };
}
