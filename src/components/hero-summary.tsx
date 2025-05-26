"use client";
import React, { useEffect, useState } from "react";
import SummaryArticle from "./summary-article";
import CashIcon from "@/icons/cash-icon";
import MercadoPagoIcon from "@/icons/mercadopago-icon";
import ReceiptIcon from "@/icons/receipt-icon";
import CardIcon from "@/icons/card-icon";
import dayjs from "dayjs";
import { createClient } from "@/utils/supabase/client";

interface SummaryData {
  payment_method: string;
  total: number;
}

interface TotalData {
  total_in: number;
}

interface TotalOutData {
  total_out: number;
}

const HeroSummary = () => {
  const [summaryData, setSummaryData] = useState<SummaryData[]>([]);
  const [totalIn, setTotalIn] = useState<TotalData[]>([
    {
      total_in: 0,
    },
  ]);
  const [totalOut, setTotalOut] = useState<TotalOutData[]>([
    {
      total_out: 0,
    },
  ]);

  const supabase = createClient();
  const summary = async () => {
    const { data, error } = await supabase.rpc(
      "get_counts_of_payment_methods",
      {
        date_input: dayjs()
          .tz("America/Argentina/Buenos_Aires")
          .format("YYYY-MM-DD"),
      }
    );
    if (error) {
      throw new Error(error.message);
    }
    if (data.length > 0) {
      setSummaryData(data);
    }
  };

  const summaryTotal = async () => {
    const { data, error } = await supabase.rpc("get_total_of_movements", {
      date_input: dayjs()
        .tz("America/Argentina/Buenos_Aires")
        .format("YYYY-MM-DD"),
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data[0].total_in != null) {
      setTotalIn(data);
    }
  };

  const summaryTotalOut = async () => {
    const { data, error } = await supabase.rpc("get_total_out_of_movements", {
      date_input: dayjs()
        .tz("America/Argentina/Buenos_Aires")
        .format("YYYY-MM-DD"),
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data[0].total_out != null) {
      setTotalOut(data);
    }
  };

  useEffect(() => {
    summary();
    summaryTotal();
    summaryTotalOut();
  }, []);

  return (
    <section className="flex flex-col md:flex-row w-full min-h-28 gap-4">
      <SummaryArticle
        title="Ganancias totales"
        price={totalIn[0].total_in}
        info={`Después de retiros $${
          totalIn[0].total_in - totalOut[0].total_out
        }`}
      >
        <ReceiptIcon />
      </SummaryArticle>

      <SummaryArticle
        title="Ventas totales con Mercado Pago"
        price={
          summaryData.find((item) => item.payment_method === "mercado_pago")
            ?.total || 0
        }
        isNotPrice={true}
      >
        <MercadoPagoIcon />
      </SummaryArticle>
      <SummaryArticle
        title="Ventas totales en efectivo"
        price={
          summaryData.find((item) => item.payment_method === "cash")?.total || 0
        }
        isNotPrice={true}
      >
        <CashIcon />
      </SummaryArticle>

      <SummaryArticle
        title="Ventas totales con tarjeta"
        price={
          summaryData.find((item) => item.payment_method === "card")?.total || 0
        }
        isNotPrice={true}
      >
        <CardIcon />
      </SummaryArticle>
    </section>
  );
};

export default HeroSummary;
