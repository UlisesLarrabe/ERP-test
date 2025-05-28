import Header from "@/components/header";
import InventoryFilters from "@/components/inventory/inventory-filters";
import InventoryTable from "@/components/inventory/inventory-table";
import TitlePages from "@/components/title-pages";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const verifyCookies = await cookies();
  const token = verifyCookies.has("auth");
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

        <InventoryFilters />
        <InventoryTable />
      </main>
    </>
  );
};

export default page;
