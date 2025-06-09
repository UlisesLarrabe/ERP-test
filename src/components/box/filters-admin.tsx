"use client";
import BoxFilters from "./box-filters";
import { useUserContext } from "@/hooks/useUserContext";
const FiltersAdmin = () => {
  const { user } = useUserContext();
  if (user.role !== "admin") {
    return null;
  }
  return <BoxFilters />;
};
export default FiltersAdmin;
