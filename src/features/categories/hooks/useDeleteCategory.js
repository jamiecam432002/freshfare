import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory as deleteCategoryApi } from "@/services/apiCategories";

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
