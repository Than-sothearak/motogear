import { auth } from "@/auth";
import UserForm from "@/components/UserForm";

export default async function addUserPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    redirect("/dashboard"); // Redirect non-admins
  }
  return (
    <UserForm />
  );
}
