import { useContext } from "react";
import { DateFilterContext } from "@/context/DateFilterContext";

export const useDateFilterContext = () => {
  const context = useContext(DateFilterContext);
  if (!context) {
    throw new Error(
      "useDateFilterContext must be used within a DateFilterProvider"
    );
  }
  return context;
};
