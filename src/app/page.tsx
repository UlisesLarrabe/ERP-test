import Header from "@/components/header";
import Hero from "@/components/hero";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const verifyCookies = await cookies();
  const token = verifyCookies.has("auth");
  if (!token) {
    redirect("/login");
  }
  return (
    <main>
      <Header />
      <Hero />
    </main>
  );
}
