import { getUser } from "@/actions/users"

export async function ProfileContent ({session}) {
    const user = await getUser();
  return (
    <div>{user.username}</div>
  )
}