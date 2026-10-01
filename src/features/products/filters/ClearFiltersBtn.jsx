import Button from "@/ui/Button";
import { useSearchParams } from "react-router-dom";

export default function ClearFiltersBtn() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    setSearchParams((params) => {
      params.delete("status");
      params.delete("category_id");
      params.delete("supplier_id");
      params.set("page", "1");

      return params;
    });
  }
  return <Button onClick={handleClick}>Clear filters</Button>;
}
