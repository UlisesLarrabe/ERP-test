import OrdersFilters from "@/components/orders/orders-filters";
import TableOrders from "@/components/orders/table-orders";
import TitlePages from "@/components/title-pages";

const Pedidos = () => {
  return (
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
  );
};
export default Pedidos;
