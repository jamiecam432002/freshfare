import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { PAGE_SIZE } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);
  console.log(pageCount, currentPage);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;
  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-3 text-[1.4rem] [&_span]:font-semibold">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </p>
      <div className="flex gap-2">
        <button
          className="flex items-center justify-center gap-2 rounded-sm border-0 px-[1.2rem] py-[0.6rem] text-[1.4rem] font-medium"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft /> <span>Previous</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-sm border-0 px-[1.2rem] py-[0.6rem] text-[1.4rem] font-medium"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span> <HiChevronRight />
        </button>
      </div>
    </div>
  );
}
