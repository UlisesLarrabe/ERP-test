"use client";
import { useOrdersContext } from "@/hooks/useOrdersContext";
import React from "react";
import TDescription from "../TDescription";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { toast, Toaster } from "sonner";
import TheadBox from "../TheadBox";

dayjs.extend(utc);
dayjs.extend(timezone);

const TableOrders = () => {
  const { orders, deleteOrderById } = useOrdersContext();
  const handleDeleteOrder = (id: string | undefined) => {
    if (!id) return;
    deleteOrderById(id)
      .then(() => {
        toast.success("Pedido eliminado correctamente");
      })
      .catch(() => {
        toast.error("Error al eliminar el pedido");
      });
  };
  return (
    <div className="overflow-x-auto">
      <Toaster />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TheadBox title="Hora" />
            <TheadBox title="Método" />
            <TheadBox title="Monto" />
            <TheadBox title="Descripción" />
            <TheadBox title="Local" />
            <TheadBox title="Cliente" />
            <TheadBox title="Acciones" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.toReversed().map((orders) => {
            const paymentString =
              orders.payment_method === "cash"
                ? "Efectivo"
                : orders.payment_method === "mercado_pago"
                ? "Mercado Pago"
                : "Tarjeta";

            return (
              <tr key={orders.id}>
                <TDescription>
                  {dayjs(orders.created_at)
                    .tz("America/Argentina/Buenos_Aires")
                    .format("HH:mm")}
                </TDescription>

                <TDescription>{paymentString}</TDescription>
                <TDescription>${orders.total_price}</TDescription>
                <TDescription>
                  {orders.description.map((description, index) => (
                    <p key={index}>
                      {description.item} - Cantidad: {description.quantity} -
                      Tipo: {description.type}
                    </p>
                  ))}
                </TDescription>
                <TDescription>{orders.local}</TDescription>
                <TDescription>{orders.client?.name}</TDescription>
                <TDescription>
                  <button
                    onClick={() => handleDeleteOrder(orders.id)}
                    className="bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:bg-red-400"
                  >
                    Eliminar
                  </button>
                </TDescription>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrders;
