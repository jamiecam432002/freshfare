import CategoryTable from "@/features/categories/components/CategoryTable";

export default function Categories() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1>Categories</h1>
          <h2>Organize your products into categories.</h2>
        </div>
        {/* <AddCategory /> */}
      </div>
      <div>
        <div className="flex items-center gap-6">
          {/* <CategoryTableOperations /> */}
        </div>
        <CategoryTable />
      </div>
    </>
  );
}
