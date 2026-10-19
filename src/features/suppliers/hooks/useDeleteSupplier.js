import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSupplier as deleteSupplierApi } from "@/services/apiSuppliers";

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteSupplier } = useMutation({
    mutationFn: (id) => deleteSupplierApi(id),
    onSuccess: () => {
      toast.success("supplier was deleted");
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
    onError: () => {
      toast.error("supplier could not be deleted");
    },
  });

  return { isDeleting, deleteSupplier };
}
