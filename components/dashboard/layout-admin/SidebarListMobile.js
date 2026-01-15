"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export const SidebarListMobile = ({navList}) => {
    const pathName = usePathname();

     // Keep only the first 1-2 segments for tracking main section
  const currentBasePath = pathName.split("/").filter(Boolean).slice(0, 2).join("/");
  return (
    <div className="z-10 mt-4">
    <ul className="flex flex-col gap-1 mt-2 cursor-pointer">
      {navList.links.map((item) => {
           const itemBasePath = item.path.split("/").filter(Boolean).slice(0, 2).join("/");

          const isActive = currentBasePath === itemBasePath;
        return (
          
          
        <Link
        title={item.name}
          href={item.path}
          key={item.path}
          className={`hover:bg-secondary flex gap-2 justify-between items-center ${
                isActive
                  ? "bg-tertiary text-secondarytext hover:bg-secondary hover:text-primarytext"
                  : "bg-transparent"
              } rounded-xl px-4 py-4`}
        >
          <div>{item.icon}</div>
      
        </Link>
        )
      }

      )}
    </ul>
  </div>
  )
}
