import {
  useSuppliers,
  useSupplierCount,
} from "@/features/suppliers/hooks/useSuppliers";
import Menus from "@/ui/Menus";
import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import SupplierRow from "./SupplierRow";

export default function SupplierTable() {
  const { data: suppliers, isLoading } = useSuppliers();
  const { data: count = 0 } = useSupplierCount();

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table
        variation="condensed"
        columns="9rem 25rem 20rem 21rem 13rem 6rem 8rem auto 5rem"
      >
        <Table.Header>
          <div>Supplier</div>
          <div>Name</div>
          <div>Contact</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Products</div>
          <div>Status</div>
          <div>Updated</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={suppliers}
          render={(supplier) => (
            <SupplierRow supplier={supplier} key={supplier.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
