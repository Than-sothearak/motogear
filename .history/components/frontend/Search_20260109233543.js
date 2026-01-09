'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const searchParams = useSearchParams();

    const pathname = usePathname();
    const { replace } = useRouter();

  const handleSearch = useDebouncedCallback ((term) => {
    if (term) {
      // Always go to /products/search with ONLY query param
      replace(`/products/search?query=${encodeURIComponent(term)}`, {
        scroll: false,
      });
    } else {
      // If input cleared → just /products/search
     replace("/products/search", { scroll: false });
    }
  }, 300);

    return (
        <div className="max-lg:order-2 w-full">
            <input
                type="text"
                placeholder="Search products..."
                className="border px-4 py-2 text-sm w-full
              focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => {
                    handleSearch(e.target.value);

                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}

export default Search