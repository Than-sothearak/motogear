import { getUser } from "@/actions/users"

export async function ProfileContent ({session}) {
    const user = await getUser(session.user.id);
  return (
    <div>{user.username}</div>
  )
}