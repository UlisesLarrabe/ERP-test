import FiltersAdmin from "@/components/box/filters-admin";
import TableBox from "@/components/box/table-box";
import Header from "@/components/header";
import TitlePages from "@/components/title-pages";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MoneySummary from "@/components/money-summary";
import SetUser from "@/components/set-user";

export default async function Caja() {
  const verifyCookies = await cookies();
  const token = verifyCookies.get("auth");
  if (!token) {
    redirect("/login");
  }
  const user = JSON.parse(token.value);
  const width = user.role === "admin" ? "w-full" : "w-full max-w-7xl mx-auto";
  return (
    <div className={width}>
      <Header />
      <SetUser />
      <main className="w-full flex flex-col p-4 gap-4">
        <TitlePages
          title="Arqueo de caja"
          href="/caja/retiro"
          button="Registrar retiro"
        />
        <MoneySummary />
        <section className="flex flex-col md:flex-row  gap-4 justify-center ">
          <FiltersAdmin />
          <TableBox />
        </section>
      </main>
    </div>
  );
}
