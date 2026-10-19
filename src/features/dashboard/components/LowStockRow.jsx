import ProductImage from "@/features/products/components/ProductImage";
import Button from "@/ui/Button";
import Table from "@/ui/Table";

export default function LowStockRow({ product }) {
  const { id, name, sku, quantity, active, image_path } = product;
  console.log(name);
  console.log(image_path);
  return (
    <Table.Row>
      <ProductImage
        key={image_path ?? id}
        path={image_path}
        name={name}
        size={48}
      />
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
