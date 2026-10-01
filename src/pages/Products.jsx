import ProductTable from "../features/products/ProductTable";
import AddProduct from "../features/products/AddProduct";
import ProductTableOperations from "../features/products/ProductTableOperations";

export default function Products() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-bold">Products</h1>
          <h2>Manage your inventory and product details.</h2>
        </div>
        <AddProduct />
      </div>
      <div>
        <div className="flex items-center gap-6">
          <ProductTableOperations />
        </div>
        <ProductTable />
      </div>
    </>
  );
}
