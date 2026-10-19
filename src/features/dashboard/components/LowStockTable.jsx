import LowStockRow from "./LowStockRow";
import Table from "@/ui/Table";
import { useLowStockProducts } from "../hooks/useLowStockProducts";
import Spinner from "@/ui/Spinner";

export default function LowStockTable() {
  const { data, isLoading } = useLowStockProducts();
  if (isLoading) return <Spinner />;
  return (
    <Table columns="6rem 20rem 1fr 1fr 1fr 1fr" variation="condensed">
      <Table.Header>
        <div>Product</div>
        <div>SKU</div>
        <div>Remaining</div>
        <div>Status</div>
        <div>Action</div>
      </Table.Header>
      <Table.Body
        data={data}
        render={(product) => <LowStockRow product={product} key={product.id} />}
      ></Table.Body>
    </Table>
  );
}
