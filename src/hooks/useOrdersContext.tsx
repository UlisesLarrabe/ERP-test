import { useContext } from "react";
import { OrdersContext } from "@/context/OrdersContext";

export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrdersContext must be used within a OrdersProvider");
  }
  return context;
};
