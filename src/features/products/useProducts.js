import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER

  const statusFilter = searchParams.get("status") ?? "all";
  const categoryFilter = Number(searchParams.get("category_id")) || "all";
  const supplierFilter = Number(searchParams.get("supplier_id")) || "all";
  console.log(supplierFilter, categoryFilter, statusFilter);

  // SORT

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: products, count } = {},
    error,
  } = useQuery({
    queryKey: ["products", statusFilter, categoryFilter, supplierFilter, page],
    queryFn: () =>
      getProducts(statusFilter, categoryFilter, supplierFilter, page),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        "products",
        statusFilter,
        categoryFilter,
        supplierFilter,
        page + 1,
      ],
      queryFn: () =>
        getProducts(statusFilter, categoryFilter, supplierFilter, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "products",
        statusFilter,
        categoryFilter,
        supplierFilter,
        page - 1,
      ],
      queryFn: () =>
        getProducts(statusFilter, categoryFilter, supplierFilter, page - 1),
    });
  }

  return { isLoading, error, products, count };
}
