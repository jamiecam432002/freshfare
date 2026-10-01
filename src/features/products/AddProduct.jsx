import { HiPlus } from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProductForm from "./CreateProductForm";

export default function AddProduct() {
  return (
    <div className="mt-6">
      <Modal>
        <Modal.Open opens="product-form">
          <Button variation="primary">
            <HiPlus />
            <span>Add Product</span>
          </Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
