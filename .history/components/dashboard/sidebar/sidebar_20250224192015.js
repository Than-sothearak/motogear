"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { analyticNavigation, pageNavigation } from "@/lib/Navgation";
import { SidebarList } from "@/components/SidebarList";

export const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="bg-primary p-4 w-full min-h-screen">
      <div className="p-4 bg-red-900">Profile</div>

      <SidebarList links={pageNavigation}/>

      <div className="mt-4">
        Analytics
        <ul className="flex flex-col gap-1 mt-2 cursor-pointer">
          {analyticNavigation.map((item) => (
            <Link
              href={item.path}
              key={item.path}
              className={`flex gap-2 justify-start items-center ${
                pathName === item.path ? "bg-slate-500" : "bg-balck "
              } rounded-xl px-4 py-4`}
            >
              <div>{item.icon}</div>
              {item.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
