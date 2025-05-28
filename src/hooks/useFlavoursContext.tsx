import { flavoursContext } from "@/context/FlavoursContext";
import { useContext } from "react";

export const useFlavoursContext = () => {
  const context = useContext(flavoursContext);
  if (context === null) {
    throw new Error(
      "useFlavoursContext must be used within a FlavoursProvider"
    );
  }
  return context;
};
