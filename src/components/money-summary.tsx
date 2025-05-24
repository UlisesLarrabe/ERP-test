"use client";
import React, { useEffect, useState } from "react";
import SummaryArticle from "./summary-article";
import { useMovementsContext } from "@/hooks/useMovementsContext";
import CashIcon from "@/icons/cash-icon";
import MercadoPagoIcon from "@/icons/mercadopago-icon";
import ReceiptIcon from "@/icons/receipt-icon";
import CardIcon from "@/icons/card-icon";

const MoneySummary = () => {
  const { movements } = useMovementsContext();
  const [cash, setCash] = useState(0);
  const [mercado_pago, setMercado_pago] = useState(0);
  const [card, setCard] = useState(0);
  const [total_out, setTotal_out] = useState(0);
  const [total_in, setTotal_in] = useState(0);

  console.log(movements);

  useEffect(() => {
    const cash = movements
      .filter(
        (movement) =>
          movement.type === "income" && movement.payment_method === "cash"
      )
      .reduce((acc, movement) => acc + movement.amount, 0);
    const mercado_pago = movements
      .filter(
        (movement) =>
          movement.type === "income" &&
          movement.payment_method === "mercado_pago"
      )
      .reduce((acc, movement) => acc + movement.amount, 0);

    const card = movements
      .filter(
        (movement) =>
          movement.type === "income" && movement.payment_method === "card"
      )
      .reduce((acc, movement) => acc + movement.amount, 0);

    const total_out = movements
      .filter((movement) => movement.type === "outcome")
      .reduce((acc, movement) => acc + movement.amount, 0);
    const total_in = movements
      .filter((movement) => movement.type === "income")
      .reduce((acc, movement) => acc + movement.amount, 0);

    setCash(cash);
    setMercado_pago(mercado_pago);
    setCard(card);
    setTotal_out(total_out);
    setTotal_in(total_in);
  }, [movements]);

  return (
    <section className="flex flex-col md:flex-row w-full gap-4">
      <SummaryArticle
        title="Efectivo"
        price={cash}
        info={`Después de retiros: $${cash - total_out}`}
      >
        <CashIcon />
      </SummaryArticle>
      <SummaryArticle title="Mercado Pago" price={mercado_pago}>
        <MercadoPagoIcon />
      </SummaryArticle>
      <SummaryArticle title="Tarjeta" price={card}>
        <CardIcon />
      </SummaryArticle>
      <SummaryArticle
        title="Total Ingresos"
        price={total_in}
        info={`Total después de retiros: $${total_in - total_out}`}
      >
        <ReceiptIcon />
      </SummaryArticle>
    </section>
  );
};

export default MoneySummary;
