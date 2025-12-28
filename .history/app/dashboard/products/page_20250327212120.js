import { getProduct } from "@/actions/prodoucts";
import { auth } from "@/auth";
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/TableComponent";
import Link from "next/link";

const productPage = async ({searchParams}) => {
  const session = await auth()
    const { query } = await searchParams;
    const fecthProducts = await getProduct(query);
    const products = JSON.parse(JSON.stringify(fecthProducts));
    
  const productColumns = [
  
    { header: "Name", accessor: "productName" },
    { header: "Price", accessor: "price" },
    { header: "Category", accessor: "category" },
    { header: "Stock", accessor: "stock" },
    { header: "Created At", accessor: "createdAt" },
  ];


  return (
    <div className="p-4 bg-primary mt-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div>
         
          <SearchComponent
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
        data={products}
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

export default productPage;
