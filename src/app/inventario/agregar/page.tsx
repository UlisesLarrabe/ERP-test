import { Toaster } from "sonner";
import Header from "@/components/header";
import GoBackSection from "@/components/go-back-section";
import FlavourForm from "@/components/inventory/flavour-form";

const page = () => {
  return (
    <>
      <Header />
      <Toaster />
      <main className="w-full flex flex-col p-4 gap-4">
        <GoBackSection href="/inventario" title="Agregar nuevo sabor" />

        <FlavourForm />
      </main>
    </>
  );
};

export default page;
