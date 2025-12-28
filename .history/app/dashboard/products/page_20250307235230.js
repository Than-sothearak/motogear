import ButtonViewAndDelete from "@/components/ButtonViewAndDelete";
import SearchCompoenent from "@/components/SearchComponent";
import TableComponent from "@/components/TableComponent";
import Link from "next/link";

const ProductPage = () => {
  const productColumns = [
    { header: "ID", accessor: "_id" },
    { header: "Name", accessor: "name" },
    { header: "Price", accessor: "price" },
    { header: "Category", accessor: "category" },
    { header: "Stock", accessor: "stock" },
    { header: "Created At", accessor: "createdAt" },
  ];

  const productData = [
    {
      _id: "1",
      name: "Product 1",
      category: "Electronics",
      stock: 50,
      createdAt: "2025-03-06T04:21:36.819Z",
      price: "$20",
    },
    {
      _id: "2",
      name: "Product 2",
      price: "$35",
      category: "Clothing",
      stock: 100,
      createdAt: "2025-03-06T04:21:36.819Z",
    },
    // More products
  ];

  return (
    <div className="overflow-x-auto p-4 bg-primary mt-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div>
          {" "}
          <SearchCompoenent
            placeHolder="Search for product..."
            linkPage="/dashboard/products"
          />
        </div>
        <Link
          href="/dashboard/products/add"
          className="bg-blue-500 px-2 py-1 text-center rounded-md hover:bg-blue-900 text-sm"
        >
          Add new
        </Link>
      </div>
      <TableComponent
        data={productData}
        pageName="products"
        columns={productColumns}
      />
      <div className="flex justify-between">
        <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">
          Previus
        </button>

        <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
