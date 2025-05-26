"use client";
import { Client } from "@/consts/clients";
import { payments } from "@/consts/payments-options";
import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createClient } from "@/utils/supabase/client";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Movement {
  id?: string;
  type: string;
  amount: number;
  created_at: string | dayjs.Dayjs;
  reason?: string;
  payment_method: payments;
  local: string;
  client: Client;
  order_id?: string;
}

interface MovementsContextType {
  movements: Movement[];
  setMovements: React.Dispatch<React.SetStateAction<Movement[]>>;
  getMovements: () => Promise<void>;
  getMovementsWithFilters: (
    date: string,
    local: string,
    type: string,
    paymentMethod: string
  ) => Promise<void>;
  postMovement: (movement: Movement) => Promise<Movement[]>;
  allMovements: Movement[];
  getMonthMovements: (month: string, local: string) => Promise<void>;
  monthMovements: Movement[];
  deleteMovementById: (id: string) => Promise<void>;
  getMovementsByDateAndLocalAndType: (
    date: string,
    local: string,
    type: string
  ) => Promise<void>;
  monthSummary: { payment_method: string; total: number }[];
  monthSummaryTotal: { total: number }[];
  getMonthSummary: (month: string) => Promise<void>;
  getMonthSummaryTotal: (month: string) => Promise<void>;
}

export const movementsCocntext = createContext<
  MovementsContextType | undefined
>(undefined);

export function MovementsProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [allMovements, setAllMovements] = useState<Movement[]>([]);
  const [monthMovements, setMonthMovements] = useState<Movement[]>([]);
  const [monthSummary, setMonthSummary] = useState([
    {
      payment_method: "cash",
      total: 0,
    },
    {
      payment_method: "card",
      total: 0,
    },
    {
      payment_method: "mercado_pago",
      total: 0,
    },
  ]);
  const [monthSummaryTotal, setMonthSummaryTotal] = useState([
    {
      total: 0,
    },
  ]);

  const getMovements = async () => {
    const today = dayjs()
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");
    const { data, error } = await supabase.rpc("get_movements_by_date", {
      date_input: today,
    });
    if (error) {
      throw new Error("Error al obtener los movimientos");
    }
    setMovements(data);
    setAllMovements(data);
  };

  useEffect(() => {
    getMovements();
  }, []);

  const getMonthMovements = async (month: string, local: string) => {
    const { data, error } = await supabase.rpc("get_movements_by_month", {
      month_input: month,
    });
    if (error) {
      throw new Error("Error al obtener los movimientos");
    }
    if (data.length === 0) {
      setMonthMovements([]);
      return;
    }
    if (local === "all") {
      setMonthMovements(data);
    } else {
      const filteredData = data.filter(
        (movement: Movement) => movement.local === local
      );
      setMonthMovements(filteredData);
    }
  };

  const getMonthSummary = async (date: string) => {
    const { data, error } = await supabase.rpc("get_month_summary", {
      date_input: date,
    });
    if (error) {
      throw new Error("Error al obtener los movimientos");
    }
    if (data.length === 0) {
      setMonthSummary([
        {
          payment_method: "cash",
          total: 0,
        },
        {
          payment_method: "card",
          total: 0,
        },
        {
          payment_method: "mercado_pago",
          total: 0,
        },
      ]);
      return;
    }
    setMonthSummary(data);
  };

  const getMonthSummaryTotal = async (date: string) => {
    const { data, error } = await supabase.rpc("get_total_month_summary", {
      date_input: date,
    });
    if (error) {
      throw new Error("Error al obtener los movimientos");
    }
    if (data.length === 0 || data[0].total === null) {
      setMonthSummaryTotal([
        {
          total: 0,
        },
      ]);
      return;
    }
    setMonthSummaryTotal(data);
  };

  const getMovementsWithFilters = async (
    date: string,
    local: string,
    type: string,
    paymentMethod: string
  ) => {
    const { data, error } = await supabase.rpc(
      "get_movements_by_date_and_filters",
      {
        date_input: date,
        local_input: local,
        type_input: type,
        payment_method_input: paymentMethod,
      }
    );
    if (error) {
      throw new Error("Error al obtener los movimientos");
    }
    setMovements(data);
  };

  const getMovementsByDateAndLocalAndType = async (
    date: string,
    local: string,
    type: string
  ) => {
    const { data, error } = await supabase.rpc(
      "get_movements_by_date_and_local_and_type",
      {
        date_input: date,
        local_input: local,
        type_input: type,
      }
    );
    if (error) {
      throw new Error("Error al obtener los movimientos");
    }
    setMovements(data);
  };

  const postMovement = async (movement: Movement) => {
    const { data, error } = await supabase
      .from("movements")
      .insert(movement)
      .select();
    if (error) {
      throw new Error(error?.message);
    }
    return data;
  };

  const deleteMovementById = async (id: string) => {
    const { data, error } = await supabase
      .from("movements")
      .delete()
      .eq("id", id);
    if (error || data != null) {
      throw new Error(error?.message);
    }
    setMovements((prevMovements) =>
      prevMovements.filter((movement) => movement.id !== id)
    );
    setAllMovements((prevMovements) =>
      prevMovements.filter((movement) => movement.id !== id)
    );
    setMonthMovements((prevMovements) =>
      prevMovements.filter((movement) => movement.id !== id)
    );
  };

  useEffect(() => {
    getMovements();
  }, []);

  return (
    <movementsCocntext.Provider
      value={{
        movements,
        setMovements,
        getMovements,
        getMovementsWithFilters,
        getMovementsByDateAndLocalAndType,
        postMovement,
        allMovements,
        getMonthMovements,
        monthMovements,
        monthSummary,
        monthSummaryTotal,
        deleteMovementById,
        getMonthSummary,
        getMonthSummaryTotal,
      }}
    >
      {children}
    </movementsCocntext.Provider>
  );
}
