import ProductTable from "../features/products/ProductTable";
import AddProduct from "../features/products/AddProduct";
import ProductTableOperations from "../features/products/ProductTableOperations";

export default function Products() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-semibold">All Products</h1>
        <div className="flex items-center gap-6">
          <ProductTableOperations />
        </div>
      </div>
      <div>
        <ProductTable />
        <AddProduct />
      </div>
    </>
  );
}
