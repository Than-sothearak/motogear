"use server"
import { auth } from "@/auth";
import { OrderTable } from "@/components/frontend/OrderTable";
import UserProfileForm from "@/components/frontend/UserProfileForm";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";

export async function getOrders(page, user) {

    await mongoDb();
    const ITEM_PER_PAGE = 2;
    const orders = await Order.find({ userEmail: user.email })
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1))
        .sort({
            updatedAt: -1
        })


    const totalOrders = await Order.countDocuments({ userEmail: user.email });
    const hasMore = page * ITEM_PER_PAGE < totalOrders;
    return { orders: JSON.parse(JSON.stringify(orders)), hasMore: JSON.parse(JSON.stringify(hasMore)) }
}
export default async function UserProfilePage({ searchParams }) {

    const session = await auth();
    const user = await User.findOne({ email: session.user?.email });
    const page = 1
    const { orders, hasMore } = await getOrders(page, user)

    return (
        <div className="container mx-auto h-full ">
            <div className="max-sm:flex-wrap gap-6 lg:flex max-lg:space-y-4">
                {/* PROFILE GRID */}
                <UserProfileForm user={JSON.parse(JSON.stringify(user))} />

                {/* ORDERS GRID */}
                <OrderTable
                    initialOrders={orders}
                    page={page}
                    user={JSON.parse(JSON.stringify(user))}
                    initialHasMore={hasMore} />



            </div>
        </div>
    );
}
