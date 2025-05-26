import Link from "next/link";
import React from "react";

export const Shortcuts = () => {
  return (
    <article className="p-2 border border-gray-300 rounded-lg flex flex-col gap-6 md:w-1/2">
      <h3 className="font-bold text-xl">Acciones Rápidas</h3>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-2">
          <Link
            href="/pedidos/crear"
            className="bg-eerie-black text-snow rounded-lg p-2 w-1/2 flex justify-center items-center"
          >
            Nuevo Pedido
          </Link>
          <Link
            href="/inventario"
            className="bg-snow text-eerie-black rounded-lg p-2 w-1/2 flex justify-center items-center border border-eerie-black"
          >
            Gestionar Stock
          </Link>
        </div>

        <div className="flex gap-2">
          <Link
            href="/inventario/agregar"
            className="bg-snow text-eerie-black rounded-lg p-2 w-1/2 flex justify-center items-center border border-eerie-black"
          >
            Agregar Sabor
          </Link>
          <Link
            href="/caja/retiro"
            className="bg-snow text-eerie-black rounded-lg p-2 w-1/2 flex justify-center items-center border border-eerie-black"
          >
            Registrar Retiro
          </Link>
        </div>
      </div>
    </article>
  );
};
