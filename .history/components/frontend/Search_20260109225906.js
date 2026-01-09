'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Search = () => {
    const searchParams = useSearchParams();

    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }


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