import { analyticNavigation, pageNavigation } from "@/lib/navLinks";
import { SidebarList } from "@/components/SidebarList";
import { IoMdMenu } from "react-icons/io";
export const Sidebar = () => {
 
  return (
    <>
    <div className=" bg-primary p-4 w-full ">
      <div className="p-4 bg-red-900">Profile</div>
      <button><IoMdMenu size={28}/></button>
     <div className="min-h-screen max-lg:hidden">
     <SidebarList navList={pageNavigation} />

<SidebarList navList={analyticNavigation} /> 
     </div>

      
    </div>
    </>
  );
};
