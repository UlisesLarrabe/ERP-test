"use client";

import { useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { LOCALS } from "@/consts/locals";
import { useMovementsContext } from "@/hooks/useMovementsContext";
import { toast } from "sonner";

dayjs.extend(utc);
dayjs.extend(timezone);

const InitializeCash = () => {
  const [amount, setAmount] = useState<number | null>(0);
  const [local, setLocal] = useState(LOCALS[0]);
  const [loading, setLoading] = useState(false);
  const { postMovement, getMovements } = useMovementsContext();

  const handleSubmit = (e: React.FormEvent) => {
    if (!amount) return;
    e.preventDefault();
    setLoading(true);
    postMovement({
      local,
      amount,
      type: "income",
      payment_method: "cash",
      created_at: dayjs().tz("America/Argentina/Buenos_Aires"),
      reason: "Inicio de caja",
      client: {
        name: "Local",
        value: "local",
      },
    })
      .then(() => {
        setLoading(false);
        setAmount(0);
        toast.success("Dinero agregado correctamente");
        getMovements();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Error al agregar dinero");
      });
  };

  const isDisabled = amount === null || amount <= 0;
  return (
    <main className="flex flex-col gap-4 p-4 w-full justify-center items-center">
      <h2 className="text-3xl font-bold">Comienzo de caja</h2>
      <form className="flex flex-col gap-4 md:w-1/2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="font-bold">Ingrese el monto inicial de caja</span>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={0}
            placeholder="Monto inicial de caja"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-bold">Local</span>
          <select
            className="border border-gray-300 rounded-md p-2"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          >
            {LOCALS.map((local) => (
              <option key={local} value={local}>
                {local}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-eerie-black text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Agregando dinero..." : "Agregar dinero"}
        </button>
      </form>
    </main>
  );
};
export default InitializeCash;
