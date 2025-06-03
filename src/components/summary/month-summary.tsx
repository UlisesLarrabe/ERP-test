"use client";

import { useMovementsContext } from "@/hooks/useMovementsContext";
import CashIcon from "@/icons/cash-icon";
import CardIcon from "@/icons/card-icon";
import MercadoPagoIcon from "@/icons/mercadopago-icon";
import ReceiptIcon from "@/icons/receipt-icon";
import SummaryArticle from "../summary-article";

const MonthSummary = () => {
  const { monthSummary, monthSummaryTotal } = useMovementsContext();

  return (
    <section className="flex flex-col md:flex-row w-full gap-6 justify-center items-center">
      <SummaryArticle title="Efectivo" price={monthSummary[0]?.total || 0}>
        <CashIcon />
      </SummaryArticle>
      <SummaryArticle title="Tarjeta" price={monthSummary[1]?.total || 0}>
        <CardIcon />
      </SummaryArticle>
      <SummaryArticle title="Mercado Pago" price={monthSummary[2]?.total || 0}>
        <MercadoPagoIcon />
      </SummaryArticle>
      <SummaryArticle title="Total" price={monthSummaryTotal[0]?.total || 0}>
        <ReceiptIcon />
      </SummaryArticle>
    </section>
  );
};
export default MonthSummary;
