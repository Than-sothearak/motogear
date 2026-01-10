import { Profile } from "../frontend/Profile"

export async function ProfileContent() {
  const session = await auth()
 
  return <Profile session ={session} />
}