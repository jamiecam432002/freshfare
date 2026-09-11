import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProductForm from "./CreateProductForm";

export default function AddProduct() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="product-form">
          <Button>Add new product</Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
