import Header from "@/components/header";
import InitializeCash from "@/components/box/initialize-cash";
import { Toaster } from "sonner";
import GoBackSection from "@/components/go-back-section";

const page = () => {
  return (
    <>
      <Header />
      <Toaster />
      <main className="w-full flex flex-col p-4 gap-4">
        <GoBackSection href="/" title="Comienzo de caja" />

        <InitializeCash />
      </main>
    </>
  );
};
export default page;
