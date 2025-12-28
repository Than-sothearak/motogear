import { analyticNavigation, pageNavigation } from "@/lib/navLinks";
import { SidebarList } from "@/components/SidebarList";

export const Sidebar = () => {
 
  return (
    <div className="2xl:w-1/5 bg-primary p-4 w-full min-h-screen max-xl:hidden">
      <div className="p-4 bg-red-900">Profile</div>

      <SidebarList navList={pageNavigation} />

      <SidebarList navList={analyticNavigation} /> 

      
    </div>
  );
};
