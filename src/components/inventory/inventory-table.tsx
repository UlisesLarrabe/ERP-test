"use client";
import { useFlavoursContext } from "@/hooks/useFlavoursContext";
import React, { useEffect } from "react";
import Link from "next/link";
import TheadBox from "../TheadBox";
import Tdescription from "../TDescription";
import { REFRIGERATORS_INFO } from "@/consts/refrigerators";
import { useLocalContext } from "@/hooks/useLocalContext";

const InventoryTable = () => {
  const { flavours } = useFlavoursContext();
  const { local } = useLocalContext();
  const { getWithFilters } = useFlavoursContext();

  const groupedByRefrigerator: { [key: string]: typeof flavours } = {};
  REFRIGERATORS_INFO.forEach(({ value }) => {
    groupedByRefrigerator[value] = flavours.filter(
      (flavour) => flavour.refrigerator === value
    );
  });
  const noCategory = flavours.filter((flavour) => !flavour.refrigerator);

  useEffect(() => {
    getWithFilters({ local });
  }, [local]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TheadBox title="Nombre" />
            <TheadBox title="Stock" />
            <TheadBox title="Local" />
            <TheadBox title="Acciones" />
          </tr>
        </thead>
        {REFRIGERATORS_INFO.map(
          ({ value, title }) =>
            groupedByRefrigerator[value].length > 0 && (
              <tbody
                key={value}
                className="bg-white divide-y divide-gray-200 border-t-2 border-b-2 border-gray-200"
              >
                <tr>
                  <td
                    colSpan={4}
                    className="bg-gray-100 font-bold text-lg px-6 py-2"
                  >
                    {title}
                  </td>
                </tr>
                {groupedByRefrigerator[value].map((flavour) => (
                  <tr key={flavour.id}>
                    <Tdescription>{flavour.name}</Tdescription>
                    <Tdescription>
                      {flavour.stock === 0 ? (
                        <span className="text-red-500">Sin stock</span>
                      ) : (
                        flavour.stock
                      )}
                    </Tdescription>
                    <Tdescription>{flavour.local}</Tdescription>
                    <Tdescription>
                      <Link
                        href={`/inventario/${flavour.id}`}
                        className="border-b-2 cursor-pointer"
                      >
                        Editar
                      </Link>
                    </Tdescription>
                  </tr>
                ))}
              </tbody>
            )
        )}
        {noCategory.length > 0 && (
          <tbody className="bg-white divide-y divide-gray-200 border-t-2 border-b-2 border-gray-200">
            <tr>
              <td
                colSpan={4}
                className="bg-gray-100 font-bold text-lg px-6 py-2"
              >
                Sin categoría (?)
              </td>
            </tr>
            {noCategory.map((flavour) => (
              <tr key={flavour.id}>
                <Tdescription>{flavour.name}</Tdescription>
                <Tdescription>
                  {flavour.stock === 0 ? (
                    <span className="text-red-500">Sin stock</span>
                  ) : (
                    flavour.stock
                  )}
                </Tdescription>
                <Tdescription>{flavour.local}</Tdescription>
                <Tdescription>
                  <Link
                    href={`/inventario/${flavour.id}`}
                    className="border-b-2 cursor-pointer"
                  >
                    Editar
                  </Link>
                </Tdescription>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default InventoryTable;
