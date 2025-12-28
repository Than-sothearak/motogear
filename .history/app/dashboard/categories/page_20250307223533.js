import { getCategories } from "@/actions/categories";
import SearchCompoenent from "@/components/SearchComponent";
import TableCategory from "@/components/TableCategory";
import Link from "next/link";

export default async function CategoryPage ({ searchParams}) {
  const { query } = await searchParams;
  const fecthCategories = await getCategories(query);
  
  const categoryColumns = [
    { header: "No", accessor: "_id" },
    { header: "Category", accessor: "category" },
    { header: "Parent", accessor: "parentCategory" },
    { header: "Created At", accessor: "createdAt" },
  ];



  const categories = JSON.parse(JSON.stringify(fecthCategories));
 
    return <div className="p-4 bg-primary mt-4 rounded-lg">
    <div className="flex justify-between items-center gap-4">
    <div> <SearchCompoenent placeHolder="Search for category..." linkPage="/dashboard/categories"/></div>
    <Link href="/dashboard/categories/add" className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-900 text-sm text-center">Add new</Link>
    </div>
    <TableCategory
        data={categories}
        pageName="categories"
        columns={categoryColumns}
      />
    <div className="flex justify-between">
      <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">Previus</button>

      <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">Next</button>
    </div>
  </div>
}