"use client";
import { LOCALS } from "@/consts/locals";
import { useFlavoursContext } from "@/hooks/useFlavoursContext";
import React, { useEffect } from "react";

const InventoryFilters = () => {
  const { getWithFilters } = useFlavoursContext();
  const handleFilterChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    await getWithFilters({ local: e.target.value });
  };

  useEffect(() => {
    getWithFilters({ local: LOCALS[0] });
  }, []);

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="font-semibold text-2xl">Filtros</h2>
      <div className="flex w-full gap-2">
        <div className="flex flex-col w-1/2">
          <label className="font-semibold text-sm" htmlFor="local">
            Local
          </label>
          <select
            name="local"
            id="local"
            className="p-2 border border-gray-300 rounded-lg"
            onChange={handleFilterChange}
          >
            {LOCALS.map((local) => (
              <option key={local} value={local}>
                {local}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default InventoryFilters;
