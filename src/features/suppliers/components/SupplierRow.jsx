import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import Table from "@/ui/Table";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import CreateProductForm from "@/features/products/components/CreateProductForm";

export default function SupplierRow({ supplier }) {
  const { id, name } = supplier;
  const navigate = useNavigate();
  return (
    <>
      <Table.Row>
        <div className="text-grey-600 font-semibold">{name}</div>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  onClick={() => navigate(`/categories/${id}`)}
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

            {/*  <Modal.Window name="edit">
                <CreateProductForm productToEdit={product} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="product"
                  disabled={isDeleting}
                  onConfirm={() => deleteProduct(id)}
                />
              </Modal.Window> */}
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
