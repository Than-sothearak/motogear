import { auth } from "@/auth";
import UserForm from "@/components/dashboard/UserForm";
import { redirect } from "next/navigation";

export default async function addUserPage() {
  const session = await auth();
 
  return (
    <UserForm session={session}/>
  );
}
