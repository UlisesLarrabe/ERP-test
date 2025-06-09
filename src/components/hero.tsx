"use client";
import React, { useEffect } from "react";
import TitlePages from "./title-pages";
import HeroSummary from "./hero-summary";
import { AdditionalInfo } from "./additional-info";
import HeroLocals from "./hero-locals";
import { useUserContext } from "@/hooks/useUserContext";

interface User {
  id: string;
  name: string;
  role: string;
}

const Hero = ({ user }: { user: User }) => {
  const { setUser } = useUserContext();
  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <main className="w-full flex flex-col p-4 gap-4">
      <TitlePages
        title="Dashboard"
        href="/caja/comienzo"
        button="Agregar comienzo de caja"
      />
      {user.role === "admin" && <HeroSummary />}
      <HeroLocals />
      <AdditionalInfo />
    </main>
  );
};

export default Hero;
