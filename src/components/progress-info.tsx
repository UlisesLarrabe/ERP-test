import React from "react";

const ProgressInfo = ({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) => {
  const classCash =
    "w-full h-4 rounded-full overflow-hidden bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500";

  const classMercadoPago =
    "w-full h-4 rounded-full overflow-hidden bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500";

  const classPedidosYa =
    "w-full h-4 rounded-full overflow-hidden bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-yellow-500 [&::-moz-progress-bar]:bg-yellow-500";

  const finalClass =
    title === "Efectivo"
      ? classCash
      : title === "Mercado Pago"
      ? classMercadoPago
      : classPedidosYa;
  return (
    <div className="flex gap-2 items-center ">
      <label className="min-w-40">{title}</label>
      <progress className={finalClass} value={percentage} max="100"></progress>
      <span>{percentage}%</span>
    </div>
  );
};

export default ProgressInfo;
