import { getUser } from "@/actions/users"

export async function ProfileContent () {
    // const user = await getUser(session.user.id);
    await Promise(resolve => setTimeout(resolve, ms));
  return (
    <div>My profile</div>
  )
}