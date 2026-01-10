import { getUser } from "@/actions/users"
import { Profile } from "../frontend/Profile"
import Link from "next/link"

export async function ProfileContent ({session}) {
    // const user = await getUser(session.user.id);
    if (session) {
      const user =  await getUser(session.user._id)
         return (
      <Profile session={session}/>
  )
    } return (
        <Link href={`/login`}>Login</Link>
    )
   
 
}