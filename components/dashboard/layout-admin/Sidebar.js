import SideBarClient from "./SideBarClient";

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
