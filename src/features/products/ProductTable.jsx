import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import ProductRow from "./ProductRow";
import Table from "../../ui/Table";

export default function ProductTable() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <Table>
      <Table.Header>
        <div>Name</div>
        <div>Qty</div>
        <div>Category</div>
        <div>Supplier</div>

        <div>Active</div>
        <div>Price</div>
        <div>SKU</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={products}
        render={(product) => <ProductRow product={product} key={product.id} />}
      />
    </Table>
  );
}
