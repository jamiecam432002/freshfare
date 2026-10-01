import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import useSuppliers from "../hooks/useSuppliers";
import { HiOutlineUser } from "react-icons/hi2";

export default function SupplierFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: suppliers = [] } = useSuppliers();
  const supplierId = searchParams.get("supplier_id") ?? "all";

  const supplierItems = [
    {
      value: "all",
      label: "All suppliers",
    },
    ...suppliers.map((supplier) => ({
      value: String(supplier.id),
      label: supplier.name,
    })),
  ];

  function handleSupplierChange(value) {
    setSearchParams((params) => {
      if (value === "all") {
        params.delete("supplier_id");
      } else {
        params.set("supplier_id", value);
      }

      params.set("page", "1");
      return params;
    });
  }

  return (
    <Select
      items={supplierItems}
      value={supplierId}
      onValueChange={(value) => handleSupplierChange(value)}
    >
      <SelectTrigger className="border-grey-100 bg-grey-0 w-[330px] rounded-sm border px-4 py-8 text-[1.6rem] font-semibold shadow-sm [&_svg]:h-[2rem] [&_svg]:w-[2rem]">
        <HiOutlineUser
          style={{ height: "2.4rem", width: "2.4rem", marginRight: "1rem" }}
        />
        <SelectValue placeholder="All suppliers" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All suppliers</SelectItem>
          {suppliers.map((supplier) => (
            <SelectItem key={supplier.id} value={String(supplier.id)}>
              {supplier.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
