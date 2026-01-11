'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    startTransition(() => {
      if (term) {
        replace(`/products/search?query=${encodeURIComponent(term)}`, {
          scroll: false,
        });
      } else {
        replace(`${pathname}?`);
      }

     
    });
  }, 500);

  return (
    <div className="relative max-lg:order-2 w-full">
      <input
        type="text"
        placeholder="Search products..."
        className={`border px-4 py-2 text-sm w-full
          focus:outline-none focus:ring-2 focus:ring-black
          ${isPending ? 'pr-10 opacity-70' : ''}`}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query') ?? ''}
      />

      {/* 🔄 Loading indicator */}
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin block" />
        </div>
      )}
    </div>
  );
};

export default Search;
