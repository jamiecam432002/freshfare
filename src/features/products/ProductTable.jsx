import ProductRow from "./ProductRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useProducts } from "./useProducts";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

export default function ProductTable() {
  const { products, isLoading, count } = useProducts();

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table>
        <Table.Header>
          <div>Name</div>
          <div>Qty</div>
          <div>Category</div>
          <div>Supplier</div>

          <div>Status</div>
          <div>Price</div>
          <div>SKU</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}
