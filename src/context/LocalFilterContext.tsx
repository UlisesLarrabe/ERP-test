"use client";
import { LOCALS } from "@/consts/locals";
import { createContext, useState } from "react";

interface LocalFilterContextType {
  local: string;
  setLocal: React.Dispatch<React.SetStateAction<string>>;
}

export const LocalFilterContext = createContext<LocalFilterContextType>({
  local: "",
  setLocal: () => {},
});

export function LocalFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [local, setLocal] = useState(LOCALS[0]);
  return (
    <LocalFilterContext.Provider value={{ local, setLocal }}>
      {children}
    </LocalFilterContext.Provider>
  );
}
