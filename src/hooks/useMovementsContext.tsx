import { movementsCocntext } from "@/context/MovementsContext";
import { useContext } from "react";

export const useMovementsContext = () => {
  const context = useContext(movementsCocntext);
  if (!context) {
    throw new Error(
      "useMovementsContext must be used within a MovementsProvider"
    );
  }
  return context;
};
