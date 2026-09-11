import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";

import CreateProductForm from "./CreateProductForm";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useDeleteProduct } from "./useDeleteProduct";
import Modal from "../../ui/Modal";

export default function ProductRow({ product }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id,
    name,
    price,
    sku,
    quantity,
    active,
    categories: category,
    suppliers: supplier,
  } = product;
  const isActive = active ? "YES" : "NO";
  const { isDeleting, deleteProduct } = useDeleteProduct();

  return (
    <>
      <div
        role="row"
        className="grid grid-cols-[30rem_5rem_10rem_25rem_6rem_5rem_auto_5rem] items-center gap-[2.6rem] border-b border-[--color-grey-100] px-[2.4rem] py-[1.2rem]"
      >
        <div className="text-[1.6rem] font-semibold text-[--color-grey-600]">
          {name}
        </div>

        <div>{quantity}</div>
        <div>{category.name}</div>
        <div>{supplier.name}</div>

        <div>{isActive}</div>
        <div className="font-semibold">{formatCurrency(price)}</div>
        <div>{sku}</div>
        <div>
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>

            <button onClick={() => deleteProduct(id)} disabled={isDeleting}>
              <HiTrash />
            </button>

            <Modal.Window name="edit">
              <CreateProductForm productToEdit={product} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </>
  );
}
