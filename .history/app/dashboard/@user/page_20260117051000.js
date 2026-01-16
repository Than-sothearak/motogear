
import { auth } from "@/auth";
import { OrderTable } from "@/components/frontend/OrderTable";
import UserProfileForm from "@/components/frontend/UserProfileForm";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
export default async function UserProfilePage() {
    await mongoDb()
    const session = await auth();
    const user = await User.findOne(
        { email: session.user?.email },
    );
    const orders = await Order.find({userEmail: user.email})
    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* PROFILE GRID */}
                <UserProfileForm user={JSON.parse(JSON.stringify(user))} />

                {/* ORDERS GRID */}
                <OrderTable orders={JSON.parse(JSON.stringify(orders))}/>
            </div>
        </div>
    );
}
