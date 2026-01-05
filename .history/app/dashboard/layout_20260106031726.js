import { auth } from "@/auth";
import Sidebar from "@/components/layout/Sidebar";
import { pageNavigation, userNavigation } from "@/lib/navLinks";
import Footer from "@/components/layout/Footer";
import { Service } from "@/models/Service";
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import Logout from "@/components/auth/Logout";



export default async function DashboardLayout({ children, admin}) {

  const session = await auth();

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }
  let services = [];
  if (session?.user?.isAdmin) {
    services = await Service.find({ status: "pending" });
  }

  return (
    <>
      {session?.user?.isAdmin ? (
        <div className="flex bg-secondary">
          <div className="">
            <Sidebar
              navigation={pageNavigation}
              session={session}
              servicesCount={services.length}
              link={"/dashboard/users/"}
            />
          </div>
          <div className="flex flex-col justify-between w-full lg:mx-4 lg:overflow-x-auto h-screen ">
            <div className="">
              <Navbar
                link={"/dashboard/users/"}
                servicesCount={services.length}
                navigation={pageNavigation}
                session={session}
                user={session.user}
              />
                <div className="max-lg:mx-2 overflow-x-auto">{children}</div>
                <div className="max-lg:mx-2 overflow-x-auto my-4">{admin}</div>
             
            </div>
            <Footer />
          </div>
        </div>
      ) : (
       <div className="p-4">
         <div className="flex gap-4 p-4 justify-center items-center w-80">
          <h1>Welcome back user</h1>
          <h1>{session.user.username}</h1>
          <Image src={session.user.imageUrl} height={20} width={40} alt={session.user.imageUrl} className="rounded-full"/>
        </div>
       <div className="">
         <Logout />
       </div>
       </div>
      )}
    </>
  );
}
