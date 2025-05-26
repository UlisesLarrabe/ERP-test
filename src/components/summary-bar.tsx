"use client";
import React, { useEffect, useState } from "react";
import { useMovementsContext } from "@/hooks/useMovementsContext";
import ProgressInfo from "./progress-info";

export const SummaryBar = () => {
  const { allMovements: movements } = useMovementsContext();
  const [cashPercentage, setCashPercentage] = useState(0);
  const [mercadoPagoPercentage, setMercadoPagoPercentage] = useState(0);
  const [cardPercentage, setCardPercentage] = useState(0);

  useEffect(() => {
    const movementsLength = movements.length === 0 ? 1 : movements.length;

    const cash = movements.filter(
      (movement) => movement.payment_method === "cash"
    ).length;
    const mercadoPago = movements.filter(
      (movement) => movement.payment_method === "mercado_pago"
    ).length;

    const cashPercentageEffect = Number(
      ((cash / movementsLength) * 100).toFixed(1)
    );
    const mercadoPagoPercentageEffect = Number(
      ((mercadoPago / movementsLength) * 100).toFixed(1)
    );

    const card = movements.filter(
      (movement) => movement.payment_method === "card"
    ).length;
    const cardPercentageEffect = Number(
      ((card / movementsLength) * 100).toFixed(1)
    );

    setCashPercentage(cashPercentageEffect);
    setMercadoPagoPercentage(mercadoPagoPercentageEffect);
    setCardPercentage(cardPercentageEffect);
  }, [movements]);

  return (
    <article className="p-4 border border-gray-300 rounded-lg flex flex-col gap-6 md:w-1/2 ">
      <h3 className="text-xl font-bold ">
        Resumen de Ventas por Método de Pago
      </h3>

      <main className="flex flex-col gap-2">
        <ProgressInfo title="Efectivo" percentage={cashPercentage} />
        <ProgressInfo title="Mercado Pago" percentage={mercadoPagoPercentage} />
        <ProgressInfo title="Tarjeta" percentage={cardPercentage} />
      </main>
    </article>
  );
};
