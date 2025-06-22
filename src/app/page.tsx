import Header from "@/components/header";
import Hero from "@/components/hero";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const verifyCookies = await cookies();
  const token = verifyCookies.get("auth");
  if (!token) {
    redirect("/login");
  }
  const user = JSON.parse(token.value);
  return (
    <main className="w-full max-w-7xl mx-auto">
      <Header />
      <Hero user={user} />
    </main>
  );
}
