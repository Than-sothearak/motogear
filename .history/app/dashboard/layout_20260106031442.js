import { auth } from "@/auth";
import Sidebar from "@/components/layout/Sidebar";
import { pageNavigation, userNavigation } from "@/lib/navLinks";
import Footer from "@/components/layout/Footer";
import { Service } from "@/models/Service";
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import Logout from "@/components/auth/Logout";
import Link from "next/link";



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
      //  <div>
      //    <div className="flex gap-4 w-full p-4 justify-center items-center">
      //     <div>Welcome back user</div>
      //     <h1>{session.user.username}</h1>
      //     <Image src={session.user.imageUrl} height={20} width={40} alt={session.user.imageUrl} className="rounded-full"/>
      //   </div>
      //   <Logout />
      //  </div>

      <nav className="sticky top-0 z-40 bg-background w-full flex flex-col gap-1 pt-1">
			<div className="flex items-center justify-between px-5 py-1">
				<Link href="/">
					<div className="flex items-center gap-1 ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
							/>
						</svg>
						Telegram Auth
					</div>
				</Link>
				<div className="flex items-center justify-center gap-3">
					<div>
						
					</div>
					{/* <SignInButton botUsername={process.env.BOT_USERNAME} /> */}
				</div>
			</div>
			
		</nav>
      )}
    </>
  );
}
