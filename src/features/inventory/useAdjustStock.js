import { adjustProductStock } from "@/services/apiInventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdjustStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adjustProductStock,
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["products"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["product", variables.productId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["stock-movements", variables.productId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboard"],
        }),
      ]);
    },
  });
}
