"use client";
import React, { useEffect } from "react";
import { LOCALS } from "../consts/locals";
import { useLocalContext } from "../hooks/useLocalContext";
import dayjs from "dayjs";
import { useMovementsContext } from "../hooks/useMovementsContext";

const HeroLocals = () => {
  const { local, setLocal } = useLocalContext();
  const { getMovementsByDateAndLocal } = useMovementsContext();

  const onChange = (local: string) => {
    setLocal(local);
  };

  useEffect(() => {
    const today = dayjs()
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");
    getMovementsByDateAndLocal(today, local);
  }, [local]);
  return (
    <div className="w-full p-4 border border-gray-300 rounded-md">
      <label
        htmlFor="local-select"
        className="block mb-2 text-sm font-medium text-eerie-black"
      >
        Filtrar por local
      </label>
      <select
        id="local-select"
        className="block border w-full rounded-md border-eerie-black text-eerie-black"
        value={local}
        onChange={(e) => onChange(e.target.value)}
      >
        {LOCALS.map((local) => (
          <option key={local} value={local}>
            {local}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeroLocals;
