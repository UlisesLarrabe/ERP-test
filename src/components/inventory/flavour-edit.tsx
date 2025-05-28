import React from "react";
import { Toaster } from "sonner";
import GoBackSection from "../go-back-section";
import Header from "../header";
import EditFlavourForm from "./edit-flavour-form";
interface Flavour {
  id: number | string;
  name: string;
  stock: number;
  local: string;
  refrigerator: string;
}
const FlavourEdit = ({ flavour }: { flavour: Flavour }) => {
  return (
    <>
      <Header />
      <Toaster />
      <main className="w-full flex flex-col p-4 gap-4">
        <GoBackSection href="/inventario" title="Editar sabor" />

        <EditFlavourForm flavour={flavour} />
      </main>
    </>
  );
};

export default FlavourEdit;
