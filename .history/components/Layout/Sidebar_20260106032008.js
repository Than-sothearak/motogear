import SideBarClient from "@/components/layout/SideBarClient";
import { User } from "@/models/User";

export default async function Sidebar({ session ,navigation,servicesCount, link }) {
   
  if (!session ) {
    return <div>User not found</div>;
  }       

  return (
    <>
      <SideBarClient
       link={link}
       servicesCount={servicesCount}
        navigation={navigation}
        session={session}
        user={session.user}
      />
    </>
  );
}
