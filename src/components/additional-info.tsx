import React from "react";
import { Shortcuts } from "./shortcuts";
import { SummaryBar } from "./summary-bar";

export const AdditionalInfo = () => {
  return (
    <section className="flex gap-2 w-full md:flex-row flex-col">
      <SummaryBar />
      <Shortcuts />
    </section>
  );
};
