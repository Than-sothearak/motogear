import { getUser } from "@/actions/users"

export async function ProfileContent ({session}) {
    // const user = await getUser(session.user.id);
    if (session) {
        await getUser(session.user._id)
    }
   
  return (
    <div>My profile</div>
  )
}