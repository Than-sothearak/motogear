"use client"
import { FaSearch } from "react-icons/fa";
import { MdChat, MdNotifications } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { usePathname } from "next/navigation";
export const Navbar = () => {
  const pathName = usePathname()
  return (
    <div className="bg-primary py-6 px-4 rounded-lg w-full flex justify-between items-center">
      <div>
        <h2 className="capitalize font-bold">{pathName.split("/").pop()}</h2>
      </div>
      <div className="flex gap-4 items-center">
        <div className="bg-slate-600 rounded-md w-52 flex relative items-center justify-start pl-2 gap-2 py-2">
          <FaSearch size={12}/>
          <input
            type="text"
            placeholder="Search...."
            className="w-50 text-sm border-none outline-none ring-0 focus:ring-0 focus:outline-none bg-transparent absolute top-0 bottom-0 left-7 overflow-hidden"
          />
        </div>
        <div className="cursor-pointer"><MdChat size={20}/></div>
        <div className="cursor-pointer"><MdNotifications size={20}/></div>
        <div className="cursor-pointer"><FaEarthAmericas size={18}/></div>
      </div>
    </div>
  );
};
