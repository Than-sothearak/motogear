
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
    const orders = await Order.find({
        userEmail: user.email
    })
    return (
        <div className="container mx-auto p-6">
            <div className="flex h-full gap-6">

                <div className="w-1/3 h-full overflow-y-auto">
                    <UserProfileForm user={JSON.parse(JSON.stringify(user))} />
                </div>

                {/* Right: full height */}
                <div className="w-2/3 h-full">
                    <OrderTable orders={JSON.parse(JSON.stringify(orders))} />
                </div>
            </div>
        </div>
    );
}
