"use client";
import dayjs from "dayjs";
import React, { useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LOCALS } from "@/consts/locals";
import { useMovementsContext } from "@/hooks/useMovementsContext";
import { paymentsOptions } from "@/consts/payments-options";

dayjs.extend(utc);
dayjs.extend(timezone);

const BoxFilters = () => {
  const { getMovementsWithFilters, getMovementsByDateAndLocalAndType } =
    useMovementsContext();
  const today = dayjs()
    .tz("America/Argentina/Buenos_Aires")
    .format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [type, setType] = useState("income");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [local, setLocal] = useState(LOCALS[0]);

  const handleFilter = async () => {
    console.log(
      dayjs(date).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD"),
      local,
      type,
      paymentMethod
    );
    if (paymentMethod === "all") {
      await getMovementsByDateAndLocalAndType(
        dayjs(date).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD"),
        local,
        type
      );
    } else {
      await getMovementsWithFilters(
        dayjs(date).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD"),
        local,
        type,
        paymentMethod
      );
    }
  };

  return (
    <div className="p-2 border flex justify-center  flex-col border-gray-300 rounded-lg min-w-3xs min-h-32 gap-2 w-full md:w-1/3">
      <h2 className="text-2xl font-semibold">Filtros</h2>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="date">
          Fecha
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className="p-2 border border-gray-300 rounded-lg"
          value={date}
          onChange={(e) =>
            setDate(
              dayjs(e.target.value)
                .tz("America/Argentina/Buenos_Aires")
                .format("YYYY-MM-DD")
            )
          }
        />
        <label className="text-sm font-semibold" htmlFor="type">
          Tipo
        </label>
        <select
          name="type"
          id="type"
          className="p-2 border border-gray-300 rounded-lg"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Ingreso</option>
          <option value="outcome">Egreso</option>
        </select>
        <label className="text-sm font-semibold" htmlFor="paymentMethod">
          Método de pago
        </label>
        <select
          name="paymentMethod"
          id="paymentMethod"
          className="p-2 border border-gray-300 rounded-lg"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="all">Todos</option>
          {paymentsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.placeholder}
            </option>
          ))}
        </select>
        <label className="text-sm font-semibold" htmlFor="local">
          Local
        </label>
        <select
          name="local"
          id="local"
          className="p-2 border border-gray-300 rounded-lg"
          onChange={(e) => setLocal(e.target.value)}
        >
          {LOCALS.map((local) => (
            <option key={local} value={local}>
              {local}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400"
      >
        Filtrar
      </button>
    </div>
  );
};

export default BoxFilters;
