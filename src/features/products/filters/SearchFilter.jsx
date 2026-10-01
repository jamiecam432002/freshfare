import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function SearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? "1";
  const [value, setValue] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams((params) => {
        if (value && value.length > 2) {
          params.set("search", value);
        } else {
          params.delete("search");
        }

        params.set("page", page);

        return params;
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [value, setSearchParams, page]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-8 w-[2.4rem] -translate-y-1/2 text-[--color-grey-500]" />
      <input
        type="search"
        placeholder="Search products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-16 w-full rounded-md border border-[--color-grey-200] pl-[4rem] pr-3 text-[1.6rem]"
      />
    </div>
  );
}
