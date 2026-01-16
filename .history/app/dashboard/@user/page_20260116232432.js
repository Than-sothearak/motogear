"use client";

import { useState } from "react";

export default function UserProfilePage() {
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+855 123 456",
    address: "Phnom Penh, Cambodia",
  });

  const orders = [
    { id: "#ORD-001", date: "2025-01-10", total: "$120", status: "Completed" },
    { id: "#ORD-002", date: "2025-01-12", total: "$75", status: "Pending" },
    { id: "#ORD-003", date: "2025-01-15", total: "$210", status: "Cancelled" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* PROFILE GRID */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
              JD
            </div>
            <div>
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            {["name", "email", "phone", "address"].map((field) => (
              <div key={field}>
                <label className="text-sm text-gray-500 capitalize">
                  {field}
                </label>
                {isEdit ? (
                  <input
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    value={profile[field]}
                    onChange={(e) =>
                      setProfile({ ...profile, [field]: e.target.value })
                    }
                  />
                ) : (
                  <p className="mt-1 text-sm">{profile[field]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
            >
              {isEdit ? "Cancel" : "Edit Profile"}
            </button>

            {isEdit && (
              <button className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:opacity-90">
                Update
              </button>
            )}
          </div>
        </div>

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
                        className={`px-3 py-1 rounded-full text-xs ${
                          order.status === "Completed"
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
