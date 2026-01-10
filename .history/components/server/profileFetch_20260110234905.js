import { getUser } from "@/actions/users"

export async function ProfileContent ({session}) {
    // const user = await getUser(session.user.id);
    if (session) {
      const user =  await getUser(session.user._id)
         return (
    <div>{user.username}</div>
  )
    } return (
        <div>Login</div>
    )
   
 
}