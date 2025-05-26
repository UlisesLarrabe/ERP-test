import React from "react";
import MonthSummary from "./month-summary";
import TitlePages from "../title-pages";
import ChartResume from "./chart-resume";
import ChartFilters from "./chart-filters";

const ResumeProtectedContent = () => (
  <main className="w-full min-h-screen bg-gray-50 flex flex-col items-center px-2 py-8 gap-8">
    <div className="w-full max-w-4xl">
      <TitlePages title="Resumen del mes" />
    </div>
    <section className="w-full max-w-4xl flex flex-col gap-8">
      <MonthSummary />
      <div className="flex gap-8 md:flex-row flex-col">
        <ChartResume />
        <ChartFilters />
      </div>
    </section>
  </main>
);

export default ResumeProtectedContent;
