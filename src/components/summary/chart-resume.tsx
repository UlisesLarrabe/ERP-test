"use client";
import { useMovementsContext } from "@/hooks/useMovementsContext";
import {
  BarLabel,
  BarPlot,
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
} from "@mui/x-charts";

const ChartResume = () => {
  const { monthSummary } = useMovementsContext();

  return (
    <article className="p-4 border border-gray-300 rounded-lg flex flex-col gap-4 w-full md:w-1/2 bg-white shadow">
      <h3 className="text-xl font-bold mb-2 text-eerie-black">
        Resumen por método de pago
      </h3>
      <section className="flex items-center justify-center">
        <ChartContainer
          xAxis={[
            {
              scaleType: "band",
              data: ["Efectivo", "Tarjeta", "Mercado Pago"],
            },
          ]}
          series={[
            {
              type: "bar",
              id: "base",
              data: [
                monthSummary[0].total,
                monthSummary[1].total,
                monthSummary[2].total,
              ],
              color: "#fcc8b2",
            },
          ]}
          width={300}
          height={400}
        >
          <BarPlot barLabel="value" slots={{ barLabel: BarLabel }} />
          <ChartsXAxis
            fill="#22223b"
            labelStyle={{ fontSize: 12, fontWeight: 500 }}
          />
          <ChartsYAxis
            fill="#22223b"
            labelStyle={{ fontSize: 12, fontWeight: 500 }}
          />
        </ChartContainer>
      </section>
    </article>
  );
};

export default ChartResume;
