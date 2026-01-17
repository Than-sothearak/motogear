"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductTable({ products, categories }) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
function clearFilter() {
  const params = new URLSearchParams();
  params.set("page", 1);
  router.push(`/dashboard/${pathname}?${params.toString()}`);
}
  function FilterLink({ label, statusValue }) {
    const isActive =
      (statusValue === null && !statusParam) || statusParam === statusValue;
    if (statusValue) {
      params.set("status", statusValue);
    } else {
      params.delete("status");
    }

    const href = `/dashboard/products?${params.toString()}`;

    return (
      <Link
        href={href}
        className={`px-3 py-1.5 rounded-lg border text-sm transition ${
          isActive
            ? "font-bold border-green-400"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  }

  const handleChange = (e) => {
    const selectedSlug = e.target.value;
    const params = new URLSearchParams(searchParams.toString()); // keep current URL params

    if (selectedSlug) {
      params.set("category", selectedSlug);
       params.delete("page") // set new category
    } else {
   
      ; // optional: remove category if empty
    }

    router.push(`/dashboard/products?${params.toString()}`); // keep status param
  };

  function StatusBadge({ status }) {
    const styles = {
      active: "bg-green-100 text-green-700",
      draft: "bg-yellow-100 text-yellow-700",
      out: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  }

  function ProductRow() {
    return products && products.length > 0 ? (
      products?.map((item) => (
        <tr className="hover:bg-gray-50 transition" key={item._id}>
          <td className="px-5 py-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
              <Image
                src={item?.imageUrls[0] || "/placeholder.png"}
                alt="product"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800 max-w-60 overflow-hidden whitespace-nowrap">
                {item?.productName}
              </p>
              <p className="text-xs text-gray-400">{item?.slug}</p>
            </div>
          </td>

          <td className="px-5 py-4">{item.category.name}</td>
          <td className="px-5 py-4">${item.basePrice}</td>
          <td className="px-5 py-4">
            {item.variants?.reduce(
              (total, variant) => total + Number(variant.stock || 0),
              0
            )}
          </td>

          <td className="px-5 py-4">
            <StatusBadge status={item.status} />
          </td>

          <td className="px-5 py-4 text-right">
            <Link
              href={`/dashboard/products/${item._id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={6} className="text-center py-4 text-gray-500">
          No data
        </td>
      </tr>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Products</h2>

        <div className="flex items-center gap-4">
          {/* Filters */}
          <div className="flex gap-2">
           <button onClick={clearFilter}>
            All
           </button>
            <FilterLink
              label="Active"
              href="/dashboard/products?status=active"
              statusValue="active"
            />
            <FilterLink
              label="Draft"
              href="/dashboard/products?status=draft"
              statusValue="draft"
            />
            <FilterLink
              label="Out of Stock"
              href="/dashboard/products?status=out"
              statusValue="out"
            />
          </div>
          <div className="flex items-center gap-2 w-64">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                defaultValue=""
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-1 pr-10 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>
                    {cat.slug}
                  </option>
                ))}
              </select>
              {/* Dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-3 text-left">Product</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-left">Stock</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products ? <ProductRow /> : <div>No Data</div>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
