"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LOCALS } from "@/consts/locals";
import { useMovementsContext } from "@/hooks/useMovementsContext";

dayjs.extend(utc);
dayjs.extend(timezone);

const ChartFilters = () => {
  const currentMonth = dayjs()
    .tz("America/Argentina/Buenos_Aires")
    .format("YYYY-MM");
  const [month, setMonth] = useState(currentMonth);
  const [local, setLocal] = useState("all");
  const { getMonthSummary, getMonthSummaryTotal } = useMovementsContext();

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    const monthSelected = dayjs(month).format("MM");
    const yearSelected = dayjs(month).format("YYYY");
    const firstDayOfMonth = dayjs(`${yearSelected}-${monthSelected}-01`)
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");
    await getMonthSummary(firstDayOfMonth);
    await getMonthSummaryTotal(firstDayOfMonth);
  };

  return (
    <form
      className="p-2 border flex flex-col border-gray-300 rounded-lg min-w-3xs min-h-32 gap-2 md:w-1/2  bg-white shadow"
      onSubmit={handleFilter}
    >
      <h2 className="text-2xl font-semibold">Filtros</h2>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="month">
          Mes
        </label>
        <input
          type="month"
          name="month"
          id="month"
          className="p-2 border border-gray-300 rounded-lg"
          value={month}
          onChange={(e) =>
            setMonth(
              dayjs(e.target.value)
                .tz("America/Argentina/Buenos_Aires")
                .format("YYYY-MM")
            )
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="local">
          Local
        </label>
        <select
          name="local"
          id="local"
          className="p-2 border border-gray-300 rounded-lg"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        >
          <option value="all">Todos los locales</option>
          {LOCALS.map((localOption) => (
            <option key={localOption} value={localOption}>
              {localOption}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-eerie-black text-snow px-4 py-2 rounded-lg mt-2 hover:bg-eerie-black/80 transition-colors"
      >
        Aplicar filtros
      </button>
    </form>
  );
};

export default ChartFilters;
