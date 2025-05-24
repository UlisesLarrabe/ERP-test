"use client";
import dayjs, { Dayjs } from "dayjs";
import { createContext, useEffect, useState } from "react";
import { type Client } from "@/consts/clients";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createClient } from "@/utils/supabase/client";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Order {
  id?: string;
  local: string;
  total_price: number;
  payment_method: "cash" | "mercado_pago" | "card";
  description: {
    item: string;
    quantity: number;
    type: string;
  }[];
  created_at: Dayjs;
  client: Client;
}

interface OrdersContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  addOrder: (order: Order) => Promise<void>;
  getOrdersByLocal: (local: string) => Promise<void>;
  getOrdersByDate: (date: string) => Promise<void>;
  getByDateAndLocal: (date: string, local: string) => Promise<void>;
  deleteOrderById: (id: string) => Promise<void>;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined
);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const today = dayjs().format("YYYY-MM-DD");
  const supabase = createClient();
  useEffect(() => {
    getOrdersByDate(today);
  }, []);

  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = async (order: Order) => {
    const { data, error } = await supabase.from("orders").insert(order);
    if (error || data != null) {
      throw new Error("Error al agregar el pedido");
    }
  };

  const getOrdersByDate = async (date: string) => {
    const { data, error } = await supabase.rpc("get_orders_by_date", {
      date_input: date,
    });

    if (error) {
      throw new Error("Error al obtener los pedidos");
    }
    setOrders(data);
  };

  const getOrdersByLocal = async (local: string) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("local", local);
    if (error) {
      throw new Error("Error al obtener los pedidos");
    }
    setOrders(data);
  };

  const getByDateAndLocal = async (date: string, local: string) => {
    const { data, error } = await supabase.rpc("get_orders_by_date_and_local", {
      date_input: date,
      local_input: local,
    });
    if (error) {
      throw new Error("Error al obtener los pedidos");
    }
    setOrders(data);
  };

  const deleteOrderById = async (id: string) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) {
      throw new Error("Error al eliminar el pedido");
    }
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        addOrder,
        getOrdersByLocal,
        getOrdersByDate,
        getByDateAndLocal,
        deleteOrderById,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
