import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import Table from "@/ui/Table";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import CreateCategoryForm from "./CreateCategoryForm";
import ConfirmDelete from "@/ui/ConfirmDelete";
import ProductImage from "@/features/products/components/ProductImage";
import { useDeleteCategory } from "../hooks/useCategoryMutations";

export default function CategoryRow({ category }) {
  const {
    id,
    name,
    description,
    active,
    image_path,
    product_count: productCount,
  } = category;
  const { isDeleting, deleteCategory } = useDeleteCategory();
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
        <div>{description}</div>
        <div className="text-center">
          <Link to={`/products/?category_id=${id}`}>{productCount}</Link>
        </div>
        <div className="font-semibold">{active ? "active" : "inactive"}</div>
        <div>Oct 12, 2026</div>

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

            <Modal.Window name="edit">
              <CreateCategoryForm categoryToEdit={category} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="category"
                disabled={isDeleting}
                onConfirm={() => deleteCategory(id)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
