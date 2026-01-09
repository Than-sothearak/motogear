import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination";

export default function ProductTable({products}) {

    function FilterLink({ label, href }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-lg border text-sm text-gray-600 hover:bg-gray-100 transition"
    >
      {label}
    </Link>
  );
}

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
    products?.map(item => (
        <tr className="hover:bg-gray-50 transition" key={item._id}>
      <td className="px-5 py-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
            
          <Image
            src={item?.imageUrls[0] || '/placeholder.png'}
            alt="product"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-gray-800 max-w-60 overflow-hidden whitespace-nowrap">{item?.productName}</p>
          <p className="text-xs text-gray-400">{item?.brandName}</p>
        </div>
      </td>

      <td className="px-5 py-4">{item.category.name}</td>
      <td className="px-5 py-4">${item.basePrice}</td>
      <td className="px-5 py-4">{item.variants?.reduce(
        (total, variant) => total + Number(variant.stock || 0), 0
      )}</td>

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
  ) : 
    <div className="flex p-4">No data</div>
}


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Products
        </h2>

        {/* Filters */}
        <div className="flex gap-2">
          <FilterLink label="All" href="/dashboard/products" />
          <FilterLink label="Active" href="/dashboard/products?status=active" />
          <FilterLink label="Draft" href="/dashboard/products?status=draft" />
          <FilterLink label="Out of Stock" href="/dashboard/products?status=out" />
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
           {products ? 
           
            <ProductRow />: <div>No Data</div>}
          </tbody>
        </table>

        <Pagination 
        pathname={`products`}
        totalPages={totalPages} 
        currentPage={currentPage}
        query/>
      </div>
    </div>
  );
}
