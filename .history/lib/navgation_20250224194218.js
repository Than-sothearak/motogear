import { MdSpaceDashboard } from "react-icons/md";
import { AiFillShop } from "react-icons/ai"; // Replace with correct icon if needed
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { MdOutlineWorkHistory } from "react-icons/md";

export const pageNavigation = {
  name: "Page",
  links: [ {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdSpaceDashboard size={22} />,
  },
  {
    path: "/dashboard/products",
    name: "Products",
    icon: <AiFillShop size={22} />, 
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <FaUserCircle size={22} />,
  },]
}

export const analyticNavigation = {
  name: "Analytics",
  links: [
    {
      path: "/reports",
      name: "Reports",
      icon: <BiSolidReport size={22} />,
    },
    {
      path: "/dashboard/revenue",
      name: "Revenue",
      icon: <MdOutlineWorkHistory size={22} />, 
    },
    {
      path: "/dashboard/teams",
      name: "Teams",
      icon: <FaUsers size={22} />,
    },
  ]
}
    
  ;
  
