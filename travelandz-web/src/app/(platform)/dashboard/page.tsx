import { auth } from "@/auth.config";
import { LogoutButton } from "@/components/LogoutButton/LogoutButton";

export default async function Dashboard() {
  const session = (await auth())!;
  return (
    <div className="flex flex-col gap-8">
      Dashboard
      {session.user.userData.username}
      <LogoutButton>Logout</LogoutButton>
    </div>
  );
}
