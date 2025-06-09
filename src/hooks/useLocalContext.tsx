import { LocalFilterContext } from "@/context/LocalFilterContext";
import { useContext } from "react";

export const useLocalContext = () => {
  const context = useContext(LocalFilterContext);
  if (context === null) {
    throw new Error(
      "useLocalContext must be used within a LocalFilterProvider"
    );
  }
  return context;
};
