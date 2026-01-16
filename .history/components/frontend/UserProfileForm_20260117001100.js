"use client"
import { updateClientProfile } from '@/actions/users';
import Image from 'next/image';
import React, { useActionState, useState } from 'react'

const UserProfileForm = ({ user }) => {

    const [isEdit, setIsEdit] = useState(false);
    const [profile, setProfile] = useState(user);

    const updateUserWithId = updateClientProfile.bind(null, user?._id);

    const [state, action, isPending] = useActionState(updateUserWithId,
        undefined,
    );
console.log(state)
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative z-10 w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                    <Image src={profile?.imageUrl} fill className='object-cover' alt='profile.username' />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{user.username}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
            </div>

            <form action={action} className="space-y-4">
                {["username", "email", "phone", "address"].map((field) => (
                    <div key={field}>
                        <label className="text-sm text-gray-500 capitalize">
                            {field}
                        </label>
                        {state?.errors?.field[field] && (
                            <p className="mt-1 text-lg text-red-600">
                                {state.errors.field}
                            </p>
                        )}
                        {isEdit ? (
                            <input
                                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                                name={field}
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

                   <div className="mt-6 flex gap-3">
                <button
                    onClick={() => setIsEdit(!isEdit)}
                    className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
                >
                    {isEdit ? "Cancel" : "Edit Profile"}
                </button>

                {isEdit && (
                    <button
                    type='submit'
                        disabled={isPending}
                        className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:opacity-90">
                        {isPending ? "Updating..." : "Update"}
                    </button>
                )}
            </div>
            </form>

         
        </div>
    )
}

export default UserProfileForm