import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProductForm from "./CreateProductForm";

export default function AddProduct() {
  return (
    <div className="mt-6">
      <Modal>
        <Modal.Open opens="product-form">
          <Button variation="primary" className="mt-4">
            Add new product
          </Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
