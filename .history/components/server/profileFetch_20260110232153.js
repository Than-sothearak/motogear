import { auth } from "@/auth"
import { Test } from "../frontend/Test"

export async function ProfileContent ({session}) {

 
  return <Test session ={session} />
}