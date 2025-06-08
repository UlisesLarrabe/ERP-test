import { LOCALS } from "@/consts/locals";
import { useMovementsContext } from "@/hooks/useMovementsContext";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "sonner";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const FormOutcome = () => {
  const [local, setLocal] = useState(LOCALS[0]);
  const [amount, setAmount] = useState<number | null>(0);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { postMovement } = useMovementsContext();

  const isDisabled = amount === null || reason === "" || loading;

  const handleSubmit = (e: React.FormEvent) => {
    if (amount === null) return;
    e.preventDefault();
    setLoading(true);
    postMovement({
      local,
      amount: Number(amount),
      reason,
      type: "outcome",
      payment_method: "cash",
      created_at: dayjs().tz("America/Argentina/Buenos_Aires"),
      client: {
        name: "Local",
        value: "local",
      },
    })
      .then(() => {
        setLoading(false);
        setAmount(0);
        setReason("");
        toast.success("Registro guardado correctamente");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Error al guardar el registro");
      });
  };
  return (
    <section className="flex flex-col justify-center items-center gap-4 ">
      <div className=" border border-eerie-black p-4 rounded-lg">
        <div>
          <h2 className="text-3xl font-semibold">Retiro de Efectivo</h2>
          <p className="text-gray-700">
            Complete el formulario para registrar un retiro de dinero en la caja
          </p>
        </div>

        <form className="flex flex-col gap-4 w-full " onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Local</span>
            <select
              className="border border-eerie-black rounded-lg p-2"
              name="local"
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
          <label className="flex flex-col gap-2">
            <span className="font-medium">Monto a retirar ($)</span>
            <input
              type="number"
              placeholder="0"
              className="border border-eerie-black rounded-lg p-2"
              min={0}
              value={amount === null ? "" : amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Motivo del retiro</span>
            <textarea
              placeholder="Describa el motivo del retiro"
              className="border border-eerie-black rounded-lg p-2 field-sizing-content resize-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={isDisabled}
            className="bg-eerie-black text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registrando retiro..." : "Registrar retiro"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormOutcome;
