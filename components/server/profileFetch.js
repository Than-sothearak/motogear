import { getUser } from "@/actions/users"
import { Profile } from "../frontend/Profile"
import Link from "next/link"

export async function ProfileContent ({session}) {
    if (session) {
         return (
      <Profile session={session}/>
  )
    } return (
        <Link href={`/login`}>Login</Link>
    )
   
 
}