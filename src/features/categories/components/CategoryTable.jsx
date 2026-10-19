import useCategories from "@/hooks/useCategories";
import Menus from "@/ui/Menus";
import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import CategoryRow from "./CategoryRow";
import useCategoryCount from "@/hooks/useCategoryCount";

export default function CategoryTable() {
  const { data: categories, isLoading } = useCategories();
  const { data: count = 0 } = useCategoryCount();

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table
        variation="condensed"
        columns="7rem 20rem 35rem 6rem auto auto 5rem"
      >
        <Table.Header>
          <div>Category</div>
          <div>Description</div>
          <div>Products</div>
          <div>Status</div>
          <div>Updated</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={categories}
          render={(category) => (
            <CategoryRow category={category} key={category.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
