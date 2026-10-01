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
      <Search className="text-grey-500 absolute top-1/2 left-3 size-8 w-[2.4rem] -translate-y-1/2" />
      <input
        type="search"
        placeholder="Search products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-grey-200 h-16 w-full rounded-md border pr-3 pl-16 text-[1.6rem]"
      />
    </div>
  );
}
