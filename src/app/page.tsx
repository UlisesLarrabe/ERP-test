"use client";
import { Client } from "@/consts/clients";
import { useOrdersContext } from "@/hooks/useOrdersContext";
import { createClient } from "@/utils/supabase/client";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
interface Order {
  id?: string;
  local: string;
  totalPrice: number;
  paymentMethod: "cash" | "mercado_pago" | "card";
  description: {
    item: string;
    quantity: number;
    type: string;
  }[];
  createdAt: Dayjs;
  client: Client;
}

export default function Home() {
  const { orders } = useOrdersContext();
  console.log(orders);

  return (
    <div>
      {orders?.map((order) => (
        <div key={order.id}>
          <p>{order.paymentMethod}</p>
          <p>{order.totalPrice}</p>
          <p>{order.local}</p>
        </div>
      ))}
    </div>
  );
}
