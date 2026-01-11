"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useRef, useTransition } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  // ✅ store last non-search page
  const previousUrlRef = useRef(null);

  const handleSearch = useDebouncedCallback((term) => {
    startTransition(() => {
      // 🔹 Save previous page ONLY first time user types
      if (!previousUrlRef.current && term) {
        previousUrlRef.current =
          window.location.pathname + window.location.search;
      }

      // 🔹 When user types
      if (term) {
        replace(`/products/search?query=${encodeURIComponent(term)}`, {
          scroll: false,
        });
      } 
      // 🔹 When input cleared → go back
      else if (previousUrlRef.current) {
        replace(previousUrlRef.current, { scroll: false });
        previousUrlRef.current = null; // reset
      }
    });
  }, 500);

  return (
    <input
      type="search"
      placeholder="Search products..."
      className="w-full p-2 border rounded"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default Search;
