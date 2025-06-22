import OrdersFilters from "@/components/orders/orders-filters";
import TableOrders from "@/components/orders/table-orders";
import TitlePages from "@/components/title-pages";
import Header from "@/components/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SetUser from "@/components/set-user";

const Pedidos = async () => {
  const verifyCookies = await cookies();
  const token = verifyCookies.has("auth");
  if (!token) {
    redirect("/login");
  }
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header />
      <SetUser />
      <main className="w-full flex flex-col p-4 gap-4">
        <TitlePages
          title="Gestión de pedidos"
          href="/pedidos/crear"
          button="Nuevo pedido"
        />
        <OrdersFilters />
        <section>
          <TableOrders />
        </section>
      </main>
    </div>
  );
};
export default Pedidos;
