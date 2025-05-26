import React from "react";
import TitlePages from "./title-pages";
import HeroSummary from "./hero-summary";
import { AdditionalInfo } from "./additional-info";

const Hero = () => {
  return (
    <main className="w-full flex flex-col p-4 gap-4">
      <TitlePages
        title="Dashboard"
        href="/caja/comienzo"
        button="Agregar comienzo de caja"
      />
      <HeroSummary />
      <AdditionalInfo />
    </main>
  );
};

export default Hero;
