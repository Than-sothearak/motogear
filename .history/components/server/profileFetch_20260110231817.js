import { auth } from "@/auth"
import { Test } from "../frontend/Test"

export async function ProfileContent () {
  const session = await auth()
 
  return <Test session ={session} />
}