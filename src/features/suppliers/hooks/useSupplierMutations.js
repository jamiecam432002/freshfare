import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier as deleteSupplierApi,
} from "../api/apiSuppliers";

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      toast.success("supplier was successfully created");
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}
export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      toast.success("supplier was successfully saved");
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}
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
