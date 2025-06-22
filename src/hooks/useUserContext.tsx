import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
