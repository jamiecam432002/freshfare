import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import useCategories from "../hooks/useCategories";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

export default function CategoryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [] } = useCategories();
  const categoryId = searchParams.get("category_id") ?? "all";

  const categoryItems = [
    {
      value: "all",
      label: "All categories",
    },
    ...categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    })),
  ];

  function handleCategoryChange(value) {
    setSearchParams((params) => {
      if (value === "all") {
        params.delete("category_id");
      } else {
        params.set("category_id", value);
      }

      params.set("page", "1");
      return params;
    });
  }

  return (
    <Select
      items={categoryItems}
      value={categoryId}
      onValueChange={(value) => handleCategoryChange(value)}
    >
      <SelectTrigger className="w-[230px] rounded-md border border-[--color-grey-200] bg-[--color-grey-0] px-4 py-8 text-[1.6rem] font-semibold shadow-sm [&_svg]:h-[2rem] [&_svg]:w-[2rem]">
        <HiOutlineSquares2X2
          style={{ height: "2.4rem", width: "2.4rem", marginRight: "1rem" }}
        />
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All suppliers</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
