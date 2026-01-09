"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaginationFrontend = ({ pathname, totalPages, currentPage, query }) => {
    const searchParams = useSearchParams()
    const sortKey = searchParams.get("sortKey");
    const sortDirection = searchParams.get("sortDirection");
    const limit = searchParams.get("limit")
  if (totalPages <= 1) return null;

  const pageNum = Math.ceil(Number(currentPage)) || 1;
  const getHref = (page) =>
    `${pathname}?page=${page}${query ? `&query=${query}` : ""}&sortKey=${sortKey || ""}&limit=${limit}&sortDirection=${sortDirection || "descending"}`;

  return (
    <div className="w-full flex justify-center items-center gap-2 mb-10 mt-4">
      {/* Prev Button */}

      {pageNum > 1 ? (
        <Link
          href={getHref(pageNum - 1)}
          className={` bg-primary border text-primarytext px-4 py-1 rounded-md hover:bg-primary hover:text-primarytext`}
        >
          Prev
        </Link>
      ) : (
        <div className="bg-primary border opacity-35 cursor-not-allowed px-4 py-1 rounded-md hover:bg-primary hover:text-primarytext">
          Prev
        </div>
      )}

      <div className="flex gap-2 overflow-auto max-w-full px-2">
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <Link
              key={page}
              href={getHref(page)}
              className={`px-3 py-1 rounded-md ${
                page === pageNum
                  ? "bg-tertiary text-primary"
                  : "bg-primary text-primarytext hover:bg-primary"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {pageNum < totalPages ? (
        <Link
          href={getHref(pageNum + 1)}
          className={` bg-primary text-primarytext px-4 border py-1 rounded-md hover:bg-primary hover:text-primarytext`}
        >
          Next
        </Link>
      ) : (
        <div className="bg-primary text-primarytext border opacity-15 cursor-not-allowed px-4 py-1 rounded-md">
          Next
        </div>
      )}
    </div>
  );
};

export default PaginationFrontend ;
