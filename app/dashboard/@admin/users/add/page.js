import { auth } from "@/auth";
import UserForm from "@/components/dashboard/UserForm";

export default async function addUserPage() {
  const session = await auth();
 
  return (
    <UserForm session={session}/>
  );
}
