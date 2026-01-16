
import { auth } from "@/auth";
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* PROFILE GRID */}
                <UserProfileForm user={JSON.parse(JSON.stringify(user))} />

                {/* ORDERS GRID */}
                <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Order History</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-gray-500">
                                    <th className="text-left py-2">Order ID</th>
                                    <th className="text-left py-2">Date</th>
                                    <th className="text-left py-2">Total</th>
                                    <th className="text-left py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b last:border-0">
                                        <td className="py-3 font-medium">{order.id}</td>
                                        <td>{order.date}</td>
                                        <td>{order.total}</td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs ${order.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
