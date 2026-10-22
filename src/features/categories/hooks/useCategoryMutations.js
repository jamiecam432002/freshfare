import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveCategory,
  deleteCategory as deleteCategoryApi,
} from "../api/apiCategories";
import toast from "react-hot-toast";

export function useSaveCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCategory,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: (id) => deleteCategoryApi(id),
    onSuccess: () => {
      toast.success("category was deleted");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      toast.error("category could not be deleted");
    },
  });

  return { isDeleting, deleteCategory };
}
