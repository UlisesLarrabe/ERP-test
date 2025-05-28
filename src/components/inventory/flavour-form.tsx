"use client";
import { LOCALS } from "@/consts/locals";
import { REFRIGERATORS_INFO } from "@/consts/refrigerators";
import { useFlavoursContext } from "@/hooks/useFlavoursContext";
import React, { useState } from "react";
import { toast } from "sonner";

const FlavourForm = () => {
  const [local, setLocal] = useState(LOCALS[0]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [refrigerator, setRefrigerator] = useState(REFRIGERATORS_INFO[0].value);
  const isDisabled = loading || !name || stock === null;
  const { addFlavour } = useFlavoursContext();
  const handleSubmit = async (e: React.FormEvent) => {
    if (stock === null) return;
    e.preventDefault();
    setLoading(true);
    addFlavour({
      name,
      stock: Number(stock),
      local,
      refrigerator,
    })
      .then(() => {
        setName("");
        setStock(0);
        toast.success("Sabor agregado correctamente");
      })
      .catch(() => {
        toast.error("Ocurrió un error al agregar el sabor");
      });
    setLoading(false);
  };
  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <form className="flex flex-col gap-4 w-1/2 p-2 border border-eerie-black rounded-lg">
        <label className="flex flex-col gap-1">
          <span>Nombre</span>
          <input
            type="text"
            placeholder="Nombre del sabor"
            className="border border-eerie-black rounded-lg px-4 py-2"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Stock</span>
          <input
            type="number"
            placeholder="Stock del sabor"
            className="border border-eerie-black rounded-lg px-4 py-2"
            onChange={(e) =>
              setStock(e.target.value === "" ? null : Number(e.target.value))
            }
            value={stock === null ? "" : stock}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Local</span>
          <select
            name="local"
            id="local"
            className="border border-eerie-black rounded-lg px-4 py-2"
            onChange={(e) => setLocal(e.target.value)}
            value={local}
          >
            {LOCALS.map((local) => (
              <option key={local} value={local}>
                {local}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span>Categoría de freezer</span>
          <select
            className="border border-eerie-black rounded-lg px-4 py-2"
            value={refrigerator}
            onChange={(e) => setRefrigerator(e.target.value)}
          >
            {REFRIGERATORS_INFO.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.title}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-eerie-black text-snow px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {loading ? "Cargando..." : "Agregar sabor"}
        </button>
      </form>
    </section>
  );
};

export default FlavourForm;
