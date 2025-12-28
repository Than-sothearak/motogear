import { analyticNavigation, pageNavigation } from "@/lib/Navgation";
import { SidebarList } from "@/components/SidebarList";

export const Sidebar = () => {
 

  return (
    <div className="bg-primary p-4 w-full min-h-screen">
      <div className="p-4 bg-red-900">Profile</div>

      <SidebarList links={pageNavigation} />

      <SidebarList links={analyticNavigation} />
    </div>
  );
};
