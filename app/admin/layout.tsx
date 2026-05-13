import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If there is no session or the user is not an admin, redirect to home page
  if (!session || !(session.user as any)?.isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
