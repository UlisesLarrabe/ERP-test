"use client";

import { useMovementsContext } from "@/hooks/useMovementsContext";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface ResumePasswordFormProps {
  onAccessGranted: () => void;
}

const ResumePasswordForm: React.FC<ResumePasswordFormProps> = ({
  onAccessGranted,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { getMonthSummary, getMonthSummaryTotal } = useMovementsContext();

  useEffect(() => {
    getMonthSummary(dayjs().format("YYYY-MM-DD"));
    getMonthSummaryTotal(dayjs().format("YYYY-MM-DD"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/verify-resume-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (data.status === 200) {
      onAccessGranted();
    } else {
      setError("Contraseña incorrecta");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[30vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Acceso Restringido
        </h2>
        <input
          type="password"
          placeholder="Contraseña"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default ResumePasswordForm;
