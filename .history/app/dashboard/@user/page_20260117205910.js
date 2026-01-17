import { auth } from "@/auth";
import { OrderTable } from "@/components/frontend/OrderTable";
import UserProfileForm from "@/components/frontend/UserProfileForm";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import Link from "next/link";
export default async function UserProfilePage({ searchParams }) {
  await mongoDb();
  const session = await auth();
  const user = await User.findOne({ email: session.user?.email });
 const {p} = await searchParams
  console.log(p)
  const page = 1

  const ITEM_PER_PAGE = 10;

  const orders = await Order.find({ userEmail: user.email })
    .sort({ createAt: -1 })
    .limit(ITEM_PER_PAGE)
    .skip(ITEM_PER_PAGE * (page - 1));

      const totalOrders = await Order.countDocuments({ userEmail: user.email });
  const hasMore = page * ITEM_PER_PAGE < totalOrders;

  return (
    <div className="container mx-auto h-full ">
      <div className="max-sm:flex-wrap gap-6 lg:flex max-lg:space-y-4">
        {/* PROFILE GRID */}
        <UserProfileForm user={JSON.parse(JSON.stringify(user))} />

        {/* ORDERS GRID */}
        <OrderTable orders={JSON.parse(JSON.stringify(orders))} />
        
        

      </div>
    </div>
  );
}
