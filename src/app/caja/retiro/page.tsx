"use client";
import Header from "@/components/header";
import React from "react";

import { Toaster } from "sonner";
import GoBackSection from "@/components/go-back-section";
import FormOutcome from "@/components/box/form-outcome";

const page = () => {
  return (
    <>
      <Header />
      <Toaster />
      <main className="w-full flex flex-col p-4 gap-4">
        <GoBackSection href="/caja" title="Registrar retiro de caja" />

        <FormOutcome />
      </main>
    </>
  );
};

export default page;
