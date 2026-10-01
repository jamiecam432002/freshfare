import { formatCurrency } from "../../utils/helpers";
import CreateProductForm from "./CreateProductForm";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useDeleteProduct } from "./hooks/useDeleteProduct";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <>
      <div
        role="row"
        className="border-grey-100 grid grid-cols-[26rem_7rem_12rem_7rem_7rem_auto_10rem_5rem] items-center gap-[2.6rem] border-b px-[2.4rem] py-[1.2rem]"
      >
        <div className="text-grey-600 font-semibold">{name}</div>
        <div>{sku}</div>
        <div>{category.name}</div>
        <div className="font-semibold">{formatCurrency(price)}</div>
        <div>{quantity}</div>
        <div>{supplier.name}</div>
        <div>{active ? "ACTIVE" : "INACTIVE"}</div>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  onClick={() => navigate(`/products/${id}`)}
                  icon={<HiEye />}
                >
                  View
                </Menus.Button>
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
