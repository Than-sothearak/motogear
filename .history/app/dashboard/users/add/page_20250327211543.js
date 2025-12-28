import { auth } from "@/auth";
import UserForm from "@/components/UserForm";

export default async function addUserPage() {
  const session = await auth()
  return (
    <UserForm />
  );
}
