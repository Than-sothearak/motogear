import { getUser } from "@/actions/users"
import { Test } from "../frontend/Test"

export async function ProfileContent ({session}) {
    const user = await getUser();
  return (
    <div>{user.username}</div>
  )
}