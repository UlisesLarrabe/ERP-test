"use client";
import React, { useEffect, useState } from "react";
import SummaryArticle from "./summary-article";
import { useMovementsContext } from "@/hooks/useMovementsContext";
import CashIcon from "@/icons/cash-icon";
import MercadoPagoIcon from "@/icons/mercadopago-icon";
import ReceiptIcon from "@/icons/receipt-icon";
import CardIcon from "@/icons/card-icon";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";

const MoneySummary = () => {
  const { movements } = useMovementsContext();
  const [cash, setCash] = useState(0);
  const [mercado_pago, setMercado_pago] = useState(0);
  const [card, setCard] = useState(0);
  const [total_out, setTotal_out] = useState(0);
  const [total_in, setTotal_in] = useState(0);
  const [summaryData, setSummaryData] = useState([
    { payment_method: "cash", total: 0 },
    { payment_method: "mercado_pago", total: 0 },
    { payment_method: "card", total: 0 },
  ]);

  const supabase = createClient();
  const summary = async () => {
    const { data, error } = await supabase.rpc("get_summary_of_amounts", {
      date_input: dayjs()
        .tz("America/Argentina/Buenos_Aires")
        .format("YYYY-MM-DD"),
    });
    if (error) {
      throw new Error(error.message);
    }
    setSummaryData(data);
  };

  useEffect(() => {
    summary();
  }, [movements]);

  useEffect(() => {
    const cash = summaryData.find(
      (item) => item.payment_method === "cash"
    )?.total;
    const mercado_pago = summaryData.find(
      (item) => item.payment_method === "mercado_pago"
    )?.total;
    const card = summaryData.find(
      (item) => item.payment_method === "card"
    )?.total;
    setCash(cash || 0);
    setMercado_pago(mercado_pago || 0);
    setCard(card || 0);
    const total_out = movements
      .filter((movement) => movement.type === "outcome")
      .reduce((acc, movement) => acc + movement.amount, 0);
    setTotal_out(total_out);
    const total_in = movements
      .filter((movement) => movement.type === "income")
      .reduce((acc, movement) => acc + movement.amount, 0);
    setTotal_in(total_in);
  }, [summary]);

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
