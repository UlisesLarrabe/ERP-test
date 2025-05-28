"use client";
import { createClient } from "@/utils/supabase/client";
import { createContext, useEffect, useState } from "react";

interface Flavour {
  id?: number;
  name: string;
  stock: number;
  local: string;
  refrigerator?: string;
}
interface FlavourContext {
  flavours: Flavour[];
  setFlavours: React.Dispatch<React.SetStateAction<Flavour[]>>;
  addFlavour: (flavour: Flavour) => Promise<void>;
  getWithFilters: (filters: { local: string }) => Promise<void>;
  updateFlavour: (flavour: Flavour) => Promise<void>;
}

export const flavoursContext = createContext<FlavourContext | null>(null);

export function FlavoursProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [flavours, setFlavours] = useState<Flavour[]>([]);

  // const getFlavours = async () => {
  //   const response = await fetch(`${API_URL}/flavours`);
  //   const data = await response.json();
  //   setFlavours(data);
  // };

  // useEffect(() => {
  //   getFlavours();
  // }, []);

  const addFlavour = async (flavour: Flavour) => {
    const { data, error } = await supabase
      .from("flavours")
      .insert(flavour)
      .select();
    if (error) {
      throw new Error("Error al agregar el sabor");
    }
    setFlavours([...flavours, data[0]]);
  };

  const updateFlavour = async (flavour: Flavour) => {
    const { error } = await supabase
      .from("flavours")
      .update(flavour)
      .eq("id", flavour.id);
    if (error) {
      throw new Error("Error al actualizar el sabor");
    }
    setFlavours(flavours.map((f) => (f.id === flavour.id ? flavour : f)));
  };

  const getWithFilters = async (filters: { local: string }) => {
    const { data, error } = await supabase
      .from("flavours")
      .select("*")
      .eq("local", filters.local);
    if (error) {
      throw new Error("Error al obtener los sabores");
    }
    setFlavours(data);
  };

  return (
    <flavoursContext.Provider
      value={{
        flavours,
        setFlavours,
        addFlavour,
        getWithFilters,
        updateFlavour,
      }}
    >
      {children}
    </flavoursContext.Provider>
  );
}
