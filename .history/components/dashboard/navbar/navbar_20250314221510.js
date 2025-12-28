"use client";
import { MdChat, MdNotifications } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import SearchCompoenent from "@/components/SearchComponent";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
export const Navbar = ({setIsOpen}) => {
  const pathName = usePathname();
  const pathArray = pathName.split("/").filter(Boolean);

  const currentPathname = pathName.split("/").pop();
  return (
    <div className="bg-primary py-4 px-4 w-full max-sm:block flex justify-between items-center overflow-hidden lg:mx-4">
      <div className="max-sm:mb-2 flex gap-4 items-center">
          
                    <button
                    className="sm:hidden"
                      onClick={() => setIsOpen(true)}
                      aria-label="Open Sidebar"
                      title="Open Sidebar"
                    >
                      <IoMdMenu size={28} />
                    </button>
                 
        <div className="capitalize text-sm text-slate-500 flex gap-1 items-center">
          {pathArray.map((p, index) => {
            const linkPath = `/${pathArray.slice(0, index + 1).join("/")}`;
            return (
              <Link href={linkPath} key={index} className={`flex gap-1 ${p === currentPathname ? 'text-primarytext font-bold text-md': 'hover:text-primarytext'}`}>
                {p} <span>{index !== pathArray.length - 1 ? ">" : ""}</span>
              </Link>
            );
          })}
         
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <SearchCompoenent placeHolder="Search..." linkPage={pathName}/>
        <div className="cursor-pointer">
          <MdChat size={20} />
        </div>
        <div className="cursor-pointer">
          <MdNotifications size={20} />
        </div>
        <div className="cursor-pointer">
          <FaEarthAmericas size={18} />
        </div>
      </div>
    </div>
  );
};
