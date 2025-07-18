import Navbar from "@/components/Navbar";
import { getActiveUser } from "@/utils/getActiveUser";
import { redirect } from "next/navigation";

export default async function EventLayout({ children }) {
  const user = await getActiveUser();

  if (!user) {
    redirect("/");
  }

  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
