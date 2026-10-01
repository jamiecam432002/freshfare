import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

export default function StatusFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") ?? "all";
  const statusItems = [
    {
      value: "all",
      label: "All statuses",
    },
    {
      value: "active",
      label: "active",
    },
    {
      value: "inactive",
      label: "inactive",
    },
  ];

  function handleStatusChange(value) {
    setSearchParams((params) => {
      if (value === "all") {
        params.delete("status");
      } else {
        params.set("status", value);
      }

      params.set("page", "1");
      return params;
    });
  }

  return (
    <Select
      items={statusItems}
      value={status}
      onValueChange={(value) => handleStatusChange(value)}
    >
      <SelectTrigger className="w-[180px] rounded-sm border border-[--color-grey-100] bg-[--color-grey-0] px-4 py-8 text-[1.6rem] font-semibold shadow-sm [&_svg]:h-[2rem] [&_svg]:w-[2rem]">
        <HiOutlineCheckCircle
          style={{ height: "2.4rem", width: "2.4rem", marginRight: "1rem" }}
        />
        <SelectValue placeholder="All statuses" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statusItems.map((status) => (
            <SelectItem value={status.value}>{status.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
