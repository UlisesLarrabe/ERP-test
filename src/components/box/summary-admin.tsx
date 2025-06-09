"use client";
import { useUserContext } from "@/hooks/useUserContext";
import MoneySummary from "../money-summary";

const SummaryAdmin = () => {
  const { user } = useUserContext();
  if (user.role !== "admin") {
    return null;
  }
  return <MoneySummary />;
};

export default SummaryAdmin;
