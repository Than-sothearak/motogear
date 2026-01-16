
import { auth } from "@/auth";
import { OrderTable } from "@/components/frontend/OrderTable";
import UserProfileForm from "@/components/frontend/UserProfileForm";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
export default async function UserProfilePage() {
    await mongoDb()
    const session = await auth();
    const user = await User.findOne(
        { telegramChatId: session.user?._id },
    );

    const orders = [
        { id: "#ORD-001", date: "2025-01-10", total: "$120", status: "Completed" },
        { id: "#ORD-002", date: "2025-01-12", total: "$75", status: "Pending" },
        { id: "#ORD-003", date: "2025-01-15", total: "$210", status: "Cancelled" },
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* PROFILE GRID */}
                <UserProfileForm user={JSON.parse(JSON.stringify(user))} />

                {/* ORDERS GRID */}
                <OrderTable />
            </div>
        </div>
    );
}
