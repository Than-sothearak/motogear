import SearchComponent from "@/components/SearchComponent";
import Link from "next/link";
import React from "react";
import { getUsers } from "@/actions/users";
import TableComponent from "@/components/TableComponent";
import { auth } from "@/auth";

const userPage = async ({ searchParams }) => {
  const { query } = await searchParams;
  const fecthUsers = await getUsers(query);
  const session = await auth();
  

  const userColumns = [
   
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Created At", accessor: "createdAt" },
    { header: "Role", accessor: "isAdmin" },
  ];

  const users = JSON.parse(JSON.stringify(fecthUsers));

  return (
    <div className="p-4 justify-center bg-primary mt-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div>
         
          <SearchComponent
            placeHolder="Search for product..."
            linkPage="/dashboard/users"
          />
        </div>
        <Link
          href="/dashboard/users/add"
          className="bg-blue-500 px-2 py-1 text-center rounded-md hover:bg-blue-900 text-sm"
        >
          Add new
        </Link>
      </div>
      

      {/* Users Table */}
  <TableComponent data={users} pageName="users" columns={userColumns} session={session} />

      {/* Pagination Buttons */}
      <div className="flex justify-between">
        <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">
          Previous
        </button>
        <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">
          Next
        </button>
      </div>
    </div>
  );
};

export default userPage;
