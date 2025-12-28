"use client"
import { MdChat, MdNotifications } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import SearchCompoenent from "@/components/SearchComponet";
export const Navbar = () => {
  const pathName = usePathname()
  return (
    <div className="bg-primary py-6 px-4 rounded-lg w-full max-sm:block p-4 flex justify-between items-center">
      
      <div>
        <h2 className="capitalize font-bold">{pathName.split("/").pop()}</h2>
      </div>
      <div className="flex gap-4 items-center">
      <SearchCompoenent placeHolder="Search..."/>
        <div className="cursor-pointer"><MdChat size={20}/></div>
        <div className="cursor-pointer"><MdNotifications size={20}/></div>
        <div className="cursor-pointer"><FaEarthAmericas size={18}/></div>
      </div>
    </div>
  );
};
