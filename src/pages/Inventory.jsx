import { useState } from "react";
import ProductTable from "../features/products/ProductTable";
import CreateProductForm from "../features/products/CreateProductForm";
import Button from "../ui/Button";

export default function Inventory() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div>
        <h1 className="text-5xl font-semibold">All Products</h1>
        <p>Filter / Sort</p>
      </div>
      <div>
        <ProductTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new product
        </Button>
        {showForm && <CreateProductForm />}
      </div>
    </>
  );
}
