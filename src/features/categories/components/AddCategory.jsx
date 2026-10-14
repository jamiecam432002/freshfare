import { HiPlus } from "react-icons/hi2";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import CreateCategoryForm from "./CreateCategoryForm";

export default function AddCategory() {
  return (
    <div className="mt-6">
      <Modal>
        <Modal.Open opens="category-form">
          <Button variation="primary">
            <HiPlus />
            <span>Add Category</span>
          </Button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CreateCategoryForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
