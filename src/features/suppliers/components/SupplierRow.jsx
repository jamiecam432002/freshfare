import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import Table from "@/ui/Table";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import ConfirmDelete from "@/ui/ConfirmDelete";
import CreateSupplierForm from "./CreateSupplierForm";
import ProductImage from "@/features/products/components/ProductImage";
import { useDeleteSupplier } from "../hooks/useSupplierMutations";

export default function SupplierRow({ supplier }) {
  const {
    id,
    name,
    email,
    contact_name,
    phone,
    active,
    image_path,
    product_count: productCount,
  } = supplier;
  const { isDeleting, deleteSupplier } = useDeleteSupplier();
  const navigate = useNavigate();

  return (
    <>
      <Table.Row>
        <ProductImage
          key={image_path ?? id}
          path={image_path}
          name={name}
          size={90}
        />
        <div className="text-grey-600 font-semibold">{name}</div>
        <div>{contact_name}</div>
        <div>{email}</div>
        <div>{phone}</div>
        <div className="text-center">
          <Link to={`/products/?supplier_id=${id}`}>{productCount}</Link>
        </div>
        <div className="font-semibold">{active ? "active" : "inactive"}</div>
        <div>Oct 12, 2026</div>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  onClick={() => navigate(`/suppliers/${id}`)}
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
              <CreateSupplierForm supplierToEdit={supplier} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="supplier"
                disabled={isDeleting}
                onConfirm={() => deleteSupplier(id)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
