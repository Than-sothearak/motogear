import { analyticNavigation, pageNavigation } from "@/lib/navLinks";
import { SidebarList } from "@/components/SidebarList";
import { IoMdMenu } from "react-icons/io";
export const Sidebar = () => {
 
  return (
    <>
    <div className=" bg-primary p-4">
      <div className="p-4 bg-red-900">Profile</div>
      <button><IoMdMenu size={28}/></button>
      <div>

      </div>

      
    </div>
    </>
  );
};
