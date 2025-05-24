import Header from "@/components/header";
import TitlePages from "@/components/title-pages";

export default async function Caja() {
  return (
    <>
      <Header />
      <main className="w-full flex flex-col p-4 gap-4">
        <TitlePages
          title="Arqueo de caja"
          href="/caja/retiro"
          button="Registrar retiro"
        />
      </main>
    </>
  );
}
