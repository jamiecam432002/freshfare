import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { deleteProduct } from "../../services/apiProducts";
import { formatCurrency } from "../../utils/helpers";

import CreateProductForm from "./CreateProductForm";

export default function ProductRow({ product }) {
  const [showForm, setShowForm] = useState(false);
  const { id, name, price, sku, quantity, active } = product;
  const isActive = active ? "YES" : "NO";
  const queryClient = useQueryClient();
  console.log(product);

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteProduct(id),
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

  return (
    <>
      <div
        role="row"
        className="grid grid-cols-6 items-center gap-[2.4rem] border-b border-[--color-grey-100] px-[2.4rem] py-[1.2rem]"
      >
        <div className="text-[1.6rem] font-semibold text-[--color-grey-600]">
          {name}
        </div>

        <div>{quantity}</div>
        <div>{sku}</div>
        <div>{isActive}</div>
        <div className="font-semibold">{formatCurrency(price)}</div>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button onClick={() => mutate(id)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </div>
      {showForm && <CreateProductForm productToEdit={product} />}
    </>
  );
}
