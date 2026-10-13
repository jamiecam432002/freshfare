import useSuppliers from "@/hooks/useSuppliers";
import Menus from "@/ui/Menus";
import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import SupplierRow from "./SupplierRow";

export default function SupplierTable() {
  const { data: suppliers, isLoading, count } = useSuppliers();

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table
        variation="condensed"
        columns="10rem 16rem auto auto auto auto auto"
      >
        <Table.Header>
          <div>Supplier</div>
          <div>Contact</div>
          <div>Email</div>
          <div>Phone</div>
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
