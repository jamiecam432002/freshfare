import Button from "@/ui/Button";
import Table from "@/ui/Table";

export default function LowStockRow({ product }) {
  const { id, name, sku, quantity, active } = product;
  return (
    <Table.Row>
      <div className="text-grey-600 font-semibold">{name}</div>
      <div>{sku}</div>
      <div>{quantity}</div>
      <div>{active ? "ACTIVE" : "INACTIVE"}</div>
      <div>
        <Button variation="condensed">Restock</Button>
      </div>
    </Table.Row>
  );
}
