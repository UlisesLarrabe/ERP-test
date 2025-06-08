import Header from "@/components/header";
import InventoryTable from "@/components/inventory/inventory-table";
import TitlePages from "@/components/title-pages";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const verifyCookies = await cookies();
  const token = verifyCookies.get("auth");
  if (!token) {
    redirect("/login");
  }
  return (
    <>
      <Header />
      <main className="w-full flex flex-col p-4 gap-4">
        <TitlePages
          title="Inventario de helados"
          href="/inventario/agregar"
          button="Agregar sabor"
        />

        <InventoryTable />
      </main>
    </>
  );
};

export default page;
