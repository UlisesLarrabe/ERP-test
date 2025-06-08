"use client";
import React from "react";
import { LOCALS } from "../consts/locals";
import { useLocalContext } from "../hooks/useLocalContext";

const HeroLocals = () => {
  const { local, setLocal } = useLocalContext();

  const onChange = (local: string) => {
    setLocal(local);
  };

  console.log(local);
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
        <option value="">Todos los locales</option>
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
