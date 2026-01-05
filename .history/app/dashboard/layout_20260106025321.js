import { auth } from "@/auth";
import Sidebar from "@/components/layout/Sidebar";
import { User } from "@/models/User";
import { pageNavigation, userNavigation } from "@/lib/navLinks";
import Footer from "@/components/layout/Footer";
import { Service } from "@/models/Service";
import { mongoDb } from "@/utils/connectDB";
import { Navbar } from "@/components/layout/Navbar";



export default async function DashboardLayout({ children, admin, user }) {
  await mongoDb();
  const session = await auth();

  const userId = await User.findOne({ _id: session?.user?._id });
  if (userId) {
    return
  }
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
                user={JSON.parse(JSON.stringify(userId))}
              />
                <div className="max-lg:mx-2 overflow-x-auto">{children}</div>
                <div className="max-lg:mx-2 overflow-x-auto my-4">{admin}</div>
             
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex">
          <div>Welcome back user</div>
        </div>
      )}
    </>
  );
}
