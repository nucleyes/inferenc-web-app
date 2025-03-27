import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import DefaultDashboard from "@/app/default-dashboard";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });

  if (!session) {
    redirect("/login");
  }

  return <DefaultDashboard />;
}
