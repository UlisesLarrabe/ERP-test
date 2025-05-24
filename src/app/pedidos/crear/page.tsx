"use client";
import FormOrders from "@/components/orders/form-orders";
import GoBackSection from "@/components/go-back-section";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full flex flex-col p-4 gap-4">
        <GoBackSection href="/pedidos" title="Gestión de pedidos" />
        <section className="flex justify-center items-center gap-4">
          <FormOrders />
        </section>
      </main>
    </>
  );
}
