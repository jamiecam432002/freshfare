import { formatCurrency } from "../../utils/helpers";
import CreateProductForm from "./CreateProductForm";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useDeleteProduct } from "./useDeleteProduct";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

export default function ProductRow({ product }) {
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
  const { isDeleting, deleteProduct } = useDeleteProduct();

  return (
    <>
      <div
        role="row"
        className="grid grid-cols-[30rem_5rem_12rem_25rem_6rem_5rem_auto_5rem] items-center gap-[2.6rem] border-b border-[--color-grey-100] px-[2.4rem] py-[1.2rem]"
      >
        <div className="font-semibold text-[--color-grey-600]">{name}</div>

        <div>{quantity}</div>
        <div>{category.name}</div>
        <div>{supplier.name}</div>

        <div>{active ? "ACTIVE" : "INACTIVE"}</div>
        <div className="font-semibold">{formatCurrency(price)}</div>
        <div>{sku}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button icon={<HiEye />}>View</Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateProductForm productToEdit={product} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="product"
                disabled={isDeleting}
                onConfirm={() => deleteProduct(id)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </>
  );
}
