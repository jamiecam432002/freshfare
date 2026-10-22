import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveProduct,
  deleteProduct as deleteProductApi,
} from "../api/apiProducts";
import toast from "react-hot-toast";

export function useSaveProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProduct,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: () => {
      toast.success("product was deleted");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      toast.error("product could not be deleted");
    },
  });

  return { isDeleting, deleteProduct };
}
