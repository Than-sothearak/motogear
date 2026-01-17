"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Pagination = ({ pathname, totalPages, currentPage, query }) => {
    const searchParams = useSearchParams()
    const sortKey = searchParams.get("sortKey");
    const sortDirection = searchParams.get("sortDirection");
      const params = new URLSearchParams(searchParams.toString());
  if (totalPages <= 1) return null;

  const pageNum = Math.ceil(Number(currentPage)) || 1;
const getHref = () => {
  // Make a copy of params so we can modify it
  const newParams = new URLSearchParams(params);

  // Override or set page, sortKey, sortDirection from variables if needed
  if (page) newParams.set("page", page); // optional: only override if page argument exists
  if (sortKey) newParams.set("sortKey", sortKey);
  if (sortDirection) newParams.set("sortDirection", sortDirection);

  // Add query if exists
  if (query) newParams.set("query", query);

  return `/dashboard/${pathname}?${newParams.toString()}`;
};

  return (
    <div className="w-full flex justify-center items-center gap-2 mt-4">
      {/* Prev Button */}

      {pageNum > 1 ? (
        <Link
          href={getHref(pageNum - 1)}
          className={` bg-primary border text-primarytext px-4 py-1 rounded-md hover:bg-primary hover:text-primarytext`}
        >
          Prev
        </Link>
      ) : (
        <div className="bg-primary opacity-30 border cursor-not-allowed px-4 py-1 rounded-md hover:bg-primary hover:text-primarytext">
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
              className={`px-3 py-1 rounded-md border ${
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
          className={` bg-primary border text-primarytext px-4 py-1 rounded-md hover:bg-primary hover:text-primarytext`}
        >
          Next
        </Link>
      ) : (
        <div className="bg-primary border text-primarytext opacity-30 cursor-not-allowed px-4 py-1 rounded-md">
          Next
        </div>
      )}
    </div>
  );
};

export default Pagination;
