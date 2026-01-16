"use client"
import React, { useState } from 'react'

const UserProfileForm = ({user}) => {

    const [isEdit, setIsEdit] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "+855 123 456",
        address: "Phnom Penh, Cambodia",
    });
    return (
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
    )
}

export default UserProfileForm