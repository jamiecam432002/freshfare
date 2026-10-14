import { HiPlus } from "react-icons/hi2";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import CreateSupplierForm from "./CreateSupplierForm";

export default function AddSupplier() {
  return (
    <div className="mt-6">
      <Modal>
        <Modal.Open opens="supplier-form">
          <Button variation="primary">
            <HiPlus />
            <span>Add Supplier</span>
          </Button>
        </Modal.Open>
        <Modal.Window name="supplier-form">
          <CreateSupplierForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
