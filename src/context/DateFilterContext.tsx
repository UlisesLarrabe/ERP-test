"use client";
import dayjs from "dayjs";
import { createContext, useState } from "react";

interface DateFilterContextType {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const DateFilterContext = createContext<
  DateFilterContextType | undefined
>(undefined);

export function DateFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  return (
    <DateFilterContext.Provider value={{ date, setDate }}>
      {children}
    </DateFilterContext.Provider>
  );
}
